import * as webpackModules from "./webpackModules";
const uuidv4 = webpackModules.findByProps("v4").v4;
const logger = {
    log: function (msg) {
        console.log("%c[SmartCord]", "color: red;", msg);
    },
    info: function (msg) {
        console.info("%c[SmartCord]", "color: red;", msg);
    },
    warn: function (msg) {
        console.warn("%c[SmartCord]", "color: red;", msg);
    },
    error: function (msg) {
        console.error("%c[SmartCord]", "color: red;", msg);
    },
};

const patcher = {
  patch,
  unpatchAll,
  unpatchAllCss,
  patches: {},
  injectCSS,
};

function injectCSS(css) {
  const style = document.createElement("style");
  style.className = "SmartCord_INJECTED_CSS";
  style.textContent = css;
  document.head.appendChild(style);

  return () => { style.remove() }
}

function hook(patchId, args, context) {
  // I'm only using this because previousResponse can return undefined.
  var iterationDone = false;
  var previousResponse;

  const hooks = SC.api.patches[patchId]["hooks"]
  for (const hookId in hooks) {
    const hook = hooks[hookId];
    if (hook.runInstead) {
      previousResponse = hook.callback.call(context, args);
      iterationDone = true;
    } else {
      if (!iterationDone) {
        previousResponse = SC.api.patches[patchId].originalFunction.call(context, ...args);
        iterationDone = true;
      }

      let hookResponse = hook.callback.call(context, args, previousResponse);

      if (hookResponse !== undefined) {
        previousResponse = hookResponse;
      }
    }
  }

  return previousResponse;
}

function unpatch(patchId, hookId) {
  const patch = SC.api.patches[patchId];
  var unpatched = false;

  if (patch) {
    const hooks = patch["hooks"];

    if (hooks[hookId]) {
      delete hooks[hookId];
      if (Object.keys(hooks).length == 0) {
        patch.functionParent[patch.functionName] = patch.originalFunction;
        patch.functionParent.SmartCord_INJECTIONS[patch.functionName] = undefined;
        delete patch.functionParent.SmartCord_INJECTIONS[patch.functionName];
        SC.api.patches[patchId] = undefined;
        delete SC.api.patches[patchId];
      }

      return true;
    }
  }

  return false;
}

function unpatchAll() {
  logger.log(
    "If you're a plugin developer and you ran this because you're curious as to what it does, I highly recommend you refresh your client because unfortunately everything that relies on the patcher has been unpatched."
  );
  for (const patch in SC.api.patches) {
    const hooks = SC.api.patches[patch]["hooks"];
    for (const hook in hooks) {
      unpatch(patch, hook);
    }
  }
}

function unpatchAllCss() {
  for (const style of document.querySelectorAll(".SmartCord_INJECTED_CSS")) {
    style.remove();
  }
}

function patch(functionName, functionParent, callback, runInstead = false) {
  if (typeof functionParent[functionName] !== "function") {
    throw new Error(
      `${functionName} is not a function in ${functionParent.constructor.name}`
    );
  }

  if (!functionParent.hasOwnProperty("SmartCord_INJECTIONS")) {
    functionParent.SmartCord_INJECTIONS = {};
  }

  if (!functionParent.SmartCord_INJECTIONS.hasOwnProperty(functionName)) {
    const patchId = uuidv4();
    functionParent.SmartCord_INJECTIONS[functionName] = patchId;
  }

  const injectionId = functionParent.SmartCord_INJECTIONS[functionName];

  if (!SC.api.patches[injectionId]) {
    const originalFunction = Object.assign({}, functionParent)[functionName];

    SC.api.patches[injectionId] = {
      originalFunction,
      functionParent,
      functionName,
      hooks: {},
    };

    functionParent[functionName] = function (...args) { return hook(injectionId, args, this); };
  }

  const hookId = uuidv4();
  SC.api.patches[injectionId].hooks[hookId] = {
    runInstead,
    callback,
  };

  return () => unpatch(injectionId, hookId);
}

export default patcher;

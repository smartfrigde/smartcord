const Plugin = require("../plugin");

module.exports = new Plugin({
  name: "noDelete" /* Human-readable plugin name. */,
  author:
    "smartfridge#5834" /* [Optional] Put your name here to give yourself credit for making it :) */,
  description:
    "Simple plugin that allows you to see deleted messages. It's primitive (on purpuse) and deletes logged messages after reload/restart. Code is small and based of Lighty plugin." /* Description of what this plugin does. */,
  preload: false /* [Optional] If true, load this before Discord has finished starting up */,
  color:
    "#436" /* [Optional] The color that this plugin shows in logs and in the plugin settings tab. Any valid CSS color will work here. */,
  disabledByDefault: false /* [Optional] If true, disable the plugin until the user enables it in settings */,

  load: function () {
    monkeyPatch(findModule("dispatch"), "dispatch", {
      instead: ({ thisObject, methodArguments, originalMethod }) =>
        methodArguments[0].type !== "MESSAGE_DELETE" &&
        originalMethod.call(thisObject, ...methodArguments),
    });
  },
  unload: function () {
    /* What your plugin does when it is disabled or being reloaded. */
    findModule("dispatch").unpatch();
  },
});

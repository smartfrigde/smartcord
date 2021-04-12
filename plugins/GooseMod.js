const Plugin = require("../plugin");

module.exports = new Plugin({
  name: "GooseMod Plugin Loader" /* Human-readable plugin name. */,
  author:
    "smartfridge#0001" /* [Optional] Put your name here to give yourself credit for making it :) */,
  description:
    "Loads GooseMod Plugins" /* Description of what this plugin does. */,
  preload: true /* [Optional] If true, load this before Discord has finished starting up */,
  color:
    "#646" /* [Optional] The color that this plugin shows in logs and in the plugin settings tab. Any valid CSS color will work here. */,
  disabledByDefault: true /* [Optional] If true, disable the plugin until the user enables it in settings */,

  load: function () {
    /* What your plugin does when Discord is loaded, or when the plugin is reloaded. */
    const scr = document.createElement("script");

    scr.src = "https://goosemod-api.netlify.app/untethered/untetheredInject.js";

    document.head.appendChild(scr);
  },
  unload: function () {
    /* What your plugin does when it is disabled or being reloaded. */
  },
});

const Plugin = require("../plugin");

module.exports = new Plugin({
  name: "Random Background" /* Human-readable plugin name. */,
  author:
    "smartfridge#5834" /* [Optional] Put your name here to give yourself credit for making it :) */,
  description:
    "Shows new background every time you restart Discord. (may not work on all themes)" /* Description of what this plugin does. */,
  preload: false /* [Optional] If true, load this before Discord has finished starting up */,
  color:
    "#666" /* [Optional] The color that this plugin shows in logs and in the plugin settings tab. Any valid CSS color will work here. */,
  disabledByDefault: false /* [Optional] If true, disable the plugin until the user enables it in settings */,

  load: function () {
    /* What your plugin does when Discord is loaded, or when the plugin is reloaded. */
    style = document.createElement("style");
    document.head.appendChild(style);
    style.appendChild(
      document.createTextNode(
        `@import url("https://smartfrigde.github.io/smartcord/randombackground.css")`
      )
    );
  },
  unload: function () {
    /* What your plugin does when it is disabled or being reloaded. */
  },
});

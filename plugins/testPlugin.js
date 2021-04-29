const Plugin = require("../core/plugin");

module.exports = new Plugin({
  name: "testPlugin idk" /* Human-readable plugin name. */,
  author:
    "smartbitch" /* [Optional] Put your name here to give yourself credit for making it :) */,
  description:
    "2.0 testing be is deprresion  lol" /* Description of what this plugin does. */,
  preload: false /* [Optional] If true, load this before Discord has finished starting up */,
  color:
    "#666" /* [Optional] The color that this plugin shows in logs and in the plugin settings tab. Any valid CSS color will work here. */,
  disabledByDefault: false /* [Optional] If true, disable the plugin until the user enables it in settings */,
  perms: "{e}",
  load: function () {
    /* What your plugin does when Discord is loaded, or when the plugin is reloaded. */
  },
  unload: function () {
    /* What your plugin does when it is disabled or being reloaded. */
  },
});

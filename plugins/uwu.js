// AuthorID: 707309693449535599
const Plugin = require("../plugin");

module.exports = new Plugin({
  name: "UwU" /* Human-readable plugin name. */,
  author:
    "Armagan#4869 & smartfridge#5834" /* [Optional] Put your name here to give yourself credit for making it :) */,
  description:
    "changes discord to be more OwO" /* Description of what this plugin does. */,
  preload: false /* [Optional] If true, load this before Discord has finished starting up */,
  color:
    "#666" /* [Optional] The color that this plugin shows in logs and in the plugin settings tab. Any valid CSS color will work here. */,
  disabledByDefault: true /* [Optional] If true, disable the plugin until the user enables it in settings */,

  load: function () {
    /* What your plugin does when Discord is loaded, or when the plugin is reloaded. */
    kaomoji = [
      "(*^ω^)",
      "(◕‿◕✿)",
      "(◕ᴥ◕)",
      "ʕ•ᴥ•ʔ",
      "ʕ￫ᴥ￩ʔ",
      "(*^.^*)",
      "owo",
      "OwO",
      "(｡♥‿♥｡)",
      "uwu",
      "UwU",
      "(*￣з￣)",
      ">w<",
      "^w^",
      "(つ✧ω✧)つ",
      "(/ =ω=)/",
    ];

    messages = EDApi.findModule("Messages").Messages;

    Object.entries(messages).forEach(([k, v]) => {
      if (typeof v === "string") {
        messages[k] = v
          .replace(/(?:l|r)/g, "w")
          .replace(/(?:L|R)/g, "W")
          .replace(/n([aeiou])/g, "ny$1")
          .replace(/N([aeiou])|N([AEIOU])/g, "Ny$1")
          .replace(/ove/g, "uv")
          .replace(/in/g, "w")
          .replace(/IN/g, "W")
          .replace(/nd(?= |$)/g, "ndo")
          .replace(
            /!+/g,
            ` ${kaomoji[Math.floor(Math.random() * kaomoji.length)]}`
          )
          .replace(/TY/g, `TWY`)
          .replace(/ty/g, `twy`);
      }
    });
  },
  unload: function () {
    /* What your plugin does when it is disabled or being reloaded. */
  },
});

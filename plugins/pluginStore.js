const Plugin = require("../core/plugin");

let settings = { method: "Get" };
module.exports = new Plugin({
  name: "SmartCord Store",
  author:
    "smartfridge#1337",
  description:
    "Place where you can get all of your themes and plugins!",
  preload: false,
  color:
    "#632",
  disabledByDefault: false,
  load: function () {
    console.log("Setting up SmartCord Store Repos.");
    //todo add custom repos
    const repo = "http://localhost/store";
    console.log("Fetching SmartCord Store Repos.");
    //fails due to Access to fetch at 'http://localhost/store/main.json' from origin 'https://discord.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
    fetch(`${repo}/main.json`, settings)
      .then((res) => console.log(res))
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  },
  unload: function () {

  },
});

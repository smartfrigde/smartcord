
const Plugin = require('../plugin');

module.exports = new Plugin({
    name: 'SmartCord Extras', /* Human-readable plugin name. */
    author: 'Smartfrigde', /* [Optional] Put your name here to give yourself credit for making it :) */
    description: 'Embeds!', /* Description of what this plugin does. */
    preload: false, /* [Optional] If true, load this before Discord has finished starting up */
    color: '#666', /* [Optional] The color that this plugin shows in logs and in the plugin settings tab. Any valid CSS color will work here. */
    disabledByDefault: false, /* [Optional] If true, disable the plugin until the user enables it in settings */

    load: function () {
        /* What your plugin does when Discord is loaded, or when the plugin is reloaded. */
        monkeyPatch(findModule('post'), 'post', function (b) {
            console.log(b.methodArguments);
            if (b.methodArguments[0].url.endsWith('/messages') === "/embed") {
                b.methodArguments[0].body.embed = { type: 'rich', description: 'test', color: 16711680 };
            }
            return b.callOriginalMethod(b.methodArguments);
        });
    },
    unload: function () {
        /* What your plugin does when it is disabled or being reloaded. */
    }
});
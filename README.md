# EOL Notice

**SmartCord is officially discontinued. No future updates will be available. If you are still using it to uninstall follow these instructions:**    
1.Find your Discord user data directory:     
<channel> refers to the Discord version channel (Stable, Canary, PTB, Development) you want to mod. Stable has no suffix.     
2.For Linux: ~/.config/discord<channel>/     
3.For Windows: %appdata%\discord<channel>\    
4.For Mac: ~/Library/Application Support/discord<channel>/    
5.There should be a settings.json, remove the following lines after the first line of the contents:    
`
  "UPDATE_ENDPOINT": "https://updates.goosemod.com/smartcord",
  "NEW_UPDATE_ENDPOINT": "https://updates.goosemod.com/smartcord/",`   
If you want a **much** better experience use GooseMod. Just replace `smartcord` to `goosemod` and you should be fine.   
# It's not the end tho... I'm working on rewrite/v2 but it's still on paper. I'd like to thank everyone who supported me and used SmartCord v1 it's a been great journey and good learning material





# SmartCord
Client mod based on EnhancedDiscord designed to enhance your Discord experience without slowing down your PC.

Support server:
(https://discord.gg/F25bc4RYDt or https://guilded.gg/SmartCord)

#### DISCLAIMER!
> **Using SmartCord, or any other client mod, is against [Discord's Terms of Service](https://discordapp.com/terms). Use it at your own risk.**
> *It's very unlikely any action will be taken against you (if you don't api abuse), but we take no responsibility if anything happens.*

### Installing
If you want to install SmartCord you should use [GooseUpdate Web Installer](https://updates.goosemod.com/#install) or [Mallard](https://github.com/uwu/Mallard/releases).   
Manual Installation can be found on Wiki section.

### Themes

By default, the official [EnhancedDiscord/SmartCord theme](https://smartfrigde.github.io/smartcord/smartcord.css) is loaded along with a plugin that allows you to change settings of it in **User Settings** > SmartCord > **Settings**. For more info on how to change/edit your theme, see the [FAQ](https://github.com/smartfrigde/smartcord/wiki/FAQ).

### Plugins

A list of included plugins and their purpose is included on the [plugins wiki page](https://github.com/smartfrigde/smartcord/wiki/Plugins). It also includes some sources for finding new SC plugins.

### GooseMod Support

You can install GooseMod alongside SmartCord using [GooseUpdate](https://updates.goosemod.com/#install)!

### Custom plugins

For info about how to create your own plugins, check out the [custom plugins wiki page](https://github.com/joe27g/EnhancedDiscord/wiki/Custom-plugins).

### Having issues?

First, check out the [FAQ](https://github.com/smartfrigde/smartcord/wiki/FAQ) to see if your issue is listed there. If not, ask in #support in the support server (link below.)

### Suggestions? Comments?

Feel free to chat in our [support server](https://discord.gg/F25bc4RYDt). We have a #suggestions channel as well as many others to discuss SmartCord and other topics.

### Contributing

Feel free to make pull requests or make your own plugins repository. If you do make your own plugins, request the 'Plugin Developer' role in the support server so you can announce your releases!

### Security or lack of it
Modding your Discord client is not secure. It tweaks Discord security so **unofficial** plugins and themes can load. If you take security very seriously then don't use **any** mod client. But if you don't install unknown plugins nothing bad will happen *probably*. When using plugins that are included with SmartCord there's really small chance of you getting any harm. Stay safe and don't download plugins from shady sources.

### Credits

Big shotout to EnhancedDiscord developers and plugin makers. This project is just "personalized" fork of EnhancedDiscord that wants to continue it's development in it's own way. I'm not experienced coder and I suck lol. Don't expect high tier coding or good coding at all. I used few scripts/snippets shared on EnhancedDiscord server huge thanks to developers of those. I also used parts of GooseMod code for it's support and ported plugins.

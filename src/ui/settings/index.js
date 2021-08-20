import * as webpackModules from "../../modules/webpackModules.js";
import SCApi from "../../modules/SCApi.js";
import Plugins from "./components/info.jsx";

export function initializeSettings() {
    // All patcher.injectCSS calls are uninjected when sc.uninject() is called, so this is never changed
    patcher.injectCSS(`
    .sc-plugin-card {
      padding: 16px;
      margin-bottom: 10px;
    }
    .sc-plugin-import {
      flex-grow: 1;
      margin-right: 20px;
    }
    .sc-plugin-divider {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .sc-card-header {
      display: inline-block;
    }
    .sc-card-title, .sc-card-author {
      display: inline;
    }
    .sc-card-right {
      display: flex;
    }
    .sc-card-delete {
      fill: var(--interactive-normal);
      cursor: pointer;
      width: 20px;
    }
    .sc-card-delete:hover {
      fill: var(--interactive-hover);
    }
    .sc-card-buttons {
      display: flex;
      margin-right: 4px;
    }
    `);

    const Settings = webpackModules.findByDisplayName("SettingsView").prototype;

    // Same goes for patching JS, it'll be uninjected when sc.uninject() is called
    SCApi.patch("getPredicateSections", Settings, (args, items) => {
      const position = items.findIndex((item) => { return item.section == "changelog" }) - 1;

      // Check if we're in the user settings menu, if not, fuck off
      if (position < 0) return items;

      const scSettings = [
        { section: "DIVIDER" },
        { section: "HEADER", label: "SmartCord" },
        { section: "SmartCord_PLUGINS", label: "Information", element: Plugins }
      ];
      items.splice(position, 0, ...scSettings)

      return items;
    });
  }

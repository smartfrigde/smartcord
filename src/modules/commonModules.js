import * as webpackModules from "./webpackModules";

const commonModules = {
  constants: webpackModules.findByProps("API_HOST", "APP_URL_PREFIX"),
  channels: webpackModules.findByProps("getChannelId", "getVoiceChannelId"),

  Flux: webpackModules.findByProps("CachedStore", "Store", "connectStores"),
  FluxDispatcher: webpackModules.findByProps(
    "_currentDispatchActionType",
    "_subscriptions",
    "_waitQueue"
  ),

  i18n: webpackModules.findByProps(
    "getLanguages",
    "_requestedLocale",
    "languages"
  ),

  // Note: I use these because they are the two most React-specific things in React's props
  React: webpackModules.findByProps(
    "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",
    "createElement"
  ),
  // Same thing here for ReactDOM
  ReactDOM: webpackModules.findByProps(
    "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",
    "hydrate"
  ),
};

// export all of the "common" modules
export const React = commonModules.React;
export const ReactDOM = commonModules.ReactDOM;
export const Flux = commonModules.Flux;
export const FluxDispatcher = commonModules.FluxDispatcher;
export const constants = commonModules.constants;
export const channels = commonModules.channels;
export const i18n = commonModules.i18n;

export default commonModules;

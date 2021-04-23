
export default class SmartCord {
  static async ensureWebpackModules(browserWindow) {
    await browserWindow.webContents.executeJavaScript(`new Promise(resolve => {
            const check = function() {
                if (window.webpackJsonp && window.webpackJsonp.flat().flat().length >= 7000) return resolve();
                setTimeout(check, 100);
            };
            check();
        });`);
  }
}

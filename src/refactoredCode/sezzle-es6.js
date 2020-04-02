import { constructConfig, state } from './sezzleWidgetState';
import logEvent from './eventLogger';
import utils from './utils';
import { initWidget } from './coreFunctions';

export default class SezzleJS {
  constructor(options) {
    constructConfig(options);
  }

  /**
	 * Initialise the widget if the
	 * country is supported or the widget
	 * is forced to be shown
	*/
  async init() {
    // no widget to render
    if (!state.configGroups.length) return;
    // if config has forcedShow set to true
    if (state.forcedShow) {
      logEvent('request');
      await utils.loadCSS();
      initWidget();
      const countryCode = await utils.getCountryCodeFromIP();
      // only inject Google tag manager for clients visiting from the United States or Canada
      if (countryCode === 'US' || countryCode === 'CA') {
        const win = window.frames.szl;
        if (win && !this.noGtm) {
          win.postMessage('initGTMScript', 'https://tracking.sezzle.com');
        }
      }
    } else {
      const countryCode = await utils.getCountryCodeFromIP();
      if (state.supportedCountryCodes.includes(countryCode)) {
        logEvent('request');
        await utils.loadCSS();
        initWidget();
        // only inject Google tag manager for clients visiting from the United States or Canada
        if (countryCode === 'US' || countryCode === 'CA') {
          const win = window.frames.szl;
          if (win && !this.noGtm) {
            setTimeout(() => {
              win.postMessage('initGTMScript', 'https://tracking.sezzle.com');
            }, 100);
          }
        }
      }
    }
  }
}

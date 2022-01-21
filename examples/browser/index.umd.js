var PaytodaySDK = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class PayTodaySDK {
        /**
         *
         * @param {PayConfig} config The Paytoday businessId and businessName
         */
        constructor(config) {
            this.prodURL = "https://paytoday.com.na/js/pay-with-paytoday.js";
            this.stageURL = "https://dev.paytoday.com.na/js/pay-with-paytoday.js";
            this.config = config;
            this.url = this.prodURL;
            if (config.debug) {
                console.log(`
      PayToday SDK is running in debug mode,
      we will use the test credentials,
      set { debug: false } or omit debug
      to run production."
      `);
                this.config.businessId = "1663";
                this.config.businessName = "Test PwPT Business";
                this.url = this.stageURL;
            }
        }
        /**
         * @description Creates the HTML button for PayToday checkout.
         * @param element {HTMLElement} The DOM element to insert the button into.
         * @param amount {Number} The amount of the transaction in NAD.
         * (use -1 to allow the user to input their own amount).
         * @param reference {String} Your unique reference
         * @param redirectURL {String} The url to redirect to when successfully paid.
         * @returns {HTMLElement} The created HTML element
         */
        createButton(element, amount, reference, redirectURL = "") {
            let amt = amount === -1 ? " " : (amount * 100).toFixed(2);
            if (!element) {
                throw new Error("createButton requires an HTML element that would contain the button.");
            }
            if (typeof document === "undefined") {
                throw new Error("PayToday createButton can only be called in a browser environment.");
            }
            if (typeof window.createButton === "undefined") {
                throw new Error("Could not create button, PayToday not initialized.");
            }
            const html = `
      <div id="paytodaybtn"></div>
    `;
            element.innerHTML = html;
            try {
                window.createButton(this.config.businessId, this.config.businessName, amt, redirectURL, reference);
            }
            catch (error) {
                console.error(`Failed to create the PayToday button: ${error.message}`);
            }
            return element;
        }
    }
    /**
     * @description Creates the PayToday SDK instance.
     * @param {PayConfig} config PayToday business details.
     * @returns {Promise<PayTodaySDK>} The Paytoday instance!
     */
    const initializePaytoday = (config) => __awaiter(void 0, void 0, void 0, function* () {
        const { debug, businessId, businessName } = config;
        if (!debug && (!businessId || !businessName)) {
            throw new Error("PayToday initialization failed, config parameters incorrect.");
        }
        if (typeof document === "undefined") {
            throw new Error("Cannot initialize PayToday in a non-browser environment.");
        }
        const instance = new PayTodaySDK({ businessId, businessName, debug });
        const script = document.createElement("script");
        script.src = instance.url;
        return new Promise((resolve) => {
            script.addEventListener("load", () => {
                window.document.dispatchEvent(new Event("DOMContentLoaded", {
                    bubbles: true,
                    cancelable: true,
                }));
                return resolve(instance);
            });
            script.addEventListener("error", () => resolve(instance));
            document.head.appendChild(script);
        });
    });

    exports.initializePaytoday = initializePaytoday;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});

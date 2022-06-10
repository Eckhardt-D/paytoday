type DebugModes = true | false;

type PayConfig = {
  businessId?: string;
  businessName?: string;
  debug?: DebugModes;
};

interface PayToday {
  readonly url: string;
  readonly prodURL: string;
  readonly stageURL: string;
  config: PayConfig;
  createButton(
    element: HTMLElement,
    amount: number,
    reference: string,
    redirectURL?: string
  ): HTMLElement;
}

type InitializePaytoday = (config: PayConfig) => Promise<PayTodaySDK>;

class PayTodaySDK implements PayToday {
  declare config: PayConfig;

  public readonly url: string;
  public readonly prodURL: string =
    "https://paytoday.com.na/js/pay-with-paytoday.js";
  public readonly stageURL: string =
    "https://dev.paytoday.com.na/js/pay-with-paytoday.js";

  /**
   *
   * @param {PayConfig} config The Paytoday businessId and businessName
   */
  constructor(config: PayConfig) {
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
  createButton(
    element: HTMLElement,
    amount: number,
    reference: string,
    redirectURL: string = ""
  ): HTMLElement {
    let amt: string = amount === -1 ? " " : (amount * 100).toFixed(2);

    if (!element) {
      throw new Error(
        "createButton requires an HTML element that would contain the button."
      );
    }

    if (typeof document === "undefined") {
      throw new Error(
        "PayToday createButton can only be called in a browser environment."
      );
    }

    if (typeof (window as any).createButton === "undefined") {
      throw new Error("Could not create button, PayToday not initialized.");
    }

    const html = `
      <div id="paytodaybtn"></div>
    `;

    element.innerHTML = html;

    try {
      (window as any).createButton(
        this.config.businessId,
        this.config.businessName,
        amt,
        redirectURL,
        reference
      );
    } catch (error: any) {
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
export const initializePaytoday: InitializePaytoday = async (
  config: PayConfig
): Promise<PayTodaySDK> => {
  const { debug, businessId, businessName } = config;

  if (!debug && (!businessId || !businessName)) {
    throw new Error(
      "PayToday initialization failed, config parameters incorrect."
    );
  }

  if (typeof document === "undefined") {
    throw new Error("Cannot initialize PayToday in a non-browser environment.");
  }

  const instance = new PayTodaySDK({ businessId, businessName, debug });

  /**
   * Do not create another script if it already exists,
   * this is useful for HMR style apps.
   */
  if (document.getElementById("pt-sdk") != null) {
    return Promise.resolve(instance);
  }

  const script = document.createElement("script");

  script.id = "pt-sdk";
  script.src = instance.url;

  return new Promise((resolve) => {
    script.addEventListener("error", (error) => {
      console.error(`Error initializing PayToday script: ${error.message}`);
      return resolve(instance);
    });

    script.addEventListener("load", () => {
      window.document.dispatchEvent(
        new Event("DOMContentLoaded", {
          bubbles: true,
          cancelable: true,
        })
      );
      return resolve(instance);
    });
    document.head.appendChild(script);
  });
};

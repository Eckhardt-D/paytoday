# PayToday JS SDK

PayToday is a payment service provider based in Namibia. You can [create a business account](https://site.paytoday.com.na) with PayToday to get your business ID to use this package. If you do not have an account, you can still use the package for testing and development.

# Getting started

### Installation

```bash
npm install paytoday
```

or

```bash
yarn add paytoday
```

### Browser

Use the following CDN link to include in your script tag in `<head>`:

```
https://unpkg.com/paytoday/dist/index.umd.js
```

### Initialization

Start by creating the Paytoday instance in your app.

_imported_

```js
import { initializePaytoday } from "paytoday"

// Debug / test mode
initializePaytoday({ debug: true })
  .then(paytoday => /* The instance */)

// Production mode
const payConfig = {
  businessId: "<your-biz-id>",
  businessName: "<your-biz-name>"
}

initializePaytoday(payconfig)
  .then(paytoday => /* The instance */)
```

_browser_

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/paytoday/dist/index.umd.js"></script>
  </head>

  <body>
    <script>
      const { initializePaytoday } = window.PaytodaySDK;

      // Development mode.
      initializePaytoday({ debug: true }).then((paytoday) =>
        console.log(paytoday)
      );
    </script>
  </body>
</html>
```

### Create the checkout button

You can check for examples in [the repo](https://github.com/Eckhardt-D/paytoday.git) in the `/examples` directory, there is examples for Vue.js (can be any JS framework) and the browser.

```js
import { initializePaytoday } from "paytoday";

const paytoday = await initializePaytoday({
  debug: true,
});

const amount = 1000;
const reference = "INV12345";
const redirectURL = "https://yourapp.com/payment-success";

const element = document.getElementById("your-el-id");

paytoday.createButton(element, amount, reference, redirectURL);
```

When the button is clicked a checkout will be created. After payment your `redirectURL` will be notified with `status` and `ref` query params.

Status can be:

- success
- failed

Ref is equivalent to the ref you passed. You can verify payments on your server with this data by requesting:

`https://paytoday.com.na/transactions/txstatus/{businessId}/{ref}.json`

### API

```ts
initializePaytoday(config: PayConfig): PaytodayInstance
```

- config: `object`

  - businessId: `string `(optional if debug)
  - businessName: `string` (optional if debug)
  - debug: `boolean`(optional)

```ts
// PaytodayInstance Methods
createButton(el: HTMLElement, amount: number, reference: string, redirectURL?: string);
```

- el: `HTMLElement` (required)
- amount: `number` (required) (`-1` will allow the user to input their own amount)
- reference: `string` (required)
- redirectURL: `string` (optional)

// More to come

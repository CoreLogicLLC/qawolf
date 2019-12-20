---
id: edit_your_code
title: ✏️ Edit Your Code
---

QA Wolf generates code you can edit. The code imports the [`qawolf` node package](api), which extends the [Puppeteer API](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) with [automatic waiting](how_it_works#-automatic-waiting) for elements and assertions, and [smart element selectors](how_it_works#-element-selectors).

## Puppeteer

Many of the methods you may want to use are on Puppeteer's [`Page`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page) class. [`browser.page`](api#browserpageoptions) gives you access to the current page. You can then call these methods on the resulting `Page` instance.

Below is an example setting a cookie with Puppeteer's [`page.setCookie` method](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagesetcookiecookies) and then reloading the page. Notice that we added our custom code directly into the test generated by QA Wolf.

```js
// custom code starts
const page = await browser.page();

await page.setCookie({
  name: "my-cookie-name",
  value: "my-cookie-value"
});

await page.reload();
// custom code ends

await click(selectors[0]);
```

## Jest

When you generate a test you have access to the [Jest API](https://jestjs.io/docs/en/getting-started). You can write custom [test assertions](https://jestjs.io/docs/en/expect) with Jest.

Below is an example where we use Jest and QA Wolf's [`findProperty` helper](api#browserfindpropertyselector-property-options) to verify that the value of an input is what we expect it to be.

```js
// auto generated test code
describe("my_workflow", () => {
  it('can click "increment count" button', async () => {
    // custom code starts
    const count = await browser.findProperty(
      { css: "#my-counter-input" },
      "value"
    );
    expect(count).toBe("0");
    // custom code ends

    await click(selectors[0]);
  });
});
```

## Typescript

[`qawolf`](api) is built with Typescript and is distributed with types. To change your code to Typescript:

1. Rename the script or test file extension from `.js` to `.ts`.

2. Change the `require("qawolf")` to an import:

```js
// change this
const { launch } = require("qawolf");

// to this
import { launch } from "qawolf";
```

3. If you have not already, install these types `npm i -D @types/node @types/puppeteer` and for tests `npm i -D @types/jest`.

Now you have all advantages of using Typescript!
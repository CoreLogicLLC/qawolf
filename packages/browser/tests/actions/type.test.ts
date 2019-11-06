import { CONFIG } from "@qawolf/config";
import { focusClearInput, type } from "../../src/actions";
import { Browser } from "../../src/Browser";

describe("focusClearInput and type", () => {
  it("sets input value", async () => {
    const browser = await Browser.create({
      url: `${CONFIG.testUrl}login`
    });
    const page = await browser.currentPage();

    const usernameElement = await browser.element({
      action: "type",
      index: 0,
      target: { id: "username" }
    });

    const passwordElement = await browser.element({
      action: "type",
      index: 0,
      target: { id: "password", xpath: '//*[@id="password"]' }
    });

    await focusClearInput(usernameElement);
    await type(page, "spirit");

    const [username1, password1] = await page.$$eval(
      "input",
      (inputs: HTMLInputElement[]) => inputs.map(i => i.value)
    );
    expect(username1).toBe("spirit");
    expect(password1).toBeFalsy();

    await focusClearInput(passwordElement);
    await type(page, "password");

    const [username2, password2] = await page.$$eval(
      "input",
      (inputs: HTMLInputElement[]) => inputs.map(i => i.value)
    );
    expect(username2).toBe("spirit");
    expect(password2).toBe("password");

    await browser.close();
  });
});

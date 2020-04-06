import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

import "chromedriver";

const { assert } = require("chai");

const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

describe("Sandbox", () => {
  let browser;

  before(async () => {
    browser = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    await browser.get("https://e2e-boilerplate.github.io/sandbox/");
  }, 20000);

  after(() => {
    browser.quit();
  });

  it("should be on Sandbox", async () => {
    const title = await browser.getTitle();
    assert.strictEqual(title, "Sandbox");

    const header = await browser.findElement(By.css("h1")).getText();
    assert.strictEqual(header, "Sandbox");
  });
});

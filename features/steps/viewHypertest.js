const {Given, When, Then} = require("@cucumber/cucumber");
const assert = require("assert");

Given("Open Duck Duck Go", {timeout: 60 * 1000}, async function() {
  await page.goto("https://www.duckduckgo.com");
});

When("Click on it", async function() {
  await page.click('[name="q"]');
});

Then("Check", async function() {
  let title = await page.title();

  try {
    assert.equal(title,
        "DuckDuckGo — Privacy, simplified.");

    await this.setTestStatus("passed", "Title matched");
  } catch (e) {
    await this.setTestStatus("failed", e);
    throw(e);
  }
});

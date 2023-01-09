const {
  setWorldConstructor,
  World,
  Before,
  After
} = require("@cucumber/cucumber");
const {
  chromium
} = require('playwright')

class CustomWorld extends World {
  async setTestStatus(status, remark) {
    //do something
  }
}

Before(async (scenario) => {
  const caps = {
    browser: 'chrome',
    os: 'osx',
    os_version: 'catalina',
    name: 'My first playwright test',
    build: 'playwright-build-1-Adit',
    'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'YOUR_USERNAME',
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_ACCESS_KEY',
    //'client.playwrightVersion':'1.17.2'

  }

  // Create page and browser globals to be used in the scenarios
  global.vBrowser = await chromium.connect({
    wsEndpoint:
      `wss://cdp.browserstack.com/playwright?caps=` +
      `${encodeURIComponent(JSON.stringify(caps))}`,
  });

  const context = await global.vBrowser.newContext();

  global.page = await context.newPage();
})

After(async () => {
  //await global.vbrowser.close()
})

setWorldConstructor(CustomWorld);
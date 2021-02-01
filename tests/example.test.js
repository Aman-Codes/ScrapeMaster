const puppeteer = require('puppeteer');

describe('My first puppeteer test', () => {
  it('should launch the browser', async function() {
    const browser = await puppeteer.launch({ 
      headless: false, 
      slowMo: 50, 
      devtools: true
    })
    const page = await browser.newPage()
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media' || request.resourceType() === 'stylesheet')
        request.abort();
      else
        request.continue();
    });
    await page.goto('https://example.com')
    const count = await page.$$eval('p', element => element.length)
    console.log(count);
    await browser.close() 
  })
})
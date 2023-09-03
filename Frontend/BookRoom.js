import { browser } from 'k6/experimental/browser';
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'
import { check } from 'k6';

//Make sure to set environemnt variables:
//K6_BROWSER_HEADLESS=false 
//K6_BROWSER_TIMEOUT='60s'

export const options = {
  scenarios: {
    bookRoom: {
      executor: 'shared-iterations',
      options: {
        browser: {
            type: 'chromium'
        },
      },
      exec: 'bookRoom',
      vus: 10,
      iterations: 10
    }
  },
}

export function setup() {
  console.log("----==== START TEST ====----");
}

export async function bookRoom() {
    const page = browser.newPage();
    try{
        await page.goto('https://automationintesting.online/', { waitUntil: 'domcontentloaded' });
        expect(page.locator("//*[@id='collapseBanner']//h1").innerText()).to.equal("Welcome to Restful Booker Platform");
        await page.locator("(//button[text()='Book this room'])[1]").click();
        await page.locator("[name='firstname']").type("auto");
        await page.locator("[name='lastname']").type("mation");
        await page.locator("[name='email']").type("testing@testing.tt");
        await page.locator("[name='phone']").type("+13215654875");
        await page.locator("//button[text()='Book']").click();
        check(page, {
            'Alert Window displayed' : await page.locator("[class='alert alert-danger']").isVisible() == true
        })
        await page.locator("//button[text()='Cancel']").click();

    }
    finally {
        page.close();
    }
}

export function teardown() {
    console.log("----==== TEST DONE ====----");
}
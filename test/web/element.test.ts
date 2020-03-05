import { Browser, Page } from 'playwright-core';
import { launch } from 'playwright-utils';
import { CreatePlaywrightWeb } from '../../src/web';
import { WEB_SCRIPT } from '../../src/web/addScript';
import { TEST_URL } from '../utils';

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await launch();
  page = await browser.newPage();
  await page.addInitScript(WEB_SCRIPT);
  await page.goto(`${TEST_URL}login`);
});

afterAll(() => browser.close());

describe('getClickableAncestor', () => {
  it('chooses the top most clickable ancestor', async () => {
    const xpath = await page.evaluate(() => {
      const web: CreatePlaywrightWeb = (window as any).createplaywright;
      const element = document.getElementsByTagName('p')[1];
      if (!element) throw new Error('element not found');

      const ancestor = web.getClickableAncestor(element);
      return web.getXpath(ancestor);
    });

    expect(xpath).toEqual("//*[@id='root']/form/button");
  });

  it('chooses the original element when there is no clickable ancestor', async () => {
    const xpath = await page.evaluate(() => {
      const web: CreatePlaywrightWeb = (window as any).createplaywright;
      const element = document.getElementsByTagName('button')[0];
      if (!element) throw new Error('element not found');

      const ancestor = web.getClickableAncestor(element);
      return web.getXpath(ancestor);
    });

    expect(xpath).toEqual("//*[@id='root']/form/button");
  });
});

describe('isVisible', () => {
  it('returns true if element is visible', async () => {
    const isElementVisible = await page.evaluate(() => {
      const web: CreatePlaywrightWeb = (window as any).createplaywright;
      const element = document.getElementById('username');
      if (!element) throw new Error('element not found');

      return web.isVisible(element);
    });

    expect(isElementVisible).toBe(true);
  });

  it('returns false if element has no width', async () => {
    const isElementVisible = await page.evaluate(() => {
      const web: CreatePlaywrightWeb = (window as any).createplaywright;
      const element = document.getElementById('username');
      if (!element) throw new Error('element not found');

      element.style.border = '0';
      element.style.padding = '0';
      element.style.width = '0';

      return web.isVisible(element);
    });

    expect(isElementVisible).toBe(false);
  });
});

describe('isClickable', () => {
  it('returns true if element is clickable', async () => {
    const isClickable = await page.evaluate(() => {
      const web: CreatePlaywrightWeb = (window as any).createplaywright;

      const loginButton = document.getElementsByTagName('button')[0];
      return web.isClickable(loginButton, window.getComputedStyle(loginButton));
    });

    expect(isClickable).toBe(true);
  });

  it('returns false if element is not clickable', async () => {
    const isClickable = await page.evaluate(() => {
      const web: CreatePlaywrightWeb = (window as any).createplaywright;
      const element = document.getElementById('username')!;
      if (!element) throw new Error('element not found');

      return web.isClickable(element, window.getComputedStyle(element));
    });

    expect(isClickable).toBe(false);
  });
});

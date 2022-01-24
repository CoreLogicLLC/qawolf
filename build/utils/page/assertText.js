"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertElementText = void 0;
const scroll_1 = require("./scroll");
exports.assertElementText = async (page, selector, text, options) => {
    try {
        await page.waitForFunction(({ selector, text }) => {
            const element = document.querySelector(selector);
            if (!element)
                return false;
            const elementText = element.value || element.innerText || '';
            return elementText.includes(text);
        }, { selector, text }, { polling: 100, timeout: (options || {}).timeout || scroll_1.DEFAULT_TIMEOUT });
    }
    catch (error) {
        if (error.message.includes('page.waitForFunction: Timeout')) {
            throw new Error(`assertElementText: text "${text}" not found in element ${selector}`);
        }
        throw error;
    }
};
//# sourceMappingURL=assertText.js.map
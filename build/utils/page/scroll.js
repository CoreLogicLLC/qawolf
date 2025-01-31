"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scroll = exports.getScrollValue = exports.DEFAULT_TIMEOUT = void 0;
exports.DEFAULT_TIMEOUT = 30000; // milliseconds
exports.getScrollValue = (page, elementHandle) => {
    return page.evaluate((element) => {
        return { x: element.scrollLeft, y: element.scrollTop };
    }, elementHandle);
};
exports.scroll = async (page, selector, { timeout, x, y }) => {
    const elementHandle = await page.waitForSelector(selector);
    const startScrollValue = await exports.getScrollValue(page, elementHandle);
    try {
        await page.waitForFunction(({ element, x, y }) => {
            element.scroll(x, y);
            return element.scrollLeft === x && element.scrollTop === y;
        }, { element: elementHandle, x, y }, { polling: 100, timeout: timeout || exports.DEFAULT_TIMEOUT });
    }
    catch (error) {
        const endScrollValue = await exports.getScrollValue(page, elementHandle);
        if (startScrollValue.x !== endScrollValue.x ||
            startScrollValue.y !== endScrollValue.y) {
            // were able to scroll at least somewhat, don't throw error
            return;
        }
        throw new Error(`could not scroll element ${selector}`);
    }
};
//# sourceMappingURL=scroll.js.map
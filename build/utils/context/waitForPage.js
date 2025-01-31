"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForPage = void 0;
const indexPages_1 = require("./indexPages");
const waitFor_1 = require("../waitFor");
exports.waitForPage = async (context, index, options = {}) => {
    // index pages if they are not yet
    await indexPages_1.indexPages(context);
    const page = await waitFor_1.waitFor(async () => {
        const pages = context.pages();
        const match = pages.find((page) => page.createdIndex === index);
        return match;
    }, { timeout: options.timeout || 30000 });
    if (options.waitUntil !== null) {
        await page.waitForLoadState(options.waitUntil || 'load');
    }
    await page.bringToFront();
    return page;
};
//# sourceMappingURL=waitForPage.js.map
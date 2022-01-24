"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEachFrame = exports.forEachPage = void 0;
exports.forEachPage = async (context, pageFn) => {
    context.on('page', (page) => pageFn(page));
    const pagePromises = context.pages().map((page) => pageFn(page));
    await Promise.all(pagePromises);
};
exports.forEachFrame = async (context, frameFn) => {
    await exports.forEachPage(context, async (page) => {
        const framePromises = page
            .frames()
            .map((frame) => frameFn({ page, frame }));
        page.on('frameattached', (frame) => frameFn({ page, frame }));
        await Promise.all(framePromises);
    });
};
//# sourceMappingURL=forEach.js.map
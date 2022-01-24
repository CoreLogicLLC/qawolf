"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStepLines = exports.buildExpressionLine = exports.buildValue = exports.escapeSelector = exports.getStepPageVariableName = void 0;
/**
 * @summary Given a step, returns the correct page variable for it,
 *   such as `page` for the main page or `page2` for the second page.
 */
exports.getStepPageVariableName = (step) => {
    const { page } = step.event;
    return `page${page === 0 ? '' : page + 1}`;
};
exports.escapeSelector = (selector) => {
    if (!selector.includes(`"`))
        return `"${selector}"`;
    if (!selector.includes(`'`))
        return `'${selector}'`;
    return '`' + selector.replace(/`/g, '\\`') + '`';
};
exports.buildValue = ({ action, value }) => {
    if (action === 'scroll') {
        const scrollValue = value;
        return `{ x: ${scrollValue.x}, y: ${scrollValue.y} }`;
    }
    if (value === undefined)
        return '';
    return JSON.stringify(value);
};
exports.buildExpressionLine = (step, frameVariable) => {
    const { action, event } = step;
    const args = [];
    const selector = event.selector;
    if (selector)
        args.push(exports.escapeSelector(selector));
    const value = exports.buildValue(step);
    if (value)
        args.push(value);
    if (['goto'].includes(action)) {
        args.push('{ waitUntil: "domcontentloaded" }');
    }
    const browsingContext = frameVariable || exports.getStepPageVariableName(step);
    let methodOpen = `${browsingContext}.${action}(`;
    if (action === 'scroll') {
        methodOpen = `qawolf.scroll(${browsingContext}, `;
    }
    const expression = `await ${methodOpen}${args.join(', ')});`;
    return expression;
};
exports.buildStepLines = (step, buildContext = {
    initializedFrames: new Map(),
    initializedPages: new Set([]),
    visiblePage: 0,
}) => {
    const lines = [];
    const { frameIndex, frameSelector, page } = step.event;
    const { initializedFrames, initializedPages } = buildContext;
    // The page variable is the word "page" followed by 1-based index, but just "page" for first page.
    const pageVariableName = exports.getStepPageVariableName(step);
    // If we haven't done anything on this page yet, add a `qawolf.waitForPage` call.
    // Otherwise, if we were doing steps on a different page and have now switched back
    // to this one, add a `bringToFront` call. Otherwise no extra page-waiting line is needed.
    if (!initializedPages.has(page)) {
        if (step.action === 'goto') {
            lines.push(`const ${pageVariableName} = await context.newPage();`);
        }
        else {
            lines.push(`const ${pageVariableName} = await qawolf.waitForPage(context, ${page}, { waitUntil: "domcontentloaded" });`);
            // Since waitForPage calls `bringToFront`, update our visible page tracking.
            // This will also ensure we don't call `bringToFront` again below.
            buildContext.visiblePage = page;
        }
        initializedPages.add(page);
    }
    if (buildContext.visiblePage !== page) {
        lines.push(`await ${pageVariableName}.bringToFront();`);
        buildContext.visiblePage = page;
    }
    // If the step occurred within an iframe on the page, use the frame variable as the
    // context for the step. If this is the first use of this frame variable, create it first.
    let frameVariableName;
    if (frameSelector) {
        frameVariableName = initializedFrames.get(frameIndex + frameSelector);
        if (!frameVariableName) {
            frameVariableName = `frame${initializedFrames.size ? initializedFrames.size + 1 : ''}`;
            lines.push(`const ${frameVariableName} = await (await ${pageVariableName}.waitForSelector(${exports.escapeSelector(frameSelector)})).contentFrame();`);
            initializedFrames.set(frameIndex + frameSelector, frameVariableName);
        }
    }
    // Now add the line for what the user actually did (click, scroll, fill, etc.)
    lines.push(exports.buildExpressionLine(step, frameVariableName));
    return lines;
};
//# sourceMappingURL=buildStepLines.js.map
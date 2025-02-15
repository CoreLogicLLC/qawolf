"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildVirtualCode = void 0;
const buildStepLines_1 = require("./buildStepLines");
const VirtualCode_1 = require("./VirtualCode");
exports.buildVirtualCode = (steps) => {
    const lines = [];
    const buildContext = {
        initializedFrames: new Map(),
        initializedPages: new Set([]),
        visiblePage: 0,
    };
    steps.forEach((step) => {
        lines.push(...buildStepLines_1.buildStepLines(step, buildContext));
    });
    return new VirtualCode_1.VirtualCode(lines);
};
//# sourceMappingURL=buildVirtualCode.js.map
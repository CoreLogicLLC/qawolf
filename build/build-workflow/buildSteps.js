"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSteps = void 0;
const lodash_1 = require("lodash");
const buildClickSteps_1 = require("./buildClickSteps");
const buildFillSteps_1 = require("./buildFillSteps");
const buildNavigationSteps_1 = require("./buildNavigationSteps");
const buildPressSteps_1 = require("./buildPressSteps");
const buildScrollSteps_1 = require("./buildScrollSteps");
const buildSelectOptionSteps_1 = require("./buildSelectOptionSteps");
exports.buildSteps = (elementEvents, windowEvents = []) => {
    const unorderedSteps = lodash_1.concat(buildClickSteps_1.buildClickSteps(elementEvents), buildFillSteps_1.buildFillSteps(elementEvents), buildPressSteps_1.buildPressSteps(elementEvents), buildScrollSteps_1.buildScrollSteps(elementEvents), buildSelectOptionSteps_1.buildSelectOptionSteps(elementEvents), buildNavigationSteps_1.buildNavigationSteps(windowEvents));
    let steps = lodash_1.sortBy(unorderedSteps, 
    // ordered by the event time
    (step) => step.event.time);
    // reindex
    steps = steps.map((step, index) => ({
        ...step,
        index,
    }));
    return steps;
};
//# sourceMappingURL=buildSteps.js.map
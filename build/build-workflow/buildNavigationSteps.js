"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNavigationSteps = void 0;
exports.buildNavigationSteps = (events) => {
    return events.map((event, index) => ({
        action: event.name,
        event,
        index,
        value: event.value,
    }));
};
//# sourceMappingURL=buildNavigationSteps.js.map
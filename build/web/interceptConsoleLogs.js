"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptConsoleLogs = exports.formatArgument = void 0;
const serialize_1 = require("./serialize");
const LOG_LEVELS = ['debug', 'error', 'info', 'log', 'warn'];
exports.formatArgument = (argument) => {
    if (typeof argument === 'string') {
        return argument;
    }
    if (argument && argument.nodeName) {
        // log nodes as their xpath
        return serialize_1.getXpath(argument);
    }
    try {
        return JSON.stringify(argument);
    }
    catch (error) {
        if (argument && argument.toString) {
            return argument.toString();
        }
        return '';
    }
};
exports.interceptConsoleLogs = () => {
    if (window.qawInterceptLogs)
        return;
    window.qawInterceptLogs = true;
    LOG_LEVELS.forEach((level) => {
        const browserLog = console[level].bind(console);
        // console[level] = (...args: any): any => {
        //   const message: string = args
        //     .map((arg: any) => formatArgument(arg))
        //     .join(' ');
        //   browserLog(...args);
        //   // playwright is currently using logs as its message transport. prevent infinite loop.
        //   if (message.includes('__playwright')) return;
        //   const logCallback = (window as any).qawLogEvent;
        //   if (logCallback) logCallback({ level, message });
        // };
    });
};
//# sourceMappingURL=interceptConsoleLogs.js.map
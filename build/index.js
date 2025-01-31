#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const qawolf = __importStar(require("./qawolf"));
const utils_1 = require("./utils");
// support: const qawolf = require("qawolf");
// support: import { ... } from "qawolf";
__exportStar(require("./qawolf"), exports);
// support: import qawolf from "qawolf"
exports.default = qawolf;
// must do this here to prevent circular dependency
utils_1.Registry.instance().setQawolf(qawolf);
if (!module.parent) {
    // run the cli when this is the root module
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { runCli } = require('./cli/cli');
    runCli();
}
//# sourceMappingURL=index.js.map
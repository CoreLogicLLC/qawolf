"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateManager = void 0;
const debug_1 = __importDefault(require("debug"));
const buildSteps_1 = require("../build-workflow/buildSteps");
const CodeFileUpdater_1 = require("./CodeFileUpdater");
const ContextEventCollector_1 = require("./ContextEventCollector");
const createPrompt_1 = require("./createPrompt");
const debug = debug_1.default('qawolf:CreateManager');
class CreateManager {
    constructor(options) {
        this._events = [];
        this._windowEvents = [];
        this._codeUpdater = options.codeUpdater;
        this._collector = options.collector;
        this._collector.on('elementevent', (event) => this.update(event));
        this._collector.on('windowevent', (event) => this.update(event, true));
    }
    static async create(options) {
        debug(`create code at ${options.codePath}`);
        const codeUpdater = await CodeFileUpdater_1.CodeFileUpdater.create(options.codePath);
        const collector = await ContextEventCollector_1.ContextEventCollector.create(options.context);
        const manager = new CreateManager({
            codeUpdater,
            collector,
        });
        return manager;
    }
    async update(event, isWindowEvent = false) {
        if (isWindowEvent) {
            this._windowEvents.push(event);
        }
        else {
            this._events.push(event);
        }
        const steps = buildSteps_1.buildSteps(this._events, this._windowEvents);
        await this._codeUpdater.update({ steps });
    }
    async finalize() {
        const shouldSave = await createPrompt_1.createPrompt(this._codeUpdater.path());
        if (shouldSave) {
            await this._codeUpdater.finalize();
        }
        else {
            await this._codeUpdater.discard();
        }
    }
}
exports.CreateManager = CreateManager;
//# sourceMappingURL=CreateManager.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeUpdater = void 0;
const debug_1 = __importDefault(require("debug"));
const events_1 = require("events");
const buildVirtualCode_1 = require("../build-code/buildVirtualCode");
const CodeReconciler_1 = require("./CodeReconciler");
const format_1 = require("./format");
const patchCode_1 = require("./patchCode");
const debug = debug_1.default('qawolf:CodeUpdater');
class CodeUpdater extends events_1.EventEmitter {
    constructor() {
        super();
        this._locked = false;
        this._reconciler = new CodeReconciler_1.CodeReconciler();
    }
    async _update(code) {
        debug('update code');
        this.emit('codeupdate', code);
        await this._updateCode(code);
    }
    async _prepare() {
        const code = await this._loadCode();
        const createLine = format_1.getLineIncludes(code, patchCode_1.CREATE_HANDLE);
        if (!createLine)
            return;
        const updatedCode = code.replace(createLine.trim(), patchCode_1.PATCH_HANDLE);
        await this._update(updatedCode);
    }
    async finalize() {
        this._locked = true;
        let code = await this._loadCode();
        code = format_1.removeLinesIncluding(code, patchCode_1.PATCH_HANDLE);
        await this._update(code);
    }
    async update(options) {
        // do not conflict with an update in progress
        if (this._locked) {
            debug(`skip update: update in progress`);
            return;
        }
        // check the virtual code changed
        const updatedVirtualCode = buildVirtualCode_1.buildVirtualCode(options.steps);
        if (!this._reconciler.hasChanges(updatedVirtualCode)) {
            debug(`skip update: no virtual changes`);
            return;
        }
        this._locked = true;
        // update the actual code
        const actualCode = await this._loadCode();
        const updatedCode = this._reconciler.reconcile({
            actualCode,
            virtualCode: updatedVirtualCode,
        });
        await this._update(updatedCode);
        // store the updated virtual code
        this._reconciler.update(updatedVirtualCode);
        this._locked = false;
    }
}
exports.CodeUpdater = CodeUpdater;
//# sourceMappingURL=CodeUpdater.js.map
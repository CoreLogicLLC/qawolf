"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getCreatePath = void 0;
const callsites_1 = __importDefault(require("callsites"));
const debug_1 = __importDefault(require("debug"));
const fs_extra_1 = require("fs-extra");
const kleur_1 = require("kleur");
const lodash_1 = require("lodash");
const CreateManager_1 = require("./CreateManager");
const format_1 = require("./format");
const patchCode_1 = require("./patchCode");
const utils_1 = require("../utils");
const debug = debug_1.default('qawolf:create');
exports.getCreatePath = async (callerFileNames) => {
    debug(`search caller files for ${patchCode_1.CREATE_HANDLE} %j`, callerFileNames);
    const codes = await Promise.all(callerFileNames.map(async (filename) => {
        let code = '';
        if (await fs_extra_1.pathExists(filename)) {
            code = await fs_extra_1.readFile(filename, 'utf8');
        }
        return { code, filename };
    }));
    const item = lodash_1.findLast(codes, ({ code }) => !!format_1.getLineIncludes(code, patchCode_1.CREATE_HANDLE));
    if (!item) {
        throw new Error(`Could not find ${patchCode_1.CREATE_HANDLE} in caller`);
    }
    return item.filename;
};
exports.create = async (url) => {
    const registryData = utils_1.Registry.instance().data();
    const context = registryData.context;
    if (!context) {
        throw new Error('No context found. Call qawolf.register(context) before qawolf.create()');
    }
    const callerFileNames = callsites_1.default().map((c) => c.getFileName());
    const codePath = await exports.getCreatePath(callerFileNames);
    const manager = await CreateManager_1.CreateManager.create({
        codePath,
        context,
    });
    if (context.pages().length === 0) {
        const firstPage = await context.newPage();
        if (url)
            await firstPage.goto(url);
    }
    console.log(kleur_1.bold().blue('🐺  QA Wolf is ready to create code!'));
    await manager.finalize();
    if (registryData.browser) {
        await registryData.browser.close();
    }
    // if the process does not exit on its own, force it to exit
    setTimeout(() => process.exit(), 500);
};
//# sourceMappingURL=create.js.map
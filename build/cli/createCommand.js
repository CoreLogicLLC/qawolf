"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCreateCommand = exports.runCreate = void 0;
const commander_1 = require("commander");
const config_1 = require("../config");
const parseUrl_1 = require("./parseUrl");
const buildEditOptions_1 = require("../run/buildEditOptions");
const runTests_1 = require("../run/runTests");
const saveTemplate_1 = require("./saveTemplate");
const DEFAULT_TEST_FILE_BASE_NAME = 'qawolf';
exports.runCreate = async (options) => {
    const config = config_1.loadConfig();
    const testPath = await saveTemplate_1.saveTemplate({
        device: options.device,
        name: options.name,
        rootDir: config.rootDir,
        statePath: options.statePath,
        templateFn: config.createTemplate,
        url: options.url,
        useTypeScript: config.useTypeScript,
    });
    if (!testPath) {
        // the user decided to not overwrite
        return;
    }
    runTests_1.runTests(buildEditOptions_1.buildEditOptions({
        args: options.args,
        config,
        env: {
            // discard should delete the test and selectors
            QAW_CREATE: 'true',
        },
        testPath,
    }));
};
exports.buildCreateCommand = () => {
    const command = new commander_1.Command('create')
        .storeOptionsAsProperties(false)
        .arguments('[url] [name]')
        .option('-d, --device <device>', 'emulate using a playwright.device')
        .option('--name <name>', 'name')
        .option('--statePath <statePath>', 'path where state data (cookies, localStorage, sessionStorage) is saved')
        .option('--url <url>', 'url')
        .description('✨ create a test from browser actions')
        .action(async () => {
        const opts = command.opts();
        const [urlArgument, nameArgument] = command.args;
        let url = opts.url || urlArgument;
        let name = opts.name || nameArgument;
        if (url && url.length) {
            const parsedUrl = parseUrl_1.parseUrl(url);
            url = parsedUrl.href;
            if (!name) {
                name = (parsedUrl.hostname || '').replace(/\..*/g, '');
                if (name.length === 0)
                    name = DEFAULT_TEST_FILE_BASE_NAME;
            }
        }
        else {
            name = DEFAULT_TEST_FILE_BASE_NAME;
        }
        await exports.runCreate({
            device: opts.device,
            name,
            statePath: opts.statePath,
            url,
        });
    });
    return command;
};
//# sourceMappingURL=createCommand.js.map
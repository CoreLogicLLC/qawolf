"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCli = void 0;
const commander_1 = __importDefault(require("commander"));
const kleur_1 = require("kleur");
const update_notifier_1 = __importDefault(require("update-notifier"));
const createCommand_1 = require("./createCommand");
const editCommand_1 = require("./editCommand");
const howlCommand_1 = require("./howlCommand");
const testCommand_1 = require("./testCommand");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package');
update_notifier_1.default({ pkg }).notify();
commander_1.default.usage('<command> [options]').version(pkg.version);
commander_1.default.addCommand(createCommand_1.buildCreateCommand());
commander_1.default.addCommand(editCommand_1.buildEditCommand());
commander_1.default.addCommand(howlCommand_1.buildHowlCommand());
commander_1.default.addCommand(testCommand_1.buildTestCommand());
commander_1.default.arguments('<command>').action((cmd) => {
    console.log(kleur_1.yellow(`Invalid command "${cmd}"\n`));
    commander_1.default.help();
});
commander_1.default.allowUnknownOption(false);
exports.runCli = () => {
    commander_1.default.parse(process.argv);
};
//# sourceMappingURL=cli.js.map
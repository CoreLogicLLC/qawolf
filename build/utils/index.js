"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitFor = exports.Registry = exports.repl = exports.launch = exports.getLaunchOptions = exports.setState = exports.scroll = exports.saveState = exports.openScreenshot = exports.assertElementText = exports.waitForPage = exports.stopVideos = exports.saveConsoleLogs = exports.saveArtifacts = exports.register = exports.forEachPage = exports.forEachFrame = void 0;
// context utils
var forEach_1 = require("./context/forEach");
Object.defineProperty(exports, "forEachFrame", { enumerable: true, get: function () { return forEach_1.forEachFrame; } });
Object.defineProperty(exports, "forEachPage", { enumerable: true, get: function () { return forEach_1.forEachPage; } });
var register_1 = require("./context/register");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return register_1.register; } });
var saveArtifacts_1 = require("./context/saveArtifacts");
Object.defineProperty(exports, "saveArtifacts", { enumerable: true, get: function () { return saveArtifacts_1.saveArtifacts; } });
Object.defineProperty(exports, "saveConsoleLogs", { enumerable: true, get: function () { return saveArtifacts_1.saveConsoleLogs; } });
Object.defineProperty(exports, "stopVideos", { enumerable: true, get: function () { return saveArtifacts_1.stopVideos; } });
var waitForPage_1 = require("./context/waitForPage");
Object.defineProperty(exports, "waitForPage", { enumerable: true, get: function () { return waitForPage_1.waitForPage; } });
// page utils
var assertText_1 = require("./page/assertText");
Object.defineProperty(exports, "assertElementText", { enumerable: true, get: function () { return assertText_1.assertElementText; } });
var openScreenshot_1 = require("./page/openScreenshot");
Object.defineProperty(exports, "openScreenshot", { enumerable: true, get: function () { return openScreenshot_1.openScreenshot; } });
var saveState_1 = require("./page/saveState");
Object.defineProperty(exports, "saveState", { enumerable: true, get: function () { return saveState_1.saveState; } });
var scroll_1 = require("./page/scroll");
Object.defineProperty(exports, "scroll", { enumerable: true, get: function () { return scroll_1.scroll; } });
var setState_1 = require("./page/setState");
Object.defineProperty(exports, "setState", { enumerable: true, get: function () { return setState_1.setState; } });
// global utils
var launch_1 = require("./launch");
Object.defineProperty(exports, "getLaunchOptions", { enumerable: true, get: function () { return launch_1.getLaunchOptions; } });
Object.defineProperty(exports, "launch", { enumerable: true, get: function () { return launch_1.launch; } });
var repl_1 = require("./repl/repl");
Object.defineProperty(exports, "repl", { enumerable: true, get: function () { return repl_1.repl; } });
var Registry_1 = require("./Registry");
Object.defineProperty(exports, "Registry", { enumerable: true, get: function () { return Registry_1.Registry; } });
var waitFor_1 = require("./waitFor");
Object.defineProperty(exports, "waitFor", { enumerable: true, get: function () { return waitFor_1.waitFor; } });
//# sourceMappingURL=index.js.map
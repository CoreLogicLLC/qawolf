"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTemplate = exports.buildNewContext = exports.buildImports = exports.buildValidVariableName = void 0;
const lodash_1 = require("lodash");
const playwright_1 = require("playwright");
exports.buildValidVariableName = (name) => {
    try {
        // try creating variable with specified name
        eval(`const ${name} = 0`);
        return name;
    }
    catch (error) {
        if (error.message === 'Missing initializer in const declaration') {
            return lodash_1.camelCase(name);
        }
        // other errors are for names that will never be valid like return or 1var
        throw new Error(`invalid script name: ${name}`);
    }
};
exports.buildImports = ({ device, useTypeScript, }) => {
    if (device && !playwright_1.devices[device]) {
        throw new Error(`Device ${device} not available in Playwright`);
    }
    let imports = '';
    if (useTypeScript) {
        if (device) {
            imports = 'import { Browser, BrowserContext, devices } from "playwright";';
        }
        else {
            imports = 'import { Browser, BrowserContext } from "playwright";';
        }
        imports += '\nimport qawolf from "qawolf";';
    }
    else {
        // not typescript
        if (device) {
            imports = 'const { devices } = require("playwright");\n';
        }
        imports += 'const qawolf = require("qawolf");';
    }
    if (device) {
        imports += `\nconst device = devices["${device}"];`;
    }
    return imports;
};
exports.buildNewContext = (device) => {
    if (!device)
        return 'context = await browser.newContext();';
    const context = `context = await browser.newContext({ ...device });`;
    return context;
};
const buildSetState = (statePath) => {
    if (!statePath)
        return '';
    return `\n  await qawolf.setState(page, "${statePath}");`;
};
exports.buildTemplate = ({ device, name, statePath, url, useTypeScript, }) => {
    const code = `${exports.buildImports({ device, useTypeScript })}

let browser${useTypeScript ? ': Browser' : ''};
let context${useTypeScript ? ': BrowserContext' : ''};

beforeAll(async () => {
  browser = await qawolf.launch();
  ${exports.buildNewContext(device)}
  await qawolf.register(context);
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("${name}", async () => {${buildSetState(statePath)}
  await qawolf.create(${url && url.length ? `"${url}"` : ''});
});`;
    return code;
};
//# sourceMappingURL=buildTemplate.js.map
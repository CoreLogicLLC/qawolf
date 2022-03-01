<p align="center"><img src="https://docs.qawolf.com/img/logo_small.png" height="80" /></p>

<h1 align="center">QA Wolf</h1>

<h3 align="center">Create browser tests 10x faster</h3>

<p align="center">Free and open source library to create <a href="https://github.com/microsoft/playwright">Playwright</a>/<a href="https://jestjs.io">Jest</a> browser tests and run them in CI</p>

<p align="center">
<a align="center" href="https://twitter.com/intent/tweet?text=%F0%9F%90%BA+QA+Wolf%3A+Create+browser+tests+10x+faster&url=https%3A%2F%2Fgithub.com%2Fqawolf%2Fqawolf"><img src="https://img.shields.io/twitter/url/https/github.com/tterb/hyde.svg?style=social" alt="tweet" /></a>
  <a href="http://badge.fury.io/js/qawolf"><img src="https://badge.fury.io/js/qawolf.svg" alt="npm version" /></a>
  <img src="https://github.com/qawolf/qawolf/workflows/QA%20Wolf%20Linux%20Tests/badge.svg" />
  <img src="https://github.com/qawolf/qawolf/workflows/QA%20Wolf%20Windows%20Tests/badge.svg" />
</p>

<p align="center">
    <a href="https://docs.qawolf.com/docs/install">🚀 Get Started</a> |
    <a href="https://docs.qawolf.com/docs/api/table_of_contents">📖 API</a> |
    <a href="https://gitter.im/qawolf/community">👋 Chat</a> |
    <a href="https://github.com/qawolf/qawolf/projects/4">🗺️ Roadmap</a>
</p>

<img src="https://storage.googleapis.com/docs.qawolf.com/website/create.gif">

<br/>

## 🐺 What is QA Wolf?

QA Wolf is a Node.js library for creating browser tests. Run one command (`npm init qawolf@latest` or `yarn create qawolf`) to configure your project and set up CI.

- **Skip writing boilerplate:** Your browser actions are converted to [Playwright](https://github.com/microsoft/playwright)/[Jest](https://jestjs.io) code.
- **Create stable tests:** Your tests automatically wait for elements. Element selectors use test attributes when possible, and CSS/text otherwise.
- **Edit your tests:** Edit your code as it is created and add steps to existing tests. Re-run your tests automatically with watch mode.
- **Run tests in CI:** A workflow file for your CI provider is automatically created for you.
- **Debug with ease:** Each test run includes a video and browser logs.

<br/>

## 🖥️ Install

[Documentation](https://docs.qawolf.com/docs/install)

<br />

Set up your project for browser tests:

```bash
cd /my/awesome/project
npm init qawolf@latest
# or yarn create qawolf
```

Configure your test directory and CI provider:

```
? rootDir: Directory to create tests in (.qawolf)

? Set up CI with GitHub Actions? (y/N)
```

This will install `qawolf`, `jest` and `playwright` as dev dependencies and create a [CI workflow file](https://docs.qawolf.com/docs/run_tests_in_ci) to:

- 🐎 Run tests in parallel
- 📹 Record a video of each test
- 📄 Capture browser logs

<br/>

## 🎨 Create a test

[Documentation](https://docs.qawolf.com/docs/create_a_test)

<br />

```bash
npx qawolf create [url] [name]
```

💪 Convert your actions into [Playwright](https://github.com/microsoft/playwright) code:

| Action                                                       | Status | Example                                                                    |
| ------------------------------------------------------------ | :----: | -------------------------------------------------------------------------- |
| Click                                                        |   ✅   | `page.click('#login')`                                                     |
| Type                                                         |   ✅   | `page.fill('.username', 'spirit@qawolf.com')`                              |
| Scroll                                                       |   ✅   | `qawolf.scroll(page, 'html', { x: 0, y: 200 })`                            |
| Select                                                       |   ✅   | `page.selectOption('.ice_cream', 'chocolate')`                             |
| Paste                                                        |   ✅   | `page.fill('password', 'pasted')`                                          |
| Reload                                                       |   ✅   | `page.reload()`                                                            |
| Replace text                                                 |   ✅   | `page.fill('.username', 'username')`                                       |
| Go back                                                      |   ✅   | `page.goBack()`                                                            |
| Use iframes                                                  |   ✅   | `(await page.waitForSelector("#storybook-preview-iframe")).contentFrame()` |
| Use multiple tabs                                            |   ✅   | `context.newPage()`                                                        |
| Use a popup                                                  |   ✅   | `qawolf.waitForPage(context, 1)`                                           |
| Use a test attribute                                         |   ✅   | `page.click("[data-qa='submit']")`                                         |
| Use a test attribute on an ancestor                          |   ✅   | `page.click("[data-qa='radio'] [value='cat']")`                            |
| [Drag and drop](https://github.com/qawolf/qawolf/issues/315) |   🗺️   | Coming soon                                                                |
| [File upload](https://github.com/qawolf/qawolf/issues/331)   |   🗺️   | Coming soon                                                                |

As your test is created:

- ✏️ Edit the code as you like
- 🖥️ <a href="https://docs.qawolf.com/docs/use_the_repl">Use the REPL</a> to try out commands

<br/>

## ✅ Run your tests

[Documentation](https://docs.qawolf.com/docs/run_tests_locally)

<br />

On Chromium:

```bash
npx qawolf test [name]
```

On Firefox:

```bash
npx qawolf test --firefox [name]
```

On Webkit:

```bash
npx qawolf test --webkit [name]
```

On all browsers:

```bash
npx qawolf test --all-browsers [name]
```

<br/>

## 🙋 Get help

We want QA Wolf to work for you, so please reach out to get help!

If you have a feature request or feedback, please [open an issue](https://github.com/qawolf/qawolf/issues/new) or [chat with us](https://gitter.im/qawolf/community).

<br/>

## 📝 License

QA Wolf is licensed under [BSD-3-Clause](https://github.com/qawolf/qawolf/blob/main/LICENSE.md).


## Used Licenses
<table><thead><tr><th class="string">department</th><th class="string">related to</th><th class="string">name</th><th class="string">license period</th><th class="string">material / not material</th><th class="string">license type</th><th class="string">link</th><th class="string">remote version</th><th class="string">installed version</th><th class="string">defined version</th><th class="string">author</th></tr></thead><tbody><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@qawolf/jest-reporter</td><td class="string">perpetual</td><td class="string">material</td><td class="string">BSD-3.0</td><td class="string">https://registry.npmjs.org/@qawolf/jest-reporter/-/jest-reporter-0.1.0.tgz</td><td class="string">0.1.0</td><td class="string">0.1.0</td><td class="string">^0.1.0</td><td class="string">QA Wolf</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">an-array-of-english-words</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/words/an-array-of-english-words.git</td><td class="string">2.0.0</td><td class="string">2.0.0</td><td class="string">^2.0.0</td><td class="string">Zeke Sikelianos zeke@sikelianos.com http://zeke.sikelianos.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">await-outside</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/nfcampos/await-outside.git</td><td class="string">3.0.0</td><td class="string">3.0.0</td><td class="string">^3.0.0</td><td class="string">Nuno Campos nuno.campos@me.com https://github.com/nfcampos</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">callsites</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/sindresorhus/callsites.git</td><td class="string">3.1.0</td><td class="string">3.1.0</td><td class="string">^3.1.0</td><td class="string">Sindre Sorhus sindresorhus@gmail.com https://sindresorhus.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">chokidar</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/paulmillr/chokidar.git</td><td class="string">3.5.3</td><td class="string">3.4.2</td><td class="string">^3.4.2</td><td class="string">Paul Miller https://paulmillr.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">commander</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/tj/commander.js.git</td><td class="string">6.2.1</td><td class="string">6.1.0</td><td class="string">^6.1.0</td><td class="string">TJ Holowaychuk tj@vision-media.ca</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">create-qawolf</td><td class="string">perpetual</td><td class="string">material</td><td class="string">BSD-3-Clause</td><td class="string">https://registry.npmjs.org/create-qawolf/-/create-qawolf-1.7.0.tgz</td><td class="string">1.7.0</td><td class="string">1.3.6</td><td class="string">^1.3.6</td><td class="string">QA Wolf</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">debug</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git://github.com/debug-js/debug.git</td><td class="string">4.3.3</td><td class="string">4.1.1</td><td class="string">*</td><td class="string">TJ Holowaychuk tj@vision-media.ca</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">glob</td><td class="string">perpetual</td><td class="string">material</td><td class="string">ISC</td><td class="string">git://github.com/isaacs/node-glob.git</td><td class="string">7.2.0</td><td class="string">7.1.6</td><td class="string">^7.1.6</td><td class="string">Isaac Z. Schlueter i@izs.me http://blog.izs.me/</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">html-tags</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/sindresorhus/html-tags.git</td><td class="string">3.1.0</td><td class="string">3.1.0</td><td class="string">^3.1.0</td><td class="string">Sindre Sorhus sindresorhus@gmail.com sindresorhus.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">inquirer</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/SBoudrias/Inquirer.js.git</td><td class="string">7.3.3</td><td class="string">7.3.3</td><td class="string">^7.3.3</td><td class="string">Simon Boudrias admin@simonboudrias.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">kleur</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/lukeed/kleur.git</td><td class="string">4.1.4</td><td class="string">4.1.1</td><td class="string">^4.1.1</td><td class="string">Luke Edwards luke.edwards05@gmail.com https://lukeed.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">open</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/sindresorhus/open.git</td><td class="string">7.4.2</td><td class="string">7.2.1</td><td class="string">^7.2.1</td><td class="string">Sindre Sorhus sindresorhus@gmail.com https://sindresorhus.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">playwright</td><td class="string">perpetual</td><td class="string">material</td><td class="string">Apache-2.0</td><td class="string">git+https://github.com/Microsoft/playwright.git</td><td class="string">1.20.0-alpha-mar-1-2022</td><td class="string">1.20.0-alpha-feb-25-2022</td><td class="string">^1.20.0-alpha-feb-25-2022</td><td class="string">Microsoft Corporation</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">playwright-video</td><td class="string">perpetual</td><td class="string">material</td><td class="string">BSD-3-Clause-Clear</td><td class="string">git+https://github.com/qawolf/playwright-video.git</td><td class="string">2.4.0</td><td class="string">2.4.0</td><td class="string">^2.4.0</td><td class="string">QA Wolf</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">split</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git://github.com/dominictarr/split.git</td><td class="string">1.0.1</td><td class="string">1.0.1</td><td class="string">^1.0.1</td><td class="string">Dominic Tarr dominic.tarr@gmail.com http://bit.ly/dominictarr</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">tempy</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/sindresorhus/tempy.git</td><td class="string">0.7.1</td><td class="string">0.7.0</td><td class="string">^0.7.0</td><td class="string">Sindre Sorhus sindresorhus@gmail.com https://sindresorhus.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">update-notifier</td><td class="string">perpetual</td><td class="string">material</td><td class="string">BSD-2-Clause</td><td class="string">git+https://github.com/yeoman/update-notifier.git</td><td class="string">4.1.3</td><td class="string">4.1.1</td><td class="string">^4.1.1</td><td class="string">Sindre Sorhus sindresorhus@gmail.com https://sindresorhus.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@ffmpeg-installer/ffmpeg</td><td class="string">perpetual</td><td class="string">material</td><td class="string">LGPL-2.1</td><td class="string">git+https://github.com/kribblo/node-ffmpeg-installer.git</td><td class="string">1.1.0</td><td class="string">1.0.20</td><td class="string">^1.0.20</td><td class="string">Kristoffer Lundén kristoffer.lunden@gmail.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@qawolf/sandbox</td><td class="string">perpetual</td><td class="string">material</td><td class="undefined"></td><td class="string">https://registry.npmjs.org/@qawolf/sandbox/-/sandbox-0.1.26.tgz</td><td class="string">0.1.26</td><td class="string">0.1.26</td><td class="string">0.1.26</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@types/debug</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">https://github.com/DefinitelyTyped/DefinitelyTyped.git</td><td class="string">4.1.7</td><td class="string">4.1.5</td><td class="string">^4.1.5</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@types/fs-extra</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">https://github.com/DefinitelyTyped/DefinitelyTyped.git</td><td class="string">9.0.13</td><td class="string">9.0.1</td><td class="string">^9.0.1</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@types/glob</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">https://github.com/DefinitelyTyped/DefinitelyTyped.git</td><td class="string">7.2.0</td><td class="string">7.1.3</td><td class="string">^7.1.3</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@types/inquirer</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">https://github.com/DefinitelyTyped/DefinitelyTyped.git</td><td class="string">7.3.3</td><td class="string">7.3.1</td><td class="string">^7.3.1</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@types/jest</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">https://github.com/DefinitelyTyped/DefinitelyTyped.git</td><td class="string">26.0.24</td><td class="string">26.0.14</td><td class="string">^26.0.14</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@types/lodash</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">https://github.com/DefinitelyTyped/DefinitelyTyped.git</td><td class="string">4.14.179</td><td class="string">4.14.161</td><td class="string">^4.14.161</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@types/node</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">https://github.com/DefinitelyTyped/DefinitelyTyped.git</td><td class="string">14.18.12</td><td class="string">14.11.2</td><td class="string">^14.11.2</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@types/update-notifier</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">https://github.com/DefinitelyTyped/DefinitelyTyped.git</td><td class="string">4.1.1</td><td class="string">4.1.1</td><td class="string">^4.1.1</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@types/ws</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">https://github.com/DefinitelyTyped/DefinitelyTyped.git</td><td class="string">7.4.7</td><td class="string">7.2.6</td><td class="string">^7.2.6</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@typescript-eslint/eslint-plugin</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/typescript-eslint/typescript-eslint.git</td><td class="string">4.33.0</td><td class="string">4.2.0</td><td class="string">^4.2.0</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">@typescript-eslint/parser</td><td class="string">perpetual</td><td class="string">material</td><td class="string">BSD-2-Clause</td><td class="string">git+https://github.com/typescript-eslint/typescript-eslint.git</td><td class="string">4.33.0</td><td class="string">4.2.0</td><td class="string">^4.2.0</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">concurrently</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/kimmobrunfeldt/concurrently.git</td><td class="string">5.3.0</td><td class="string">5.3.0</td><td class="string">^5.3.0</td><td class="string">Kimmo Brunfeldt</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">eslint</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/eslint/eslint.git</td><td class="string">7.32.0</td><td class="string">7.9.0</td><td class="string">^7.9.0</td><td class="string">Nicholas C. Zakas nicholas+npm@nczconsulting.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">eslint-config-prettier</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/prettier/eslint-config-prettier.git</td><td class="string">6.15.0</td><td class="string">6.11.0</td><td class="string">^6.11.0</td><td class="string">Simon Lydell</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">eslint-plugin-jest</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/jest-community/eslint-plugin-jest.git</td><td class="string">24.7.0</td><td class="string">24.0.2</td><td class="string">^24.0.2</td><td class="string">Jonathan Kim hello@jkimbo.com jkimbo.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">fs-extra</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/jprichardson/node-fs-extra.git</td><td class="string">9.1.0</td><td class="string">9.0.1</td><td class="string">^9.0.1</td><td class="string">JP Richardson jprichardson@gmail.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">jest</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/facebook/jest.git</td><td class="string">26.6.3</td><td class="string">26.4.2</td><td class="string">^26.4.2</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">jest-mock-process</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/EpicEric/jest-mock-process.git</td><td class="string">1.4.1</td><td class="string">1.4.0</td><td class="string">^1.4.0</td><td class="string">Eric Rodrigues Pires ericpires9@gmail.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">playwright-webkit</td><td class="string">perpetual</td><td class="string">material</td><td class="string">Apache-2.0</td><td class="string">git+https://github.com/Microsoft/playwright.git</td><td class="string">1.7.0</td><td class="string">1.7.0</td><td class="string">1.7.0</td><td class="string">Microsoft Corporation</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">prettier</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/prettier/prettier.git</td><td class="string">2.5.1</td><td class="string">2.1.2</td><td class="string">^2.1.2</td><td class="string">James Long</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">rimraf</td><td class="string">perpetual</td><td class="string">material</td><td class="string">ISC</td><td class="string">git://github.com/isaacs/rimraf.git</td><td class="string">3.0.2</td><td class="string">3.0.2</td><td class="string">^3.0.2</td><td class="string">Isaac Z. Schlueter i@izs.me http://blog.izs.me/</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">ts-jest</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/kulshekhar/ts-jest.git</td><td class="string">26.5.6</td><td class="string">26.4.0</td><td class="string">^26.4.0</td><td class="string">Kulshekhar Kabra kulshekhar@users.noreply.github.com https://github.com/kulshekhar</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">ts-loader</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/TypeStrong/ts-loader.git</td><td class="string">8.3.0</td><td class="string">8.0.4</td><td class="string">^8.0.4</td><td class="string">John Reilly johnny_reilly@hotmail.com https://blog.johnnyreilly.com</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">ts-node</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git://github.com/TypeStrong/ts-node.git</td><td class="string">9.1.1</td><td class="string">9.0.0</td><td class="string">^9.0.0</td><td class="string">Blake Embrey hello@blakeembrey.com http://blakeembrey.me</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">typescript</td><td class="string">perpetual</td><td class="string">material</td><td class="string">Apache-2.0</td><td class="string">https://github.com/Microsoft/TypeScript.git</td><td class="string">4.6.2</td><td class="string">4.0.3</td><td class="string">^4.0.3</td><td class="string">Microsoft Corp.</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">webpack</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/webpack/webpack.git</td><td class="string">4.46.0</td><td class="string">4.44.2</td><td class="string">^4.44.2</td><td class="string">Tobias Koppers @sokra</td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">webpack-cli</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/webpack/webpack-cli.git</td><td class="string">3.3.12</td><td class="string">3.3.12</td><td class="string">^3.3.12</td><td class="string"></td></tr><tr><td class="string">WMS-test</td><td class="string">Web-test</td><td class="string">webpack-virtual-modules</td><td class="string">perpetual</td><td class="string">material</td><td class="string">MIT</td><td class="string">git+https://github.com/sysgears/webpack-virtual-modules.git</td><td class="string">0.3.2</td><td class="string">0.3.1</td><td class="string">^0.3.1</td><td class="string">SysGears INC</td></tr></tbody></table>
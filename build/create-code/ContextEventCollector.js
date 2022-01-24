"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextEventCollector = exports.buildFrameSelector = void 0;
const debug_1 = __importDefault(require("debug"));
const events_1 = require("events");
const config_1 = require("../config");
const attribute_1 = require("../web/attribute");
const forEach_1 = require("../utils/context/forEach");
const register_1 = require("../utils/context/register");
const debug = debug_1.default('qawolf:ContextEventCollector');
const BLANK_URLS = ['chrome://newtab/', 'about:blank'];
exports.buildFrameSelector = async (frame, attributes) => {
    // build the frame selector if this is one frame down from the parent
    const parentFrame = frame.parentFrame();
    if (parentFrame && !parentFrame.parentFrame()) {
        const frameElement = await frame.frameElement();
        const selector = await parentFrame.evaluate(({ attributes, frameElement }) => {
            const web = window.qawolf;
            return web.buildSelector({
                attributes,
                isClick: false,
                target: frameElement,
            });
        }, { attributes, frameElement });
        return selector;
    }
    return undefined;
};
class ContextEventCollector extends events_1.EventEmitter {
    constructor(context) {
        super();
        this._activeSessions = new Set();
        this._frameSelectors = new Map();
        this._pageNavigationHistory = new Map();
        this._attributes = (config_1.loadConfig().attribute || attribute_1.DEFAULT_ATTRIBUTE_LIST).split(',');
        this._context = context;
    }
    static async create(context) {
        const collector = new ContextEventCollector(context);
        await collector._create();
        return collector;
    }
    async _create() {
        if (!register_1.isRegistered(this._context)) {
            throw new Error('Use qawolf.register(context) first');
        }
        let frameIndex = 0;
        await forEach_1.forEachFrame(this._context, async ({ page, frame }) => {
            // eagerly build frame selectors so we have them after a page navigation
            try {
                if (frame.isDetached() || page.isClosed())
                    return;
                frameIndex += 1;
                const selector = await exports.buildFrameSelector(frame, this._attributes);
                this._frameSelectors.set(frame, { index: frameIndex, selector });
            }
            catch (error) {
                debug(`cannot build frame selector: ${error.message}`);
            }
        });
        await this._context.exposeBinding('qawElementEvent', async ({ frame, page }, elementEvent) => {
            const pageIndex = page.createdIndex;
            const event = { ...elementEvent, page: pageIndex };
            const { index, selector } = this._frameSelectors.get(frame) || {};
            if (selector) {
                event.frameIndex = index;
                event.frameSelector = selector;
            }
            debug(`emit %j`, event);
            this.emit('elementevent', event);
        });
        await forEach_1.forEachPage(this._context, async (page) => {
            const pageIndex = page.createdIndex;
            // Currently only ChromiumBrowserContext can do CDP, so we cannot support adding
            // new tabs manually or back/forward/reload on other browsers
            if (this._context.newCDPSession) {
                const session = await this._context.newCDPSession(page);
                const { currentIndex, entries } = await session.send("Page.getNavigationHistory");
                const highestEntryId = entries.reduce((highest, entry) => entry.id > highest ? entry.id : highest, 0);
                const currentHistoryEntry = entries[currentIndex];
                if (currentHistoryEntry.transitionType === 'typed' && !BLANK_URLS.includes(currentHistoryEntry.url)) {
                    this.emit('windowevent', {
                        name: 'goto',
                        page: pageIndex,
                        time: Date.now(),
                        value: currentHistoryEntry.url,
                    });
                }
                this._pageNavigationHistory.set(page, {
                    lastHighestEntryId: highestEntryId,
                    lastHistoryEntriesLength: entries.length,
                    lastHistoryIndex: currentIndex,
                });
                page.on('framenavigated', async (frame) => {
                    if (frame.parentFrame())
                        return;
                    const { currentIndex, entries } = await session.send("Page.getNavigationHistory");
                    const currentHistoryEntry = entries[currentIndex];
                    const highestEntryId = entries.reduce((highest, entry) => entry.id > highest ? entry.id : highest, 0);
                    const { lastHighestEntryId, lastHistoryEntriesLength, lastHistoryIndex, } = this._pageNavigationHistory.get(page);
                    this._pageNavigationHistory.set(page, {
                        lastHighestEntryId: highestEntryId,
                        lastHistoryEntriesLength: entries.length,
                        lastHistoryIndex: currentIndex,
                    });
                    let name;
                    let url;
                    // Detecting a `goto` (typed address) is the most difficult. There are a few factors:
                    // (1) The current history entry will have a transitionType of "typed"
                    // (2) But if we click Back and this goes back to a previous entry that was originally
                    //     typed, then it still has a transitionType of "typed".
                    // (3) Also, entries may stay the same length but yet have a different typed address
                    //     as the last entry, such as if we clicked Back and then entered a new address.
                    //
                    // The way we can detect these edge cases is by checking the `id` on the current entry
                    // and also tracking when a new `id` has been generated. We do this by finding the
                    // highest `id` because Chromium seems to always use an incrementing integer as the ID.
                    //
                    // If the current entry is both `typed` and has a newly-generated ID, then it is a `goto`
                    // unless it's a blank page, in which case we'll catch the real goto on the next run.
                    if (highestEntryId > lastHighestEntryId &&
                        currentHistoryEntry.id === highestEntryId &&
                        currentHistoryEntry.transitionType === 'typed' &&
                        !BLANK_URLS.includes(currentHistoryEntry.url)) {
                        // NEW ADDRESS ENTERED
                        name = 'goto';
                        url = currentHistoryEntry.url;
                    }
                    else if (lastHistoryEntriesLength === entries.length) {
                        if (currentIndex < lastHistoryIndex) {
                            // BACK
                            name = 'goBack';
                        }
                        else if (currentIndex > lastHistoryIndex) {
                            // FORWARD
                            // name = 'goForward';
                            // TODO: goForward works pretty well, but we can't currently tell the difference
                            // between the user clicking the Forward button and the user re-clicking a link
                            // that causes us to go forward in the history. So not implementing this yet.
                        }
                        else if (currentIndex === lastHistoryIndex && currentHistoryEntry.transitionType === 'reload') {
                            // RELOAD
                            name = 'reload';
                        }
                    }
                    if (!name)
                        return;
                    const event = {
                        name,
                        page: pageIndex,
                        time: Date.now(),
                        value: url,
                    };
                    this.emit('windowevent', event);
                });
                this._activeSessions.add(session);
            }
            else if (pageIndex === 0) {
                this.emit('windowevent', {
                    name: 'goto',
                    page: 0,
                    time: Date.now(),
                    value: page.url(),
                });
            }
        });
    }
}
exports.ContextEventCollector = ContextEventCollector;
//# sourceMappingURL=ContextEventCollector.js.map
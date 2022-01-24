"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageEventCollector = void 0;
const attribute_1 = require("./attribute");
const element_1 = require("./element");
const selector_1 = require("./selector");
const serialize_1 = require("./serialize");
class PageEventCollector {
    constructor(options) {
        this._onDispose = [];
        this._attributes = (options.attribute || attribute_1.DEFAULT_ATTRIBUTE_LIST).split(',');
        this.collectEvents();
        console.debug('PageEventCollector: created', options);
    }
    dispose() {
        this._onDispose.forEach((d) => d());
        console.debug('PageEventCollector: disposed');
    }
    listen(eventName, handler) {
        document.addEventListener(eventName, handler, {
            capture: true,
            passive: true,
        });
        this._onDispose.push(() => document.removeEventListener(eventName, handler, {
            // `capture` value must match for proper removal
            // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#Matching_event_listeners_for_removal
            capture: true,
        }));
    }
    sendEvent(eventName, event, value) {
        const eventCallback = window.qawElementEvent;
        if (!eventCallback)
            return;
        const isClick = ['click', 'mousedown'].includes(eventName);
        const target = element_1.getTopmostEditableElement(event.target);
        const isTargetVisible = element_1.isVisible(target, window.getComputedStyle(target));
        const selector = selector_1.buildSelector({
            attributes: this._attributes,
            isClick,
            target,
        });
        const elementEvent = {
            isTrusted: event.isTrusted && isTargetVisible,
            name: eventName,
            page: -1,
            selector,
            target: serialize_1.nodeToDoc(target),
            time: Date.now(),
            value,
        };
        console.debug(`PageEventCollector: ${eventName} event`, event, event.target, 'recorded:', elementEvent);
        eventCallback(elementEvent);
    }
    collectEvents() {
        //////// MOUSE EVENTS ////////
        this.listen('mousedown', (event) => {
            // only the main button (not right clicks/etc)
            // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
            if (event.button !== 0)
                return;
            this.sendEvent('mousedown', event);
        });
        this.listen('click', (event) => {
            // only the main button (not right clicks/etc)
            // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
            if (event.button !== 0)
                return;
            this.sendEvent('click', event);
        });
        //////// INPUT EVENTS ////////
        this.listen('input', (event) => {
            const target = event.target;
            this.sendEvent('input', event, element_1.getInputElementValue(target));
        });
        this.listen('change', (event) => {
            const target = event.target;
            this.sendEvent('change', event, element_1.getInputElementValue(target));
        });
        //////// KEYBOARD EVENTS ////////
        this.listen('keydown', (event) => {
            this.sendEvent('keydown', event, event.key);
        });
        this.listen('keyup', (event) => {
            this.sendEvent('keyup', event, event.key);
        });
        //////// OTHER EVENTS ////////
        this.listen('paste', (event) => {
            if (!event.clipboardData)
                return;
            const value = event.clipboardData.getData('text');
            this.sendEvent('paste', event, value);
        });
        this.collectScrollEvent();
    }
    collectScrollEvent() {
        let lastWheelEvent = null;
        this.listen('wheel', (ev) => (lastWheelEvent = ev));
        // We record the scroll event and not the wheel event
        // because it fires after the element.scrollLeft & element.scrollTop are updated
        this.listen('scroll', (event) => {
            if (!lastWheelEvent || event.timeStamp - lastWheelEvent.timeStamp > 100) {
                // We record mouse wheel initiated scrolls only
                // to avoid recording system initiated scrolls (after selecting an item/etc).
                // This will not capture scrolls triggered by the keyboard (PgUp/PgDown/Space)
                // however we already record key events so that encompasses those.
                return;
            }
            let target = event.target;
            if (event.target === document || event.target === document.body) {
                target = (document.scrollingElement ||
                    document.documentElement);
            }
            const value = {
                x: target.scrollLeft,
                y: target.scrollTop,
            };
            this.sendEvent('scroll', { ...event, target }, value);
        });
    }
}
exports.PageEventCollector = PageEventCollector;
//# sourceMappingURL=PageEventCollector.js.map
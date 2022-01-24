declare type OnElementAddedToGroupFn = (element: HTMLElement, depth: number) => void;
export declare const isVisible: (element: Element, computedStyle?: CSSStyleDeclaration) => boolean;
export declare const isLikelyTopOfClickGroup: (element: HTMLElement) => boolean;
/**
 * @summary Sometimes there is a group of elements that together make up what appears
 *   to be a single button, link, image, etc. Examples: a > span | button > div > span
 *   For these we want to take into consideration the entire "clickable group" when
 *   building a good selector. The topmost clickable (a | button | input) should be
 *   preferred in many cases, but if an inner element has a lower-penalty attribute
 *   then that should be preferred.
 *
 * @return An array of HTMLElement that make up the clickable group. If `element`
 *   itself is not clickable, the array is empty.
 */
export declare const getClickableGroup: (element: HTMLElement, onElementAddedToGroup?: OnElementAddedToGroupFn) => HTMLElement[];
/**
 * @summary Returns the topmost isContentEditable ancestor. Editable areas can
 *   have HTML elements in them, and these elements emit events, but in general
 *   I don't think we want to keep track of anything within the editable area.
 *   For example, if you click a particular paragraph in a `contenteditable`
 *   div, we should just record it as a click/focus of the editable div.
 */
export declare const getTopmostEditableElement: (element: HTMLElement) => HTMLElement;
/**
 * @summary Returns the current "value" of an element. Pass in an event `target`.
 *   For example, returns the `.value` or the `.innerText` of a content-editable.
 *   If no value can be determined, returns `null`.
 */
export declare const getInputElementValue: (element: HTMLInputElement) => string | null;
export {};

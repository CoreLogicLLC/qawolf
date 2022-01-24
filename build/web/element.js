"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputElementValue = exports.getTopmostEditableElement = exports.getClickableGroup = exports.isLikelyTopOfClickGroup = exports.isVisible = void 0;
const serialize_1 = require("./serialize");
const BUTTON_INPUT_TYPES = ['button', 'image', 'reset', 'submit'];
const CLICK_GROUP_ELEMENTS = ['a', 'button', 'label'];
const MAX_CLICKABLE_ELEMENT_TRAVERSE_DEPTH = 10;
exports.isVisible = (element, computedStyle) => {
    const htmlElement = element;
    if (htmlElement.offsetWidth <= 0 || htmlElement.offsetHeight <= 0) {
        return false;
    }
    if (computedStyle && computedStyle.visibility === 'hidden') {
        return false;
    }
    if (computedStyle && computedStyle.display === 'none') {
        return false;
    }
    return true;
};
exports.isLikelyTopOfClickGroup = (element) => {
    const tagName = element.tagName.toLowerCase();
    return (CLICK_GROUP_ELEMENTS.includes(tagName) ||
        element.getAttribute('role') === 'button' ||
        (tagName === 'input' && BUTTON_INPUT_TYPES.includes(element.getAttribute('type'))));
};
/**
 * @summary Traverse the DOM in both directions, adding clickable elements to the array
 *   until we've determined the full set of elements that are in the clickable area.
 *   This is not foolproof because we can't know where exactly click handlers might
 *   be attached, but we can do a pretty good job of guessing.
 */
const traverseClickableElements = (input) => {
    const { ancestorChain = [], depth = 0, direction = 'up', element, group, maxDepth = MAX_CLICKABLE_ELEMENT_TRAVERSE_DEPTH, onElementAddedToGroup, } = input;
    // Regardless of which direction we're moving, stop if we hit an invisible element
    if (!exports.isVisible(element, window.getComputedStyle(element)))
        return;
    // When moving up, when we reach the topmost clickable element, we
    // stop traversing up and begin traversing down from there.
    if (direction === 'up' && exports.isLikelyTopOfClickGroup(element)) {
        traverseClickableElements({
            direction: 'down',
            element,
            group,
            maxDepth,
            onElementAddedToGroup,
        });
        return;
    }
    // When moving down, stop if we hit the top of another click group (nested buttons)
    if (direction === 'down' && depth > 0 && exports.isLikelyTopOfClickGroup(element))
        return;
    const newDepth = depth + 1;
    const lowerTagName = element.tagName.toLowerCase();
    if (direction === 'up') {
        // Call self for the parent element, incrementing depth
        if (element.parentElement) {
            traverseClickableElements({
                ancestorChain: [lowerTagName, ...ancestorChain],
                direction,
                element: element.parentElement,
                group,
                maxDepth,
                depth: newDepth,
                onElementAddedToGroup,
            });
        }
    }
    else {
        // Respect max depth only when going down
        if (newDepth > maxDepth)
            return;
        // If we make it this far, this element should be part of the current group.
        // We add elements to the group only on the way down to avoid adding any twice.
        group.push(element);
        // Let caller do additional things with each element as we add it
        if (onElementAddedToGroup)
            onElementAddedToGroup(element, depth);
        const newAncestorChain = [...ancestorChain, lowerTagName];
        console.debug('qawolf: added %s to click group', newAncestorChain.join(' > '));
        // For now, let's skip going down into SVG descendants to keep this fast. If anyone
        // finds a situation in which this causes problems, we can remove this.
        if (lowerTagName !== 'svg') {
            for (const child of element.children) {
                // Call self for each child element, incrementing depth
                traverseClickableElements({
                    ancestorChain: newAncestorChain,
                    direction,
                    element: child,
                    group,
                    maxDepth,
                    depth: newDepth,
                    onElementAddedToGroup,
                });
            }
        }
    }
};
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
exports.getClickableGroup = (element, onElementAddedToGroup) => {
    console.debug('qawolf: get clickable ancestor for', serialize_1.getXpath(element));
    const group = [];
    // Recursive function that will mutate clickableElements array. A recursive
    // function is better than loops to avoid blocking UI paint.
    traverseClickableElements({ element, group, onElementAddedToGroup });
    return group;
};
/**
 * @summary Returns the topmost isContentEditable ancestor. Editable areas can
 *   have HTML elements in them, and these elements emit events, but in general
 *   I don't think we want to keep track of anything within the editable area.
 *   For example, if you click a particular paragraph in a `contenteditable`
 *   div, we should just record it as a click/focus of the editable div.
 */
exports.getTopmostEditableElement = (element) => {
    if (!element.isContentEditable)
        return element;
    console.debug('qawolf: get editable ancestor for', serialize_1.getXpath(element));
    let ancestor = element;
    do {
        if (!ancestor.parentElement || !ancestor.parentElement.isContentEditable) {
            console.debug(`qawolf: found editable ancestor: ${ancestor.tagName}`, serialize_1.getXpath(ancestor));
            return ancestor;
        }
        ancestor = ancestor.parentElement;
    } while (ancestor);
    // This should never be hit, but here as a safety
    return element;
};
/**
 * @summary Returns the current "value" of an element. Pass in an event `target`.
 *   For example, returns the `.value` or the `.innerText` of a content-editable.
 *   If no value can be determined, returns `null`.
 */
exports.getInputElementValue = (element) => {
    // In the wild, we've seen examples of input elements with `contenteditable=true`,
    // but an `input` never has inner text, so we check for `input` tag name here.
    if (element.isContentEditable && element.tagName.toLowerCase() !== 'input') {
        return element.innerText;
    }
    return element.value || null;
};
//# sourceMappingURL=element.js.map
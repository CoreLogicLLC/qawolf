window["qawolf"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeToDoc = exports.getXpath = void 0;
const buildXpath = (node) => {
    // only build xpaths for elements
    if (!node || node.nodeType !== 1)
        return '';
    const element = node;
    if (element.id) {
        // xpath has no way to escape quotes so use the opposite
        // https://stackoverflow.com/a/14822893
        const quote = element.id.includes(`'`) ? `"` : `'`;
        return `//*[@id=${quote}${element.id}${quote}]`;
    }
    const children = element.parentNode ? element.parentNode.children : [];
    const sames = [].filter.call(children, (x) => {
        return x.tagName === element.tagName;
    });
    const result = buildXpath(element.parentNode) +
        '/' +
        element.tagName.toLowerCase() +
        (sames.length > 1
            ? '[' + ([].indexOf.call(sames, element) + 1) + ']'
            : '');
    return result;
};
exports.getXpath = (node) => {
    const result = buildXpath(node);
    return result
        .replace('svg', "*[name()='svg']")
        .replace('path', "*[name()='path']");
};
exports.nodeToDoc = (node) => {
    const name = (node.tagName || '').toLowerCase();
    const attrs = {};
    const attributes = node.attributes || [];
    for (let i = attributes.length - 1; i >= 0; i--) {
        attrs[attributes[i].name] = attributes[i].value;
    }
    return {
        attrs,
        name,
    };
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementMatchingSelectorParts = exports.isMatch = exports.getElementText = exports.buildSelectorParts = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
let evaluator;
try {
    evaluator = __webpack_require__(8);
}
catch (e) {
    // this will only error on server side tests that
    // do not require the evaluator but depend on this file
}
const { createTextSelector, querySelector } = evaluator || {};
exports.buildSelectorParts = (cues) => {
    const levels = [...new Set(cues.map((cue) => cue.level))];
    // sort descending
    levels.sort((a, b) => b - a);
    const parts = [];
    levels.forEach((level) => {
        const cuesForLevel = cues.filter((cue) => cue.level === level);
        const textCues = cuesForLevel.filter((cue) => cue.type === 'text');
        if (textCues.length) {
            parts.push({ name: 'text', body: textCues[0].value });
            return;
        }
        cuesForLevel.sort((a, b) => {
            if (a.type === 'tag')
                return -1;
            if (b.type === 'tag')
                return 1;
            return 0;
        });
        const bodyValues = cuesForLevel.map((cue) => cue.value);
        parts.push({ name: 'css', body: bodyValues.join('') });
    });
    return parts;
};
exports.getElementText = (element) => {
    return createTextSelector(element);
};
exports.isMatch = ({ selectorParts, target }) => {
    // We must pass `target.ownerDocument` rather than `document`
    // because sometimes this is called from other frames.
    const result = querySelector({ parts: selectorParts }, target.ownerDocument);
    return result === target;
};
exports.getElementMatchingSelectorParts = (selectorParts, root) => {
    return querySelector({ parts: selectorParts }, root);
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAttribute = exports.getAttribute = exports.getRegexAttribute = exports.deserializeRegex = exports.DEFAULT_ATTRIBUTE_LIST = void 0;
exports.DEFAULT_ATTRIBUTE_LIST = 'data-cy,data-e2e,data-qa,/^data-test.*/,/^qa-.*/';
exports.deserializeRegex = (regexString) => {
    try {
        const parts = regexString.match(/\/(.*)\/(.*)?/);
        return new RegExp(parts[1], parts[2] || '');
    }
    catch (e) {
        console.error(`qawolf: invalid regex attribute ${regexString}, skipping this attribute`);
        return null;
    }
};
exports.getRegexAttribute = ({ element, regexString, }) => {
    const regex = exports.deserializeRegex(regexString);
    if (!regex)
        return null;
    const attributes = element.attributes;
    for (let i = 0; i < attributes.length; i++) {
        const { name, value } = attributes[i];
        if (name.match(regex)) {
            return { name, value };
        }
    }
    return null;
};
exports.getAttribute = ({ attribute, element, }) => {
    const isRegex = attribute[0] === '/';
    if (isRegex) {
        return exports.getRegexAttribute({
            element,
            regexString: attribute,
        });
    }
    const value = element.getAttribute(attribute);
    if (!value)
        return null;
    return { name: attribute, value };
};
exports.hasAttribute = (element, attributes) => {
    return !!attributes.find((attribute) => exports.getAttribute({ attribute, element }));
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueLength = exports.getPenalty = exports.findNearestPreferredAttributeCue = exports.buildCues = exports.buildCuesForElement = exports.buildCueValueForTag = exports.getCueTypesConfig = void 0;
const attribute_1 = __webpack_require__(2);
const selectorEngine_1 = __webpack_require__(1);
const isDynamic_1 = __webpack_require__(9);
const DYNAMIC_VALUE_OK_ATTRIBUTES = ['placeholder', 'href', 'src', 'value'];
/**
 * For each cue type, this defines which elements it applies to and a penalty
 * value. Higher penalty means it is less likely that this will be helpful in
 * constructing a unique, short, and attractive selector. We can and should
 * work to fine tune the penalty values over time.
 *
 * Users may add attributes to this list using the `attribute` config option.
 */
const ConfigByCueType = {
    alt: {
        elements: ['area', 'img', 'input[type=image]'],
        penalty: 20,
    },
    'aria-label': {
        elements: ['*'],
        penalty: 8,
    },
    class: {
        elements: ['*'],
        penalty: 10,
    },
    contenteditable: {
        elements: ['*'],
        // High penalty because it is unlikely to be unique given that the value is always the same
        penalty: 30,
    },
    for: {
        elements: ['label', 'output'],
        penalty: 5,
    },
    href: {
        elements: ['a'],
        penalty: 15,
    },
    id: {
        elements: ['*'],
        penalty: 5,
    },
    name: {
        elements: [
            'button',
            'form',
            'fieldset',
            'iframe',
            'input',
            'object',
            'output',
            'select',
            'textarea',
            'map',
        ],
        penalty: 10,
    },
    placeholder: {
        elements: ['input', 'textarea'],
        penalty: 12,
    },
    src: {
        elements: ['audio', 'iframe', 'img', 'input[type=image]', 'video'],
        penalty: 15,
    },
    tag: {
        elements: ['*'],
        penalty: 40,
    },
    text: {
        elements: ['*'],
        penalty: 12,
    },
    title: {
        elements: ['area', 'img', 'input[type=image]'],
        penalty: 20,
    },
    value: {
        elements: [
            'option',
            'button',
            'input[type=submit]',
            'input[type=button]',
            'input[type=checkbox]',
            'input[type=radio]',
        ],
        penalty: 10,
    },
};
/**
 * @summary Get final cue types config
 * @return Cue type config with preferred attributes added. For now,
 *   all attributes are given 0 penalty, but eventually the user
 *   config could support custom penalties for each.
 */
exports.getCueTypesConfig = (attributes) => {
    const preferredAttributes = {};
    attributes.forEach((attribute) => {
        preferredAttributes[attribute] = {
            elements: ['*'],
            isPreferred: true,
            penalty: 0,
        };
    }, {});
    return {
        ...ConfigByCueType,
        ...preferredAttributes,
    };
};
exports.buildCueValueForTag = (element) => {
    const tagName = element.tagName.toLowerCase();
    if (!element.parentElement)
        return tagName;
    const siblings = element.parentElement.children;
    const sameTagSiblings = [];
    for (const sibling of siblings) {
        if (sibling.tagName.toLowerCase() === tagName) {
            sameTagSiblings.push(sibling);
        }
    }
    if (sameTagSiblings.length < 2) {
        return tagName;
    }
    const nthIndex = sameTagSiblings.indexOf(element) + 1;
    if (nthIndex === 1)
        return tagName;
    return `${tagName}:nth-of-type(${nthIndex})`;
};
exports.buildCuesForElement = ({ cueTypesConfig, element, isClick, level, }) => {
    // For body and html, we never have more than one, so
    // just 'tag' cue is needed and we can save some time.
    const tagName = element.tagName.toLowerCase();
    if (['html', 'body'].includes(tagName)) {
        return [
            {
                level,
                penalty: ConfigByCueType.tag.penalty,
                type: 'tag',
                value: tagName,
            },
        ];
    }
    const cues = Object.keys(cueTypesConfig).reduce((list, cueType) => {
        const { elements, isPreferred, penalty } = cueTypesConfig[cueType];
        // First find out whether this cue type is relevant for this element
        if (!elements.some((selector) => element.matches(selector))) {
            return list;
        }
        switch (cueType) {
            // Special handling for "class" attribute
            case 'class': {
                element.classList.forEach((c) => {
                    if (isDynamic_1.isDynamic(c))
                        return;
                    list.push({
                        level,
                        penalty,
                        type: 'class',
                        value: `.${CSS.escape(c)}`,
                    });
                });
                break;
            }
            // Special handling for "id" attribute
            case 'id': {
                const elementId = element.id;
                if (elementId && !isDynamic_1.isDynamic(elementId)) {
                    list.push({
                        level,
                        penalty,
                        type: 'id',
                        value: `#${CSS.escape(elementId)}`,
                    });
                }
                break;
            }
            // Special handling for "tag" type
            case 'tag':
                list.push({
                    level,
                    penalty,
                    type: 'tag',
                    value: exports.buildCueValueForTag(element),
                });
                break;
            // Special handling for "text" type
            case 'text': {
                if (!isClick)
                    return list;
                const value = selectorEngine_1.getElementText(element);
                if (value) {
                    list.push({ level, penalty, type: 'text', value });
                }
                break;
            }
            // Everything else is just an attribute
            default: {
                const attributeValuePair = attribute_1.getAttribute({
                    attribute: cueType,
                    element,
                });
                if (attributeValuePair) {
                    const { name, value } = attributeValuePair;
                    if (value.length && (isPreferred || DYNAMIC_VALUE_OK_ATTRIBUTES.includes(name))) {
                        list.push({
                            level,
                            penalty,
                            type: 'attribute',
                            value: `[${name}="${value}"]`,
                        });
                    }
                    else {
                        isDynamic_1.getValueMatches(value).forEach(({ match, operator }) => {
                            list.push({
                                level,
                                penalty,
                                type: 'attribute',
                                value: `[${name}${operator}"${match}"]`,
                            });
                        });
                    }
                }
                break;
            }
        }
        return list;
    }, []);
    return cues;
};
exports.buildCues = ({ cueTypesConfig, isClick, target, }) => {
    const cues = [];
    let element = target;
    let level = 0;
    while (element) {
        cues.push(...exports.buildCuesForElement({ cueTypesConfig, element, isClick, level }));
        element = element.parentElement;
        level += 1;
    }
    return cues;
};
exports.findNearestPreferredAttributeCue = (cues) => {
    return cues.reduce((foundCue, cue) => {
        if (cue.penalty === 0 && (!foundCue || foundCue.level > cue.level)) {
            return cue;
        }
        return foundCue;
    }, null);
};
exports.getPenalty = (cues) => {
    return cues.reduce((a, b) => a + b.penalty, 0);
};
exports.getValueLength = (cues) => {
    return cues.reduce((total, cue) => total + cue.value.length, 0);
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputElementValue = exports.getTopmostEditableElement = exports.getClickableGroup = exports.isLikelyTopOfClickGroup = exports.isVisible = void 0;
const serialize_1 = __webpack_require__(0);
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSelector = exports.toSelector = exports.clearSelectorCache = void 0;
const cues_1 = __webpack_require__(3);
const element_1 = __webpack_require__(4);
const optimizeCues_1 = __webpack_require__(15);
const serialize_1 = __webpack_require__(0);
const selectorEngine_1 = __webpack_require__(1);
const selectorCache = new Map();
const clickSelectorCache = new Map();
/**
 * @summary Clear the selector cache. Currently only used for tests.
 */
exports.clearSelectorCache = () => {
    selectorCache.clear();
    clickSelectorCache.clear();
};
exports.toSelector = (selectorParts) => {
    const names = selectorParts.map((s) => s.name);
    // CSS selector
    if (!names.includes('text')) {
        return selectorParts.map((s) => s.body).join(' ');
    }
    // mixed selector
    return selectorParts.map(({ body, name }) => `${name}=${body}`).join(' >> ');
};
exports.buildSelector = (options) => {
    const { attributes, isClick, target } = options;
    // To save looping, see if we have already figured out a unique
    // selector for this target.
    let cachedSelectorInfo;
    if (isClick) {
        cachedSelectorInfo = clickSelectorCache.get(target);
    }
    else {
        cachedSelectorInfo = selectorCache.get(target);
    }
    let selector;
    if (cachedSelectorInfo) {
        const { matchedTarget, selector, selectorParts } = cachedSelectorInfo;
        // Even if we have cached a selector, it is possible that the DOM
        // has changed since the cached one was built. Confirm it's a match.
        if (selectorEngine_1.isMatch({ selectorParts, target: matchedTarget })) {
            // console.debug('Using cached selector', selector, 'for target', target);
            return selector;
        }
    }
    const cuesByTarget = new Map();
    const cueTypesConfig = cues_1.getCueTypesConfig(attributes);
    let targetGroup = [];
    if (isClick) {
        // For a click, we consider the entire potential block of elements that we can
        // reasonably assume would call the same click handler when clicked.
        targetGroup = element_1.getClickableGroup(target, (element, depth) => {
            let elementCues;
            // For the level, we temporarily use negatives, which we'll fix later
            const level = 0 - depth;
            if (depth === 0) {
                // For the topmost element in the group, we build cues
                // for every ancestor element to the document root.
                elementCues = cues_1.buildCues({ cueTypesConfig, isClick, target: element });
            }
            else {
                // For lower elements, start with the parent cues and then
                // add cues for this element to the beginning of the list
                const { cues: parentCues } = cuesByTarget.get(element.parentElement) || {};
                elementCues = [...cues_1.buildCuesForElement({ cueTypesConfig, element, isClick, level }), ...parentCues];
            }
            cuesByTarget.set(element, { cues: elementCues, level });
        });
    }
    // getClickableGroup may have returned an empty array or it may not have been a click.
    // In either case, fall back to building a selector using only cues from the event target.
    if (targetGroup.length === 0) {
        targetGroup = [target];
        const targetCues = cues_1.buildCues({ cueTypesConfig, isClick, target });
        cuesByTarget.set(target, { cues: targetCues, level: 0 });
    }
    const cueGroups = [];
    targetGroup.forEach((targetElement) => {
        const { cues, level } = cuesByTarget.get(targetElement);
        // First, if we have negative levels due to there being a target group,
        // fix them all to be zero-based.
        let rebasedCues;
        if (level < 0) {
            rebasedCues = cues.map((cue) => ({
                ...cue,
                level: cue.level + (0 - level),
            }));
        }
        else {
            rebasedCues = cues;
        }
        // Examine the cues in the context of this potential target element, trying to
        // find any acceptable cue groups.
        optimizeCues_1.findOptimalCueGroups({
            cues: rebasedCues,
            // This is called once for each acceptable cue group, which we then add to our
            // list of potential "best groups"
            onFound(cueGroup) {
                cueGroups.push(cueGroup);
            },
            target: targetElement,
            targetGroup,
        });
    });
    // Now pick the one best of the best possible cue groups and build a selector from it
    const { selectorParts } = optimizeCues_1.pickBestCueGroup(cueGroups) || {};
    if (selectorParts) {
        // Convert selectorParts (a Playwright thing) to a string selector
        selector = exports.toSelector(selectorParts);
        // This selector should match one of the elements in `targetGroup`, but it
        // may not be the original target. If so, determine what the matched target is.
        let matchedTarget;
        if (targetGroup.length === 1 && targetGroup[0] === target) {
            matchedTarget = target;
        }
        else {
            // We must pass `target.ownerDocument` rather than `document`
            // because sometimes this is called from other frames.
            matchedTarget = selectorEngine_1.getElementMatchingSelectorParts(selectorParts, target.ownerDocument);
        }
        // Cache it so that we don't need to do all the looping for this
        // same target next time. We cache `selectorParts` along with `selector`
        // because the DOM can change, so when we later use the cached selector,
        // we will need to run it through `isMatch` again, which needs the parsed
        // selector.
        const selectorInfo = {
            matchedTarget,
            selector,
            selectorParts,
        };
        if (isClick) {
            clickSelectorCache.set(target, selectorInfo);
        }
        else {
            selectorCache.set(target, selectorInfo);
        }
    }
    else {
        // No selector was found, fall back to xpath.
        selector = `xpath=${serialize_1.getXpath(target)}`;
    }
    // console.debug('Built selector', selector, 'for target', target);
    return selector;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(7), exports);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeToDoc = exports.getXpath = exports.isMatch = exports.getElementText = exports.toSelector = exports.clearSelectorCache = exports.buildSelector = exports.PageEventCollector = exports.interceptConsoleLogs = exports.formatArgument = exports.isVisible = exports.getTopmostEditableElement = exports.getInputElementValue = exports.getClickableGroup = exports.getCueTypesConfig = exports.buildCueValueForTag = exports.buildCuesForElement = exports.buildCues = exports.getRegexAttribute = exports.getAttribute = void 0;
var attribute_1 = __webpack_require__(2);
Object.defineProperty(exports, "getAttribute", { enumerable: true, get: function () { return attribute_1.getAttribute; } });
Object.defineProperty(exports, "getRegexAttribute", { enumerable: true, get: function () { return attribute_1.getRegexAttribute; } });
var cues_1 = __webpack_require__(3);
Object.defineProperty(exports, "buildCues", { enumerable: true, get: function () { return cues_1.buildCues; } });
Object.defineProperty(exports, "buildCuesForElement", { enumerable: true, get: function () { return cues_1.buildCuesForElement; } });
Object.defineProperty(exports, "buildCueValueForTag", { enumerable: true, get: function () { return cues_1.buildCueValueForTag; } });
Object.defineProperty(exports, "getCueTypesConfig", { enumerable: true, get: function () { return cues_1.getCueTypesConfig; } });
var element_1 = __webpack_require__(4);
Object.defineProperty(exports, "getClickableGroup", { enumerable: true, get: function () { return element_1.getClickableGroup; } });
Object.defineProperty(exports, "getInputElementValue", { enumerable: true, get: function () { return element_1.getInputElementValue; } });
Object.defineProperty(exports, "getTopmostEditableElement", { enumerable: true, get: function () { return element_1.getTopmostEditableElement; } });
Object.defineProperty(exports, "isVisible", { enumerable: true, get: function () { return element_1.isVisible; } });
var interceptConsoleLogs_1 = __webpack_require__(13);
Object.defineProperty(exports, "formatArgument", { enumerable: true, get: function () { return interceptConsoleLogs_1.formatArgument; } });
Object.defineProperty(exports, "interceptConsoleLogs", { enumerable: true, get: function () { return interceptConsoleLogs_1.interceptConsoleLogs; } });
var PageEventCollector_1 = __webpack_require__(14);
Object.defineProperty(exports, "PageEventCollector", { enumerable: true, get: function () { return PageEventCollector_1.PageEventCollector; } });
var selector_1 = __webpack_require__(5);
Object.defineProperty(exports, "buildSelector", { enumerable: true, get: function () { return selector_1.buildSelector; } });
Object.defineProperty(exports, "clearSelectorCache", { enumerable: true, get: function () { return selector_1.clearSelectorCache; } });
Object.defineProperty(exports, "toSelector", { enumerable: true, get: function () { return selector_1.toSelector; } });
var selectorEngine_1 = __webpack_require__(1);
Object.defineProperty(exports, "getElementText", { enumerable: true, get: function () { return selectorEngine_1.getElementText; } });
Object.defineProperty(exports, "isMatch", { enumerable: true, get: function () { return selectorEngine_1.isMatch; } });
var serialize_1 = __webpack_require__(0);
Object.defineProperty(exports, "getXpath", { enumerable: true, get: function () { return serialize_1.getXpath; } });
Object.defineProperty(exports, "nodeToDoc", { enumerable: true, get: function () { return serialize_1.nodeToDoc; } });


/***/ }),
/* 8 */
/***/ (function(module, exports) {


  const evaluator = new ((/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/injected/injectedScript.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/server/common/selectorParser.ts":
/*!*********************************************!*\
  !*** ./src/server/common/selectorParser.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSelector = void 0;
function parseSelector(selector) {
    let index = 0;
    let quote;
    let start = 0;
    const result = { parts: [] };
    const append = () => {
        const part = selector.substring(start, index).trim();
        const eqIndex = part.indexOf('=');
        let name;
        let body;
        if (eqIndex !== -1 && part.substring(0, eqIndex).trim().match(/^[a-zA-Z_0-9-+:*]+$/)) {
            name = part.substring(0, eqIndex).trim();
            body = part.substring(eqIndex + 1);
        }
        else if (part.length > 1 && part[0] === '"' && part[part.length - 1] === '"') {
            name = 'text';
            body = part;
        }
        else if (part.length > 1 && part[0] === "'" && part[part.length - 1] === "'") {
            name = 'text';
            body = part;
        }
        else if (/^\(*\/\//.test(part) || part.startsWith('..')) {
            // If selector starts with '//' or '//' prefixed with multiple opening
            // parenthesis, consider xpath. @see https://github.com/microsoft/playwright/issues/817
            // If selector starts with '..', consider xpath as well.
            name = 'xpath';
            body = part;
        }
        else {
            name = 'css';
            body = part;
        }
        let capture = false;
        if (name[0] === '*') {
            capture = true;
            name = name.substring(1);
        }
        result.parts.push({ name, body });
        if (capture) {
            if (result.capture !== undefined)
                throw new Error(`Only one of the selectors can capture using * modifier`);
            result.capture = result.parts.length - 1;
        }
    };
    while (index < selector.length) {
        const c = selector[index];
        if (c === '\\' && index + 1 < selector.length) {
            index += 2;
        }
        else if (c === quote) {
            quote = undefined;
            index++;
        }
        else if (!quote && (c === '"' || c === '\'' || c === '`')) {
            quote = c;
            index++;
        }
        else if (!quote && c === '>' && selector[index + 1] === '>') {
            append();
            index += 2;
            start = index;
        }
        else {
            index++;
        }
    }
    append();
    return result;
}
exports.parseSelector = parseSelector;


/***/ }),

/***/ "./src/server/injected/attributeSelectorEngine.ts":
/*!********************************************************!*\
  !*** ./src/server/injected/attributeSelectorEngine.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttributeEngine = void 0;
function createAttributeEngine(attribute, shadow) {
    const engine = {
        create(root, target) {
            const value = target.getAttribute(attribute);
            if (!value)
                return;
            if (engine.query(root, value) === target)
                return value;
        },
        query(root, selector) {
            if (!shadow)
                return root.querySelector(`[${attribute}=${JSON.stringify(selector)}]`) || undefined;
            return queryShadowInternal(root, attribute, selector);
        },
        queryAll(root, selector) {
            if (!shadow)
                return Array.from(root.querySelectorAll(`[${attribute}=${JSON.stringify(selector)}]`));
            const result = [];
            queryShadowAllInternal(root, attribute, selector, result);
            return result;
        }
    };
    return engine;
}
exports.createAttributeEngine = createAttributeEngine;
function queryShadowInternal(root, attribute, value) {
    const single = root.querySelector(`[${attribute}=${JSON.stringify(value)}]`);
    if (single)
        return single;
    const all = root.querySelectorAll('*');
    for (let i = 0; i < all.length; i++) {
        const shadowRoot = all[i].shadowRoot;
        if (shadowRoot) {
            const single = queryShadowInternal(shadowRoot, attribute, value);
            if (single)
                return single;
        }
    }
}
function queryShadowAllInternal(root, attribute, value, result) {
    const document = root instanceof Document ? root : root.ownerDocument;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    const shadowRoots = [];
    while (walker.nextNode()) {
        const element = walker.currentNode;
        if (element.getAttribute(attribute) === value)
            result.push(element);
        if (element.shadowRoot)
            shadowRoots.push(element.shadowRoot);
    }
    for (const shadowRoot of shadowRoots)
        queryShadowAllInternal(shadowRoot, attribute, value, result);
}


/***/ }),

/***/ "./src/server/injected/cssSelectorEngine.ts":
/*!**************************************************!*\
  !*** ./src/server/injected/cssSelectorEngine.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCSSEngine = void 0;
function createCSSEngine(shadow) {
    const engine = {
        create(root, targetElement) {
            if (shadow)
                return;
            const tokens = [];
            function uniqueCSSSelector(prefix) {
                const path = tokens.slice();
                if (prefix)
                    path.unshift(prefix);
                const selector = path.join(' > ');
                const nodes = Array.from(root.querySelectorAll(selector));
                return nodes[0] === targetElement ? selector : undefined;
            }
            for (let element = targetElement; element && element !== root; element = element.parentElement) {
                const nodeName = element.nodeName.toLowerCase();
                // Element ID is the strongest signal, use it.
                let bestTokenForLevel = '';
                if (element.id) {
                    const token = /^[a-zA-Z][a-zA-Z0-9\-\_]+$/.test(element.id) ? '#' + element.id : `[id="${element.id}"]`;
                    const selector = uniqueCSSSelector(token);
                    if (selector)
                        return selector;
                    bestTokenForLevel = token;
                }
                const parent = element.parentElement;
                // Combine class names until unique.
                const classes = Array.from(element.classList);
                for (let i = 0; i < classes.length; ++i) {
                    const token = '.' + classes.slice(0, i + 1).join('.');
                    const selector = uniqueCSSSelector(token);
                    if (selector)
                        return selector;
                    // Even if not unique, does this subset of classes uniquely identify node as a child?
                    if (!bestTokenForLevel && parent) {
                        const sameClassSiblings = parent.querySelectorAll(token);
                        if (sameClassSiblings.length === 1)
                            bestTokenForLevel = token;
                    }
                }
                // Ordinal is the weakest signal.
                if (parent) {
                    const siblings = Array.from(parent.children);
                    const sameTagSiblings = siblings.filter(sibling => (sibling).nodeName.toLowerCase() === nodeName);
                    const token = sameTagSiblings.length === 1 ? nodeName : `${nodeName}:nth-child(${1 + siblings.indexOf(element)})`;
                    const selector = uniqueCSSSelector(token);
                    if (selector)
                        return selector;
                    if (!bestTokenForLevel)
                        bestTokenForLevel = token;
                }
                else if (!bestTokenForLevel) {
                    bestTokenForLevel = nodeName;
                }
                tokens.unshift(bestTokenForLevel);
            }
            return uniqueCSSSelector();
        },
        query(root, selector) {
            // TODO: uncomment for performance.
            // const simple = root.querySelector(selector);
            // if (simple)
            //   return simple;
            // if (!shadow)
            //   return;
            const selectors = split(selector);
            // Note: we do not just merge results produced by each selector, as that
            // will not return them in the tree traversal order, but rather in the selectors
            // matching order.
            if (!selectors.length)
                return;
            return queryShadowInternal(root, root, selectors, shadow);
        },
        queryAll(root, selector) {
            // TODO: uncomment for performance.
            // if (!shadow)
            //   return Array.from(root.querySelectorAll(selector));
            const result = [];
            const selectors = split(selector);
            // Note: we do not just merge results produced by each selector, as that
            // will not return them in the tree traversal order, but rather in the selectors
            // matching order.
            if (selectors.length)
                queryShadowAllInternal(root, root, selectors, shadow, result);
            return result;
        }
    };
    engine._test = () => test(engine);
    return engine;
}
exports.createCSSEngine = createCSSEngine;
function queryShadowInternal(boundary, root, selectors, shadow) {
    let elements;
    if (selectors.length === 1) {
        // Fast path for a single selector - query only matching elements, not all.
        const parts = selectors[0];
        const matching = root.querySelectorAll(parts[0]);
        for (const element of matching) {
            // If there is a single part, there are no ancestors to match.
            if (parts.length === 1 || ancestorsMatch(element, parts, boundary))
                return element;
        }
    }
    else {
        // Multiple selectors: visit each element in tree-traversal order and check whether it matches.
        elements = root.querySelectorAll('*');
        for (const element of elements) {
            for (const parts of selectors) {
                if (!element.matches(parts[0]))
                    continue;
                // If there is a single part, there are no ancestors to match.
                if (parts.length === 1 || ancestorsMatch(element, parts, boundary))
                    return element;
            }
        }
    }
    // Visit shadow dom after the light dom to preserve the tree-traversal order.
    if (!shadow)
        return;
    if (root.shadowRoot) {
        const child = queryShadowInternal(boundary, root.shadowRoot, selectors, shadow);
        if (child)
            return child;
    }
    if (!elements)
        elements = root.querySelectorAll('*');
    for (const element of elements) {
        if (element.shadowRoot) {
            const child = queryShadowInternal(boundary, element.shadowRoot, selectors, shadow);
            if (child)
                return child;
        }
    }
}
function queryShadowAllInternal(boundary, root, selectors, shadow, result) {
    let elements;
    if (selectors.length === 1) {
        // Fast path for a single selector - query only matching elements, not all.
        const parts = selectors[0];
        const matching = root.querySelectorAll(parts[0]);
        for (const element of matching) {
            // If there is a single part, there are no ancestors to match.
            if (parts.length === 1 || ancestorsMatch(element, parts, boundary))
                result.push(element);
        }
    }
    else {
        // Multiple selectors: visit each element in tree-traversal order and check whether it matches.
        elements = root.querySelectorAll('*');
        for (const element of elements) {
            for (const parts of selectors) {
                if (!element.matches(parts[0]))
                    continue;
                // If there is a single part, there are no ancestors to match.
                if (parts.length === 1 || ancestorsMatch(element, parts, boundary))
                    result.push(element);
            }
        }
    }
    // Visit shadow dom after the light dom to preserve the tree-traversal order.
    if (!shadow)
        return;
    if (root.shadowRoot)
        queryShadowAllInternal(boundary, root.shadowRoot, selectors, shadow, result);
    if (!elements)
        elements = root.querySelectorAll('*');
    for (const element of elements) {
        if (element.shadowRoot)
            queryShadowAllInternal(boundary, element.shadowRoot, selectors, shadow, result);
    }
}
function ancestorsMatch(element, parts, boundary) {
    let i = 1;
    while (i < parts.length && (element = parentElementOrShadowHost(element)) && element !== boundary) {
        if (element.matches(parts[i]))
            i++;
    }
    return i === parts.length;
}
function parentElementOrShadowHost(element) {
    if (element.parentElement)
        return element.parentElement;
    if (!element.parentNode)
        return;
    if (element.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE && element.parentNode.host)
        return element.parentNode.host;
}
// Splits the string into separate selectors by comma, and then each selector by the descendant combinator (space).
// Parts of each selector are reversed, so that the first one matches the target element.
function split(selector) {
    let index = 0;
    let quote;
    let insideAttr = false;
    let start = 0;
    const result = [];
    let current = [];
    const appendToCurrent = () => {
        const part = selector.substring(start, index).trim();
        if (part.length)
            current.push(part);
    };
    const appendToResult = () => {
        appendToCurrent();
        result.push(current);
        current = [];
    };
    const isCombinator = (char) => {
        return char === '>' || char === '+' || char === '~';
    };
    const peekForward = () => {
        return selector.substring(index).trim()[0];
    };
    const peekBackward = () => {
        const s = selector.substring(0, index).trim();
        return s[s.length - 1];
    };
    while (index < selector.length) {
        const c = selector[index];
        if (!quote && !insideAttr && c === ' ' && !isCombinator(peekForward()) && !isCombinator(peekBackward())) {
            appendToCurrent();
            start = index;
            index++;
        }
        else {
            if (c === '\\' && index + 1 < selector.length) {
                index += 2;
            }
            else if (c === quote) {
                quote = undefined;
                index++;
            }
            else if (!quote && (c === '\'' || c === '"')) {
                quote = c;
                index++;
            }
            else if (!quote && c === '[') {
                insideAttr = true;
                index++;
            }
            else if (!quote && insideAttr && c === ']') {
                insideAttr = false;
                index++;
            }
            else if (!quote && !insideAttr && c === ',') {
                appendToResult();
                index++;
                start = index;
            }
            else {
                index++;
            }
        }
    }
    appendToResult();
    return result.filter(parts => !!parts.length).map(parts => parts.reverse());
}
function test(engine) {
    let id = 0;
    function createShadow(level) {
        const root = document.createElement('div');
        root.id = 'id' + id;
        root.textContent = 'root #id' + id;
        id++;
        const shadow = root.attachShadow({ mode: 'open' });
        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div');
            div.id = 'id' + id;
            div.textContent = '#id' + id;
            id++;
            shadow.appendChild(div);
        }
        if (level) {
            shadow.appendChild(createShadow(level - 1));
            shadow.appendChild(createShadow(level - 1));
        }
        return root;
    }
    const { query, queryAll } = engine;
    document.body.textContent = '';
    document.body.appendChild(createShadow(10));
    console.time('found');
    for (let i = 0; i < id; i += 17) {
        const e = query(document, `div #id${i}`);
        if (!e || e.id !== 'id' + i)
            console.log(`div #id${i}`); // eslint-disable-line no-console
    }
    console.timeEnd('found');
    console.time('not found');
    for (let i = 0; i < id; i += 17) {
        const e = query(document, `div div div div div #d${i}`);
        if (e)
            console.log(`div div div div div #d${i}`); // eslint-disable-line no-console
    }
    console.timeEnd('not found');
    console.log(query(document, '#id543 + #id544')); // eslint-disable-line no-console
    console.log(query(document, '#id542 ~ #id545')); // eslint-disable-line no-console
    console.time('all');
    queryAll(document, 'div div div + div');
    console.timeEnd('all');
}


/***/ }),

/***/ "./src/server/injected/injectedScript.ts":
/*!***********************************************!*\
  !*** ./src/server/injected/injectedScript.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectedScript = void 0;
const attributeSelectorEngine_1 = __webpack_require__(/*! ./attributeSelectorEngine */ "./src/server/injected/attributeSelectorEngine.ts");
const cssSelectorEngine_1 = __webpack_require__(/*! ./cssSelectorEngine */ "./src/server/injected/cssSelectorEngine.ts");
const textSelectorEngine_1 = __webpack_require__(/*! ./textSelectorEngine */ "./src/server/injected/textSelectorEngine.ts");
const xpathSelectorEngine_1 = __webpack_require__(/*! ./xpathSelectorEngine */ "./src/server/injected/xpathSelectorEngine.ts");
const selectorParser_1 = __webpack_require__(/*! ../common/selectorParser */ "./src/server/common/selectorParser.ts");
class InjectedScript {
    constructor(customEngines) {
        this.engines = new Map();
        // Note: keep predefined names in sync with Selectors class.
        this.engines.set('css', cssSelectorEngine_1.createCSSEngine(true));
        this.engines.set('css:light', cssSelectorEngine_1.createCSSEngine(false));
        this.engines.set('xpath', xpathSelectorEngine_1.XPathEngine);
        this.engines.set('xpath:light', xpathSelectorEngine_1.XPathEngine);
        this.engines.set('text', textSelectorEngine_1.createTextSelector(true));
        this.engines.set('text:light', textSelectorEngine_1.createTextSelector(false));
        this.engines.set('id', attributeSelectorEngine_1.createAttributeEngine('id', true));
        this.engines.set('id:light', attributeSelectorEngine_1.createAttributeEngine('id', false));
        this.engines.set('data-testid', attributeSelectorEngine_1.createAttributeEngine('data-testid', true));
        this.engines.set('data-testid:light', attributeSelectorEngine_1.createAttributeEngine('data-testid', false));
        this.engines.set('data-test-id', attributeSelectorEngine_1.createAttributeEngine('data-test-id', true));
        this.engines.set('data-test-id:light', attributeSelectorEngine_1.createAttributeEngine('data-test-id', false));
        this.engines.set('data-test', attributeSelectorEngine_1.createAttributeEngine('data-test', true));
        this.engines.set('data-test:light', attributeSelectorEngine_1.createAttributeEngine('data-test', false));
        for (const { name, engine } of customEngines)
            this.engines.set(name, engine);
    }
    parseSelector(selector) {
        return selectorParser_1.parseSelector(selector);
    }
    querySelector(selector, root) {
        if (!root['querySelector'])
            throw new Error('Node is not queryable.');
        return this._querySelectorRecursively(root, selector, 0);
    }
    _querySelectorRecursively(root, selector, index) {
        const current = selector.parts[index];
        if (index === selector.parts.length - 1)
            return this.engines.get(current.name).query(root, current.body);
        const all = this.engines.get(current.name).queryAll(root, current.body);
        for (const next of all) {
            const result = this._querySelectorRecursively(next, selector, index + 1);
            if (result)
                return selector.capture === index ? next : result;
        }
    }
    querySelectorAll(selector, root) {
        if (!root['querySelectorAll'])
            throw new Error('Node is not queryable.');
        const capture = selector.capture === undefined ? selector.parts.length - 1 : selector.capture;
        // Query all elements up to the capture.
        const partsToQuerAll = selector.parts.slice(0, capture + 1);
        // Check they have a descendant matching everything after the capture.
        const partsToCheckOne = selector.parts.slice(capture + 1);
        let set = new Set([root]);
        for (const { name, body } of partsToQuerAll) {
            const newSet = new Set();
            for (const prev of set) {
                for (const next of this.engines.get(name).queryAll(prev, body)) {
                    if (newSet.has(next))
                        continue;
                    newSet.add(next);
                }
            }
            set = newSet;
        }
        const candidates = Array.from(set);
        if (!partsToCheckOne.length)
            return candidates;
        const partial = { parts: partsToCheckOne };
        return candidates.filter(e => !!this._querySelectorRecursively(e, partial, 0));
    }
    extend(source, params) {
        const constrFunction = global.eval(source);
        return new constrFunction(this, params);
    }
    isVisible(element) {
        // Note: this logic should be similar to waitForDisplayedAtStablePosition() to avoid surprises.
        if (!element.ownerDocument || !element.ownerDocument.defaultView)
            return true;
        const style = element.ownerDocument.defaultView.getComputedStyle(element);
        if (!style || style.visibility === 'hidden')
            return false;
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
    }
    pollRaf(predicate) {
        return this._runAbortableTask(progress => {
            let fulfill;
            let reject;
            const result = new Promise((f, r) => { fulfill = f; reject = r; });
            const onRaf = () => {
                if (progress.aborted)
                    return;
                try {
                    const continuePolling = Symbol('continuePolling');
                    const success = predicate(progress, continuePolling);
                    if (success !== continuePolling)
                        fulfill(success);
                    else
                        requestAnimationFrame(onRaf);
                }
                catch (e) {
                    reject(e);
                }
            };
            onRaf();
            return result;
        });
    }
    pollInterval(pollInterval, predicate) {
        return this._runAbortableTask(progress => {
            let fulfill;
            let reject;
            const result = new Promise((f, r) => { fulfill = f; reject = r; });
            const onTimeout = () => {
                if (progress.aborted)
                    return;
                try {
                    const continuePolling = Symbol('continuePolling');
                    const success = predicate(progress, continuePolling);
                    if (success !== continuePolling)
                        fulfill(success);
                    else
                        setTimeout(onTimeout, pollInterval);
                }
                catch (e) {
                    reject(e);
                }
            };
            onTimeout();
            return result;
        });
    }
    _runAbortableTask(task) {
        let unsentLogs = [];
        let takeNextLogsCallback;
        const logReady = () => {
            if (!takeNextLogsCallback)
                return;
            takeNextLogsCallback(unsentLogs);
            unsentLogs = [];
            takeNextLogsCallback = undefined;
        };
        const takeNextLogs = () => new Promise(fulfill => {
            takeNextLogsCallback = fulfill;
            if (unsentLogs.length)
                logReady();
        });
        let lastLog = '';
        const progress = {
            aborted: false,
            log: (message) => {
                lastLog = message;
                unsentLogs.push(message);
                logReady();
            },
            logRepeating: (message) => {
                if (message !== lastLog)
                    progress.log(message);
            },
        };
        return {
            takeNextLogs,
            result: task(progress),
            cancel: () => { progress.aborted = true; },
            takeLastLogs: () => unsentLogs,
        };
    }
    getElementBorderWidth(node) {
        if (node.nodeType !== Node.ELEMENT_NODE || !node.ownerDocument || !node.ownerDocument.defaultView)
            return { left: 0, top: 0 };
        const style = node.ownerDocument.defaultView.getComputedStyle(node);
        return { left: parseInt(style.borderLeftWidth || '', 10), top: parseInt(style.borderTopWidth || '', 10) };
    }
    selectOptions(node, optionsToSelect) {
        if (node.nodeName.toLowerCase() !== 'select')
            return 'error:notselect';
        if (!node.isConnected)
            return 'error:notconnected';
        const element = node;
        const options = Array.from(element.options);
        element.value = undefined;
        for (let index = 0; index < options.length; index++) {
            const option = options[index];
            option.selected = optionsToSelect.some(optionToSelect => {
                if (optionToSelect instanceof Node)
                    return option === optionToSelect;
                let matches = true;
                if (optionToSelect.value !== undefined)
                    matches = matches && optionToSelect.value === option.value;
                if (optionToSelect.label !== undefined)
                    matches = matches && optionToSelect.label === option.label;
                if (optionToSelect.index !== undefined)
                    matches = matches && optionToSelect.index === index;
                return matches;
            });
            if (option.selected && !element.multiple)
                break;
        }
        element.dispatchEvent(new Event('input', { 'bubbles': true }));
        element.dispatchEvent(new Event('change', { 'bubbles': true }));
        return options.filter(option => option.selected).map(option => option.value);
    }
    waitForEnabledAndFill(node, value) {
        return this.pollRaf((progress, continuePolling) => {
            if (node.nodeType !== Node.ELEMENT_NODE)
                return 'error:notelement';
            const element = node;
            if (!element.isConnected)
                return 'error:notconnected';
            if (!this.isVisible(element)) {
                progress.logRepeating('    element is not visible - waiting...');
                return continuePolling;
            }
            if (element.nodeName.toLowerCase() === 'input') {
                const input = element;
                const type = (input.getAttribute('type') || '').toLowerCase();
                const kDateTypes = new Set(['date', 'time', 'datetime', 'datetime-local']);
                const kTextInputTypes = new Set(['', 'email', 'number', 'password', 'search', 'tel', 'text', 'url']);
                if (!kTextInputTypes.has(type) && !kDateTypes.has(type)) {
                    progress.log(`    input of type "${type}" cannot be filled`);
                    return 'error:notfillableinputtype';
                }
                if (type === 'number') {
                    value = value.trim();
                    if (isNaN(Number(value)))
                        return 'error:notfillablenumberinput';
                }
                if (input.disabled) {
                    progress.logRepeating('    element is disabled - waiting...');
                    return continuePolling;
                }
                if (input.readOnly) {
                    progress.logRepeating('    element is readonly - waiting...');
                    return continuePolling;
                }
                if (kDateTypes.has(type)) {
                    value = value.trim();
                    input.focus();
                    input.value = value;
                    if (input.value !== value)
                        return 'error:notvaliddate';
                    element.dispatchEvent(new Event('input', { 'bubbles': true }));
                    element.dispatchEvent(new Event('change', { 'bubbles': true }));
                    return 'done'; // We have already changed the value, no need to input it.
                }
            }
            else if (element.nodeName.toLowerCase() === 'textarea') {
                const textarea = element;
                if (textarea.disabled) {
                    progress.logRepeating('    element is disabled - waiting...');
                    return continuePolling;
                }
                if (textarea.readOnly) {
                    progress.logRepeating('    element is readonly - waiting...');
                    return continuePolling;
                }
            }
            else if (!element.isContentEditable) {
                return 'error:notfillableelement';
            }
            const result = this._selectText(element);
            if (result === 'error:notvisible') {
                progress.logRepeating('    element is not visible - waiting...');
                return continuePolling;
            }
            return 'needsinput'; // Still need to input the value.
        });
    }
    waitForVisibleAndSelectText(node) {
        return this.pollRaf((progress, continuePolling) => {
            if (node.nodeType !== Node.ELEMENT_NODE)
                return 'error:notelement';
            if (!node.isConnected)
                return 'error:notconnected';
            const element = node;
            if (!this.isVisible(element)) {
                progress.logRepeating('    element is not visible - waiting...');
                return continuePolling;
            }
            const result = this._selectText(element);
            if (result === 'error:notvisible') {
                progress.logRepeating('    element is not visible - waiting...');
                return continuePolling;
            }
            return result;
        });
    }
    _selectText(element) {
        if (element.nodeName.toLowerCase() === 'input') {
            const input = element;
            input.select();
            input.focus();
            return 'done';
        }
        if (element.nodeName.toLowerCase() === 'textarea') {
            const textarea = element;
            textarea.selectionStart = 0;
            textarea.selectionEnd = textarea.value.length;
            textarea.focus();
            return 'done';
        }
        const range = element.ownerDocument.createRange();
        range.selectNodeContents(element);
        const selection = element.ownerDocument.defaultView.getSelection();
        if (!selection)
            return 'error:notvisible';
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
        return 'done';
    }
    waitForNodeVisible(node) {
        return this.pollRaf((progress, continuePolling) => {
            const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
            if (!node.isConnected || !element)
                return 'error:notconnected';
            if (!this.isVisible(element)) {
                progress.logRepeating('    element is not visible - waiting...');
                return continuePolling;
            }
            return 'done';
        });
    }
    waitForNodeHidden(node) {
        return this.pollRaf((progress, continuePolling) => {
            const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
            if (!node.isConnected || !element)
                return 'done';
            if (this.isVisible(element)) {
                progress.logRepeating('    element is visible - waiting...');
                return continuePolling;
            }
            return 'done';
        });
    }
    waitForNodeEnabled(node) {
        return this.pollRaf((progress, continuePolling) => {
            const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
            if (!node.isConnected || !element)
                return 'error:notconnected';
            if (this._isElementDisabled(element)) {
                progress.logRepeating('    element is not enabled - waiting...');
                return continuePolling;
            }
            return 'done';
        });
    }
    waitForNodeDisabled(node) {
        return this.pollRaf((progress, continuePolling) => {
            const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
            if (!node.isConnected || !element)
                return 'error:notconnected';
            if (!this._isElementDisabled(element)) {
                progress.logRepeating('    element is enabled - waiting...');
                return continuePolling;
            }
            return 'done';
        });
    }
    focusNode(node, resetSelectionIfNotFocused) {
        if (!node.isConnected)
            return 'error:notconnected';
        if (node.nodeType !== Node.ELEMENT_NODE)
            return 'error:notelement';
        const wasFocused = node.getRootNode().activeElement === node && node.ownerDocument && node.ownerDocument.hasFocus();
        node.focus();
        if (resetSelectionIfNotFocused && !wasFocused && node.nodeName.toLowerCase() === 'input') {
            try {
                const input = node;
                input.setSelectionRange(0, 0);
            }
            catch (e) {
                // Some inputs do not allow selection.
            }
        }
        return 'done';
    }
    isCheckboxChecked(node) {
        if (node.nodeType !== Node.ELEMENT_NODE)
            throw new Error('Not a checkbox or radio button');
        let element = node;
        if (element.getAttribute('role') === 'checkbox')
            return element.getAttribute('aria-checked') === 'true';
        if (element.nodeName === 'LABEL') {
            const forId = element.getAttribute('for');
            if (forId && element.ownerDocument)
                element = element.ownerDocument.querySelector(`input[id="${forId}"]`) || undefined;
            else
                element = element.querySelector('input[type=checkbox],input[type=radio]') || undefined;
        }
        if (element && element.nodeName === 'INPUT') {
            const type = element.getAttribute('type');
            if (type && (type.toLowerCase() === 'checkbox' || type.toLowerCase() === 'radio'))
                return element.checked;
        }
        throw new Error('Not a checkbox');
    }
    setInputFiles(node, payloads) {
        if (node.nodeType !== Node.ELEMENT_NODE)
            return 'Node is not of type HTMLElement';
        const element = node;
        if (element.nodeName !== 'INPUT')
            return 'Not an <input> element';
        const input = element;
        const type = (input.getAttribute('type') || '').toLowerCase();
        if (type !== 'file')
            return 'Not an input[type=file] element';
        const files = payloads.map(file => {
            const bytes = Uint8Array.from(atob(file.buffer), c => c.charCodeAt(0));
            return new File([bytes], file.name, { type: file.mimeType });
        });
        const dt = new DataTransfer();
        for (const file of files)
            dt.items.add(file);
        input.files = dt.files;
        input.dispatchEvent(new Event('input', { 'bubbles': true }));
        input.dispatchEvent(new Event('change', { 'bubbles': true }));
    }
    waitForDisplayedAtStablePosition(node, rafCount, waitForEnabled) {
        let lastRect;
        let counter = 0;
        let samePositionCounter = 0;
        let lastTime = 0;
        return this.pollRaf((progress, continuePolling) => {
            // First raf happens in the same animation frame as evaluation, so it does not produce
            // any client rect difference compared to synchronous call. We skip the synchronous call
            // and only force layout during actual rafs as a small optimisation.
            if (++counter === 1)
                return continuePolling;
            if (!node.isConnected)
                return 'error:notconnected';
            const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
            if (!element)
                return 'error:notconnected';
            // Drop frames that are shorter than 16ms - WebKit Win bug.
            const time = performance.now();
            if (rafCount > 1 && time - lastTime < 15)
                return continuePolling;
            lastTime = time;
            // Note: this logic should be similar to isVisible() to avoid surprises.
            const clientRect = element.getBoundingClientRect();
            const rect = { x: clientRect.top, y: clientRect.left, width: clientRect.width, height: clientRect.height };
            const samePosition = lastRect && rect.x === lastRect.x && rect.y === lastRect.y && rect.width === lastRect.width && rect.height === lastRect.height;
            const isDisplayed = rect.width > 0 && rect.height > 0;
            if (samePosition)
                ++samePositionCounter;
            else
                samePositionCounter = 0;
            const isStable = samePositionCounter >= rafCount;
            const isStableForLogs = isStable || !lastRect;
            lastRect = rect;
            const style = element.ownerDocument && element.ownerDocument.defaultView ? element.ownerDocument.defaultView.getComputedStyle(element) : undefined;
            const isVisible = !!style && style.visibility !== 'hidden';
            const isDisabled = waitForEnabled && this._isElementDisabled(element);
            if (isDisplayed && isStable && isVisible && !isDisabled)
                return 'done';
            if (!isDisplayed || !isVisible)
                progress.logRepeating(`    element is not visible - waiting...`);
            else if (!isStableForLogs)
                progress.logRepeating(`    element is moving - waiting...`);
            else if (isDisabled)
                progress.logRepeating(`    element is disabled - waiting...`);
            return continuePolling;
        });
    }
    checkHitTargetAt(node, point) {
        let element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
        if (!element || !element.isConnected)
            return 'error:notconnected';
        element = element.closest('button, [role=button]') || element;
        let hitElement = this.deepElementFromPoint(document, point.x, point.y);
        const hitParents = [];
        while (hitElement && hitElement !== element) {
            hitParents.push(hitElement);
            hitElement = this._parentElementOrShadowHost(hitElement);
        }
        if (hitElement === element)
            return 'done';
        const hitTargetDescription = this.previewNode(hitParents[0]);
        // Root is the topmost element in the hitTarget's chain that is not in the
        // element's chain. For example, it might be a dialog element that overlays
        // the target.
        let rootHitTargetDescription;
        while (element) {
            const index = hitParents.indexOf(element);
            if (index !== -1) {
                if (index > 1)
                    rootHitTargetDescription = this.previewNode(hitParents[index - 1]);
                break;
            }
            element = this._parentElementOrShadowHost(element);
        }
        if (rootHitTargetDescription)
            return { hitTargetDescription: `${hitTargetDescription} from ${rootHitTargetDescription} subtree` };
        return { hitTargetDescription };
    }
    dispatchEvent(node, type, eventInit) {
        let event;
        eventInit = { bubbles: true, cancelable: true, composed: true, ...eventInit };
        switch (eventType.get(type)) {
            case 'mouse':
                event = new MouseEvent(type, eventInit);
                break;
            case 'keyboard':
                event = new KeyboardEvent(type, eventInit);
                break;
            case 'touch':
                event = new TouchEvent(type, eventInit);
                break;
            case 'pointer':
                event = new PointerEvent(type, eventInit);
                break;
            case 'focus':
                event = new FocusEvent(type, eventInit);
                break;
            case 'drag':
                event = new DragEvent(type, eventInit);
                break;
            default:
                event = new Event(type, eventInit);
                break;
        }
        node.dispatchEvent(event);
    }
    _isElementDisabled(element) {
        const elementOrButton = element.closest('button, [role=button]') || element;
        return ['BUTTON', 'INPUT', 'SELECT'].includes(elementOrButton.nodeName) && elementOrButton.hasAttribute('disabled');
    }
    _parentElementOrShadowHost(element) {
        if (element.parentElement)
            return element.parentElement;
        if (!element.parentNode)
            return;
        if (element.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE && element.parentNode.host)
            return element.parentNode.host;
    }
    deepElementFromPoint(document, x, y) {
        let container = document;
        let element;
        while (container) {
            const innerElement = container.elementFromPoint(x, y);
            if (!innerElement || element === innerElement)
                break;
            element = innerElement;
            container = element.shadowRoot;
        }
        return element;
    }
    previewNode(node) {
        if (node.nodeType === Node.TEXT_NODE)
            return oneLine(`#text=${node.nodeValue || ''}`);
        if (node.nodeType !== Node.ELEMENT_NODE)
            return oneLine(`<${node.nodeName.toLowerCase()} />`);
        const element = node;
        const attrs = [];
        for (let i = 0; i < element.attributes.length; i++) {
            const { name, value } = element.attributes[i];
            if (name === 'style')
                continue;
            if (!value && booleanAttributes.has(name))
                attrs.push(` ${name}`);
            else
                attrs.push(` ${name}="${value}"`);
        }
        attrs.sort((a, b) => a.length - b.length);
        let attrText = attrs.join('');
        if (attrText.length > 50)
            attrText = attrText.substring(0, 49) + '\u2026';
        if (autoClosingTags.has(element.nodeName))
            return oneLine(`<${element.nodeName.toLowerCase()}${attrText}/>`);
        const children = element.childNodes;
        let onlyText = false;
        if (children.length <= 5) {
            onlyText = true;
            for (let i = 0; i < children.length; i++)
                onlyText = onlyText && children[i].nodeType === Node.TEXT_NODE;
        }
        let text = onlyText ? (element.textContent || '') : (children.length ? '\u2026' : '');
        if (text.length > 50)
            text = text.substring(0, 49) + '\u2026';
        return oneLine(`<${element.nodeName.toLowerCase()}${attrText}>${text}</${element.nodeName.toLowerCase()}>`);
    }
}
exports.InjectedScript = InjectedScript;
const autoClosingTags = new Set(['AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'MENUITEM', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR']);
const booleanAttributes = new Set(['checked', 'selected', 'disabled', 'readonly', 'multiple']);
function oneLine(s) {
    return s.replace(/\n/g, '↵').replace(/\t/g, '⇆');
}
const eventType = new Map([
    ['auxclick', 'mouse'],
    ['click', 'mouse'],
    ['dblclick', 'mouse'],
    ['mousedown', 'mouse'],
    ['mouseeenter', 'mouse'],
    ['mouseleave', 'mouse'],
    ['mousemove', 'mouse'],
    ['mouseout', 'mouse'],
    ['mouseover', 'mouse'],
    ['mouseup', 'mouse'],
    ['mouseleave', 'mouse'],
    ['mousewheel', 'mouse'],
    ['keydown', 'keyboard'],
    ['keyup', 'keyboard'],
    ['keypress', 'keyboard'],
    ['textInput', 'keyboard'],
    ['touchstart', 'touch'],
    ['touchmove', 'touch'],
    ['touchend', 'touch'],
    ['touchcancel', 'touch'],
    ['pointerover', 'pointer'],
    ['pointerout', 'pointer'],
    ['pointerenter', 'pointer'],
    ['pointerleave', 'pointer'],
    ['pointerdown', 'pointer'],
    ['pointerup', 'pointer'],
    ['pointermove', 'pointer'],
    ['pointercancel', 'pointer'],
    ['gotpointercapture', 'pointer'],
    ['lostpointercapture', 'pointer'],
    ['focus', 'focus'],
    ['blur', 'focus'],
    ['drag', 'drag'],
    ['dragstart', 'drag'],
    ['dragend', 'drag'],
    ['dragover', 'drag'],
    ['dragenter', 'drag'],
    ['dragleave', 'drag'],
    ['dragexit', 'drag'],
    ['drop', 'drag'],
]);
exports.default = InjectedScript;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/server/injected/textSelectorEngine.ts":
/*!***************************************************!*\
  !*** ./src/server/injected/textSelectorEngine.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextSelector = void 0;
function createTextSelector(shadow) {
    const engine = {
        create(root, targetElement, type) {
            const document = root instanceof Document ? root : root.ownerDocument;
            if (!document)
                return;
            for (let child = targetElement.firstChild; child; child = child.nextSibling) {
                if (child.nodeType === 3 /* Node.TEXT_NODE */) {
                    const text = child.nodeValue;
                    if (!text)
                        continue;
                    if (text.match(/^\s*[a-zA-Z0-9]+\s*$/) && engine.query(root, text.trim()) === targetElement)
                        return text.trim();
                    if (queryInternal(root, createMatcher(JSON.stringify(text)), shadow) === targetElement)
                        return JSON.stringify(text);
                }
            }
        },
        query(root, selector) {
            return queryInternal(root, createMatcher(selector), shadow);
        },
        queryAll(root, selector) {
            const result = [];
            queryAllInternal(root, createMatcher(selector), shadow, result);
            return result;
        }
    };
    return engine;
}
exports.createTextSelector = createTextSelector;
function unescape(s) {
    if (!s.includes('\\'))
        return s;
    const r = [];
    let i = 0;
    while (i < s.length) {
        if (s[i] === '\\' && i + 1 < s.length)
            i++;
        r.push(s[i++]);
    }
    return r.join('');
}
function createMatcher(selector) {
    if (selector.length > 1 && selector[0] === '"' && selector[selector.length - 1] === '"') {
        const parsed = unescape(selector.substring(1, selector.length - 1));
        return text => text === parsed;
    }
    if (selector.length > 1 && selector[0] === "'" && selector[selector.length - 1] === "'") {
        const parsed = unescape(selector.substring(1, selector.length - 1));
        return text => text === parsed;
    }
    if (selector[0] === '/' && selector.lastIndexOf('/') > 0) {
        const lastSlash = selector.lastIndexOf('/');
        const re = new RegExp(selector.substring(1, lastSlash), selector.substring(lastSlash + 1));
        return text => re.test(text);
    }
    selector = selector.trim().toLowerCase();
    return text => text.toLowerCase().includes(selector);
}
// Skips <head>, <script> and <style> elements and all their children.
const nodeFilter = {
    acceptNode: node => {
        return node.nodeName === 'HEAD' || node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE' ?
            NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
};
// If we are querying inside a filtered element, nodeFilter is never called, so we need a separate check.
function isFilteredNode(root, document) {
    return root.nodeName === 'SCRIPT' || root.nodeName === 'STYLE' || document.head && document.head.contains(root);
}
function queryInternal(root, matcher, shadow) {
    const document = root instanceof Document ? root : root.ownerDocument;
    if (isFilteredNode(root, document))
        return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, nodeFilter);
    const shadowRoots = [];
    if (shadow && root.shadowRoot)
        shadowRoots.push(root.shadowRoot);
    let lastTextParent = null;
    let lastText = '';
    while (true) {
        const node = walker.nextNode();
        const textParent = (node && node.nodeType === Node.TEXT_NODE) ? node.parentElement : null;
        if (lastTextParent && textParent !== lastTextParent) {
            if (matcher(lastText))
                return lastTextParent;
            lastText = '';
        }
        lastTextParent = textParent;
        if (!node)
            break;
        if (node.nodeType === Node.TEXT_NODE) {
            lastText += node.nodeValue;
        }
        else {
            const element = node;
            if ((element instanceof HTMLInputElement) && (element.type === 'submit' || element.type === 'button') && matcher(element.value))
                return element;
            if (shadow && element.shadowRoot)
                shadowRoots.push(element.shadowRoot);
        }
    }
    for (const shadowRoot of shadowRoots) {
        const element = queryInternal(shadowRoot, matcher, shadow);
        if (element)
            return element;
    }
}
function queryAllInternal(root, matcher, shadow, result) {
    const document = root instanceof Document ? root : root.ownerDocument;
    if (isFilteredNode(root, document))
        return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, nodeFilter);
    const shadowRoots = [];
    if (shadow && root.shadowRoot)
        shadowRoots.push(root.shadowRoot);
    let lastTextParent = null;
    let lastText = '';
    while (true) {
        const node = walker.nextNode();
        const textParent = (node && node.nodeType === Node.TEXT_NODE) ? node.parentElement : null;
        if (lastTextParent && textParent !== lastTextParent) {
            if (matcher(lastText))
                result.push(lastTextParent);
            lastText = '';
        }
        lastTextParent = textParent;
        if (!node)
            break;
        if (node.nodeType === Node.TEXT_NODE) {
            lastText += node.nodeValue;
        }
        else {
            const element = node;
            if ((element instanceof HTMLInputElement) && (element.type === 'submit' || element.type === 'button') && matcher(element.value))
                result.push(element);
            if (shadow && element.shadowRoot)
                shadowRoots.push(element.shadowRoot);
        }
    }
    for (const shadowRoot of shadowRoots)
        queryAllInternal(shadowRoot, matcher, shadow, result);
}


/***/ }),

/***/ "./src/server/injected/xpathSelectorEngine.ts":
/*!****************************************************!*\
  !*** ./src/server/injected/xpathSelectorEngine.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.XPathEngine = void 0;
const maxTextLength = 80;
const minMeaningfulSelectorLegth = 100;
exports.XPathEngine = {
    create(root, targetElement, type) {
        const maybeDocument = root instanceof Document ? root : root.ownerDocument;
        if (!maybeDocument)
            return;
        const document = maybeDocument;
        const xpathCache = new Map();
        if (type === 'notext')
            return createNoText(root, targetElement);
        const tokens = [];
        function evaluateXPath(expression) {
            let nodes = xpathCache.get(expression);
            if (!nodes) {
                nodes = [];
                try {
                    const result = document.evaluate(expression, root, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
                    for (let node = result.iterateNext(); node; node = result.iterateNext()) {
                        if (node.nodeType === Node.ELEMENT_NODE)
                            nodes.push(node);
                    }
                }
                catch (e) {
                }
                xpathCache.set(expression, nodes);
            }
            return nodes;
        }
        function uniqueXPathSelector(prefix) {
            const path = tokens.slice();
            if (prefix)
                path.unshift(prefix);
            let selector = '//' + path.join('/');
            while (selector.includes('///'))
                selector = selector.replace('///', '//');
            if (selector.endsWith('/'))
                selector = selector.substring(0, selector.length - 1);
            const nodes = evaluateXPath(selector);
            if (nodes[nodes.length - 1] === targetElement)
                return selector;
            // If we are looking at a small set of elements with long selector, fall back to ordinal.
            if (nodes.length < 5 && selector.length > minMeaningfulSelectorLegth) {
                const index = nodes.indexOf(targetElement);
                if (index !== -1)
                    return `(${selector})[${index + 1}]`;
            }
            return undefined;
        }
        function escapeAndCap(text) {
            text = text.substring(0, maxTextLength);
            // XPath 1.0 does not support quote escaping.
            // 1. If there are no single quotes - use them.
            if (text.indexOf(`'`) === -1)
                return `'${text}'`;
            // 2. If there are no double quotes - use them to enclose text.
            if (text.indexOf(`"`) === -1)
                return `"${text}"`;
            // 3. Otherwise, use popular |concat| trick.
            const Q = `'`;
            return `concat(${text.split(Q).map(token => Q + token + Q).join(`, "'", `)})`;
        }
        const defaultAttributes = new Set(['title', 'aria-label', 'disabled', 'role']);
        const importantAttributes = new Map([
            ['form', ['action']],
            ['img', ['alt']],
            ['input', ['placeholder', 'type', 'name', 'value']],
        ]);
        let usedTextConditions = false;
        for (let element = targetElement; element && element !== root; element = element.parentElement) {
            const nodeName = element.nodeName.toLowerCase();
            const tag = nodeName === 'svg' ? '*' : nodeName;
            const tagConditions = [];
            if (nodeName === 'svg')
                tagConditions.push('local-name()="svg"');
            const attrConditions = [];
            const importantAttrs = [...defaultAttributes, ...(importantAttributes.get(tag) || [])];
            for (const attr of importantAttrs) {
                const value = element.getAttribute(attr);
                if (value && value.length < maxTextLength)
                    attrConditions.push(`normalize-space(@${attr})=${escapeAndCap(value)}`);
                else if (value)
                    attrConditions.push(`starts-with(normalize-space(@${attr}), ${escapeAndCap(value)})`);
            }
            const text = document.evaluate('normalize-space(.)', element).stringValue;
            const textConditions = [];
            if (tag !== 'select' && text.length && !usedTextConditions) {
                if (text.length < maxTextLength)
                    textConditions.push(`normalize-space(.)=${escapeAndCap(text)}`);
                else
                    textConditions.push(`starts-with(normalize-space(.), ${escapeAndCap(text)})`);
                usedTextConditions = true;
            }
            // Always retain the last tag.
            const conditions = [...tagConditions, ...textConditions, ...attrConditions];
            const token = conditions.length ? `${tag}[${conditions.join(' and ')}]` : (tokens.length ? '' : tag);
            const selector = uniqueXPathSelector(token);
            if (selector)
                return selector;
            // Ordinal is the weakest signal.
            const parent = element.parentElement;
            let tagWithOrdinal = tag;
            if (parent) {
                const siblings = Array.from(parent.children);
                const sameTagSiblings = siblings.filter(sibling => (sibling).nodeName.toLowerCase() === nodeName);
                if (sameTagSiblings.length > 1)
                    tagWithOrdinal += `[${1 + siblings.indexOf(element)}]`;
            }
            // Do not include text into this token, only tag / attributes.
            // Topmost node will get all the text.
            const nonTextConditions = [...tagConditions, ...attrConditions];
            const levelToken = nonTextConditions.length ? `${tagWithOrdinal}[${nonTextConditions.join(' and ')}]` : tokens.length ? '' : tagWithOrdinal;
            tokens.unshift(levelToken);
        }
        return uniqueXPathSelector();
    },
    query(root, selector) {
        const document = root instanceof Document ? root : root.ownerDocument;
        if (!document)
            return;
        const it = document.evaluate(selector, root, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
        for (let node = it.iterateNext(); node; node = it.iterateNext()) {
            if (node.nodeType === Node.ELEMENT_NODE)
                return node;
        }
    },
    queryAll(root, selector) {
        const result = [];
        const document = root instanceof Document ? root : root.ownerDocument;
        if (!document)
            return result;
        const it = document.evaluate(selector, root, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
        for (let node = it.iterateNext(); node; node = it.iterateNext()) {
            if (node.nodeType === Node.ELEMENT_NODE)
                result.push(node);
        }
        return result;
    }
};
function createNoText(root, targetElement) {
    const steps = [];
    for (let element = targetElement; element && element !== root; element = element.parentElement) {
        if (element.getAttribute('id')) {
            steps.unshift(`//*[@id="${element.getAttribute('id')}"]`);
            return steps.join('/');
        }
        const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
        const similarElements = siblings.filter(sibling => element.nodeName === sibling.nodeName);
        const index = similarElements.length === 1 ? 0 : similarElements.indexOf(element) + 1;
        steps.unshift(index ? `${element.nodeName}[${index}]` : element.nodeName);
    }
    return '/' + steps.join('/');
}


/***/ })

/******/ })).default)([]);
  const createTextSelector = (element) => evaluator.engines.get('text').create(document, element);
  const isVisible = (element) => evaluator.isVisible(element);
  const querySelector = (...args) => evaluator.querySelector(...args);
  module.exports = { createTextSelector, isVisible, querySelector };

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueMatches = exports.isDynamic = exports.tokenIsDynamic = exports.getTokens = void 0;
const html_tags_1 = __importDefault(__webpack_require__(10));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const englishWords = __webpack_require__(12);
const matchOperators = new Map([
    ['startsWith', '^='],
    ['endsWith', '$='],
    ['contains', '*='],
    ['equals', '='],
]);
// Keep these two in sync
const SPLIT_CHARACTERS = [' ', '-', '_', ':'];
const SPLIT_REGEXP = /[ \-_:]+/;
const allWords = new Set([
    'btn',
    'checkbox',
    'dropdown',
    // favicon
    'fa',
    'grid',
    'inputtext',
    'lg',
    'login',
    'logout',
    // medium
    'md',
    // material ui
    'mui',
    'nav',
    'signin',
    'signout',
    'signup',
    'sm',
    'textinput',
    'todo',
    ...html_tags_1.default,
    ...englishWords,
]);
// remove the alphabet from word list
for (let i = 0; i < 26; i++)
    allWords.delete((i + 10).toString(36));
const SCORE_THRESHOLD = 0.5;
exports.getTokens = (value) => {
    const tokens = [];
    // split by space, dash, underscore, colon
    value.split(SPLIT_REGEXP).forEach((token) => {
        if (token.match(/\d/)) {
            tokens.push(token);
        }
        else {
            // split by camel case when there are no numbers
            tokens.push(...token.split(/(?=[A-Z])/));
        }
    });
    return tokens.map((token) => token.toLowerCase());
};
/**
 * @summary Given a value string that has already been pieced out,
 *   determines whether it appears to be dynamically generated (random, non-word)
 * @param {String} value The string to check
 * @return {Boolean} True if it appears to be dynamically generated
 */
exports.tokenIsDynamic = (value) => {
    return !allWords.has(value);
};
/**
 * @summary Given an attribute value, breaks it apart into pieces/words, and
 *   then determines how many pieces are dynamically generated.
 * @param {String} value The attribute value to check
 * @param {Number} [threshold=0.5] Provide a threshold override if necessary
 * @return {Boolean} If two or more pieces are dynamic, or if 1 out of 2 pieces
 *   or 1 out of 1 piece are dynamic, returns true. Also returns `true` if
 *   `value` is not a string.
 */
exports.isDynamic = (value, threshold = SCORE_THRESHOLD) => {
    if (!value || typeof value !== 'string')
        return true;
    const tokens = exports.getTokens(value);
    const dynamicTokens = tokens.filter(exports.tokenIsDynamic);
    // if there are 2 or more dynamic tokens, mark it as dynamic
    if (dynamicTokens.length >= 2)
        return true;
    // If half or more tokens are dynamic, mark value as dynamic
    return dynamicTokens.length / tokens.length >= threshold;
};
/**
 * @summary Given an attribute value, determines the best ways to match on only
 *   the pieces of it that appear to be static (regular words that don't seem
 *   to be dynamically generated).
 *
 *   Examples:
 *
 *     - For 'input-bj84jd9' it will suggest a starts-with match on `input-`
 *     - For 'bj84jd9-input' it will suggest an ends-with match on `-input`
 *     - For '25-input-bj84jd9' it will suggest a contains match on `-input-`
 *     - For 'bj84jd9' it will return `null` because the whole value is dynamic
 *     - For '', null, or undefined it will return `null`
 *     - For 'input-25-red-bj84jd9' it will suggest two matches: a starts-with
 *         match on `input-` and a contains match on `-red-`.
 *
 *  @param {String|null|undefined} value The attribute value to examine
 *  @return {Object[]} List of possible value matches, empty if no static pieces are found
 */
exports.getValueMatches = (value) => {
    if (!value || typeof value !== 'string' || value.length === 0)
        return [];
    // Break the value into tokens, each of which may be words, numbers, or something else.
    const tokens = exports.getTokens(value);
    let currentPosition = 0;
    let currentStaticBlock = '';
    let lastTokenType;
    const staticMatches = [];
    const addMatchToList = () => {
        const startPosition = currentPosition - currentStaticBlock.length;
        // Determine what type of match this would be
        let type;
        if (currentStaticBlock.length === value.length) {
            type = 'equals';
        }
        else if (startPosition === 0) {
            type = 'startsWith';
        }
        else if (currentPosition === value.length) {
            type = 'endsWith';
        }
        else {
            type = 'contains';
        }
        staticMatches.push({
            match: currentStaticBlock,
            operator: matchOperators.get(type),
            type,
            startPosition,
        });
    };
    // There may be multiple dynamic tokens in a row or multiple static in a row.
    // What we care about is the "token blocks", which is each group of same-type
    // tokens. Thus we loop through, checking the type of each, and taking action
    // only when we switch between types.
    for (const token of tokens) {
        const tokenType = exports.tokenIsDynamic(token) ? 'dynamic' : 'static';
        // Whenever we finish a static block, add it to the list.
        if (tokenType === 'dynamic' && lastTokenType === 'static') {
            addMatchToList();
        }
        else if (tokenType === 'static' && lastTokenType === 'dynamic') {
            // When we start a new static block after a dynamic block, reset the current
            // block string, and potentially add all preceding split characters to it.
            currentStaticBlock = '';
            let backwardPosition = currentPosition - 1;
            let previousCharacter = value[backwardPosition];
            while (SPLIT_CHARACTERS.includes(previousCharacter)) {
                currentStaticBlock = previousCharacter + currentStaticBlock;
                backwardPosition -= 1;
                previousCharacter = value[backwardPosition];
            }
        }
        // Add only static tokens to the end of the current static block string.
        // We are re-combining static tokens that were pieced apart by `getTokens`.
        // We could just append the token string itself, but it has been lowercased.
        if (tokenType === 'static') {
            currentStaticBlock += value.substr(currentPosition, token.length);
        }
        // Keep track of where we are in the original value string
        currentPosition += token.length;
        // Add back in any split-by characters
        let nextCharacter = value[currentPosition];
        while (SPLIT_CHARACTERS.includes(nextCharacter)) {
            if (tokenType === 'static')
                currentStaticBlock += nextCharacter;
            currentPosition += 1;
            nextCharacter = value[currentPosition];
        }
        lastTokenType = tokenType;
    }
    // Do final check for longest if last token type was static
    if (lastTokenType === 'static')
        addMatchToList();
    console.debug('value matches for "%s": %j', value, staticMatches);
    return staticMatches;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(11);


/***/ }),
/* 11 */
/***/ (function(module) {

module.exports = JSON.parse("[\"a\",\"abbr\",\"address\",\"area\",\"article\",\"aside\",\"audio\",\"b\",\"base\",\"bdi\",\"bdo\",\"blockquote\",\"body\",\"br\",\"button\",\"canvas\",\"caption\",\"cite\",\"code\",\"col\",\"colgroup\",\"data\",\"datalist\",\"dd\",\"del\",\"details\",\"dfn\",\"dialog\",\"div\",\"dl\",\"dt\",\"em\",\"embed\",\"fieldset\",\"figcaption\",\"figure\",\"footer\",\"form\",\"h1\",\"h2\",\"h3\",\"h4\",\"h5\",\"h6\",\"head\",\"header\",\"hgroup\",\"hr\",\"html\",\"i\",\"iframe\",\"img\",\"input\",\"ins\",\"kbd\",\"label\",\"legend\",\"li\",\"link\",\"main\",\"map\",\"mark\",\"math\",\"menu\",\"menuitem\",\"meta\",\"meter\",\"nav\",\"noscript\",\"object\",\"ol\",\"optgroup\",\"option\",\"output\",\"p\",\"param\",\"picture\",\"pre\",\"progress\",\"q\",\"rb\",\"rp\",\"rt\",\"rtc\",\"ruby\",\"s\",\"samp\",\"script\",\"section\",\"select\",\"slot\",\"small\",\"source\",\"span\",\"strong\",\"style\",\"sub\",\"summary\",\"sup\",\"svg\",\"table\",\"tbody\",\"td\",\"template\",\"textarea\",\"tfoot\",\"th\",\"thead\",\"time\",\"title\",\"tr\",\"track\",\"u\",\"ul\",\"var\",\"video\",\"wbr\"]");

/***/ }),
/* 12 */
/***/ (function(module) {


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptConsoleLogs = exports.formatArgument = void 0;
const serialize_1 = __webpack_require__(0);
const LOG_LEVELS = ['debug', 'error', 'info', 'log', 'warn'];
exports.formatArgument = (argument) => {
    if (typeof argument === 'string') {
        return argument;
    }
    if (argument && argument.nodeName) {
        // log nodes as their xpath
        return serialize_1.getXpath(argument);
    }
    try {
        return JSON.stringify(argument);
    }
    catch (error) {
        if (argument && argument.toString) {
            return argument.toString();
        }
        return '';
    }
};
exports.interceptConsoleLogs = () => {
    if (window.qawInterceptLogs)
        return;
    window.qawInterceptLogs = true;
    LOG_LEVELS.forEach((level) => {
        const browserLog = console[level].bind(console);
        // console[level] = (...args: any): any => {
        //   const message: string = args
        //     .map((arg: any) => formatArgument(arg))
        //     .join(' ');
        //   browserLog(...args);
        //   // playwright is currently using logs as its message transport. prevent infinite loop.
        //   if (message.includes('__playwright')) return;
        //   const logCallback = (window as any).qawLogEvent;
        //   if (logCallback) logCallback({ level, message });
        // };
    });
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PageEventCollector = void 0;
const attribute_1 = __webpack_require__(2);
const element_1 = __webpack_require__(4);
const selector_1 = __webpack_require__(5);
const serialize_1 = __webpack_require__(0);
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


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.pickBestCueGroup = exports.findOptimalCueGroups = exports.findBestCueGroup = exports.trimExcessCues = exports.sortCues = exports.combine = exports.buildCueSets = void 0;
const cues_1 = __webpack_require__(3);
const selectorEngine_1 = __webpack_require__(1);
const TRIM_EXCESS_CUES_GOAL_SIZE = 8;
const CUE_GROUP_CUES_MAX_SIZE = 10;
const FINAL_CUE_GROUP_MAX_SIZE = 3;
/**
 * Build the cue sets.
 * There are multiple since each level of cues
 * can only have one type per level (css/text).
 */
exports.buildCueSets = (cues) => {
    const cueLevels = new Map();
    // Group cues into levels.
    cues.forEach((cue) => {
        const cueLevel = cueLevels.has(cue.level)
            ? cueLevels.get(cue.level)
            : { css: [], text: [] };
        if (cue.type === 'text') {
            cueLevel.text.push(cue);
        }
        else {
            cueLevel.css.push(cue);
        }
        cueLevels.set(cue.level, cueLevel);
    });
    let cueSets = [];
    const levels = [...cueLevels.keys()].sort((a, b) => b - a);
    levels.forEach((level) => {
        const cueLevel = cueLevels.get(level);
        const cueSetsWithLevel = [];
        // Append the level to each cue set
        // keeping css and text cues separate.
        cueSets.forEach((cueSet) => {
            if (cueLevel.css.length) {
                cueSetsWithLevel.push([...cueSet, ...cueLevel.css]);
            }
            if (cueLevel.text.length) {
                cueSetsWithLevel.push([...cueSet, ...cueLevel.text]);
            }
        });
        if (!cueSets.length) {
            // Create the first cue sets.
            if (cueLevel.css.length) {
                cueSetsWithLevel.push([...cueLevel.css]);
            }
            if (cueLevel.text.length) {
                cueSetsWithLevel.push([...cueLevel.text]);
            }
        }
        cueSets = cueSetsWithLevel;
    });
    return cueSets;
};
const doCombine = (items, remaining, combination, result) => {
    if (remaining === 0) {
        if (combination.length > 0) {
            result.push(combination);
        }
        return;
    }
    // For each item
    for (let i = 0; i < items.length; i++) {
        doCombine(
        // Combine the later items
        items.slice(i + 1), 
        // Recursively add items until we reach the correct size
        remaining - 1, 
        // Include the item in the selection
        combination.concat([items[i]]), result);
    }
    return;
};
/**
 * Build all combinations of items with the specified size.
 */
exports.combine = (items, size) => {
    const result = [];
    doCombine(items, size, [], result);
    return result;
};
exports.sortCues = (cues) => {
    return [...cues].sort((a, b) => {
        // Sort by level
        if (a.level < b.level)
            return 1;
        if (a.level > b.level)
            return -1;
        // Then by penalty
        if (a.penalty < b.penalty)
            return 1;
        if (a.penalty > b.penalty)
            return -1;
        // Then by the value length
        if (a.value.length < b.value.length)
            return 1;
        if (a.value.length > b.value.length)
            return -1;
        return 0;
    });
};
// Remove cues that are not necessary to target the element
// until we get to a size that we can try all combinations of
exports.trimExcessCues = (cuesToTrim, target, goalSize) => {
    let selectorParts = selectorEngine_1.buildSelectorParts(cuesToTrim);
    if (!selectorEngine_1.isMatch({ selectorParts, target })) {
        // Short-circuit if the cues do not match the target
        // This should never happen but we are being precautious
        console.debug('qawolf: selectors did not match', selectorParts, target);
        return null;
    }
    // Remove the cues furthest away from the target first
    let cues = exports.sortCues(cuesToTrim);
    for (let i = 0; i < cues.length && cues.length > goalSize; i++) {
        // Keep preferred attribute cues even if they are unnecessary
        if (cues[i].penalty === 0)
            continue;
        const cuesWithoutI = [...cues];
        cuesWithoutI.splice(i, 1);
        const selectorPartsWithoutI = selectorEngine_1.buildSelectorParts(cuesWithoutI);
        if (selectorEngine_1.isMatch({ selectorParts: selectorPartsWithoutI, target })) {
            cues = cuesWithoutI;
            selectorParts = selectorPartsWithoutI;
            i -= 1;
        }
    }
    return {
        cues,
        penalty: cues_1.getPenalty(cues),
        selectorParts,
        valueLength: cues_1.getValueLength(cues),
    };
};
// Go through every combination of cues from 1..max size
// Pick the cues that match the target with the lowest penalty
exports.findBestCueGroup = (seedGroup, maxSize, targetGroup) => {
    let bestGroup = seedGroup;
    // Keep the nearest attribute
    const cueToKeep = cues_1.findNearestPreferredAttributeCue(seedGroup.cues);
    for (let i = 1; i <= maxSize; i++) {
        const combinations = exports.combine(seedGroup.cues, i);
        combinations.forEach((cues) => {
            const penalty = cues_1.getPenalty(cues);
            // Skip these cues if they are not better
            if (penalty > bestGroup.penalty)
                return;
            const valueLength = cues_1.getValueLength(cues);
            if (penalty === bestGroup.penalty) {
                if (bestGroup.cues.length < cues.length)
                    return;
                if (bestGroup.cues.length === cues.length &&
                    valueLength >= bestGroup.valueLength)
                    return;
            }
            if (cueToKeep && !cues.includes(cueToKeep)) {
                cues.push(cueToKeep);
            }
            const selectorParts = selectorEngine_1.buildSelectorParts(cues);
            // If these selector parts match any element that we are targeting,
            // then it's currently the best group.
            const matchedElement = selectorEngine_1.getElementMatchingSelectorParts(selectorParts, targetGroup[0].ownerDocument);
            if (targetGroup.includes(matchedElement)) {
                bestGroup = {
                    cues,
                    penalty,
                    selectorParts,
                    valueLength,
                };
                // I considered breaking out of the loop here if penalty is 0, but then we would
                // not find other 0-penalty groups that might have a shorter value. We could
                // consider breaking out if `penalty` is 0 and `valueLength` is "low enough"
            }
        });
    }
    return bestGroup;
};
exports.findOptimalCueGroups = (input) => {
    const { cues, onFound, target, targetGroup } = input;
    const cueSets = exports.buildCueSets(cues);
    for (let index = 0; index < cueSets.length; index++) {
        // Only use the first 50 cue sets (there should never be this many, usually just ~2-3)
        if (index > 49)
            break;
        const cueSet = cueSets[index];
        // Trim down the cue group before exhaustively trying the combinations
        const cueGroup = exports.trimExcessCues(cueSet, target, TRIM_EXCESS_CUES_GOAL_SIZE);
        // Skip if we cannot trim the group (this should rarely happen)
        // Then exhaustively try all combinations
        if (cueGroup && cueGroup.cues.length <= CUE_GROUP_CUES_MAX_SIZE) {
            onFound(exports.findBestCueGroup(cueGroup, FINAL_CUE_GROUP_MAX_SIZE, targetGroup));
        }
    }
};
/**
 * @summary Given a list of cue groups, picks the one with the lowest total penalty
 *   and lowest total value length. That is, the one that is likely to produce the
 *   shortest and most accurate selector.
 */
exports.pickBestCueGroup = (cueGroups) => {
    let bestCueGroup;
    if (cueGroups.length === 0)
        return null;
    // Rank by the total penalty then by value length. This will take less
    // time than .sort and will not mutate the cueGroups array.
    for (const cueGroup of cueGroups) {
        if (!bestCueGroup ||
            cueGroup.penalty < bestCueGroup.penalty ||
            (cueGroup.penalty === bestCueGroup.penalty && cueGroup.valueLength < bestCueGroup.valueLength)) {
            bestCueGroup = cueGroup;
        }
    }
    return bestCueGroup;
};


/***/ })
/******/ ]);
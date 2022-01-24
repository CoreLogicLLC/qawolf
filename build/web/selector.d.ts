import { SelectorPart } from './types';
declare type BuildSelectorOptions = {
    attributes: string[];
    isClick: boolean;
    target: HTMLElement;
};
/**
 * @summary Clear the selector cache. Currently only used for tests.
 */
export declare const clearSelectorCache: () => void;
export declare const toSelector: (selectorParts: SelectorPart[]) => string;
export declare const buildSelector: (options: BuildSelectorOptions) => string;
export {};

import { Cue } from './cues';
import { SelectorPart } from './types';
declare type IsMatch = {
    selectorParts: SelectorPart[];
    target: HTMLElement;
};
export declare const buildSelectorParts: (cues: Cue[]) => SelectorPart[];
export declare const getElementText: (element: HTMLElement) => string | undefined;
export declare const isMatch: ({ selectorParts, target }: IsMatch) => boolean;
export declare const getElementMatchingSelectorParts: (selectorParts: SelectorPart[], root: Node) => HTMLElement;
export {};

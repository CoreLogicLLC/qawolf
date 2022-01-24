import { Cue } from './cues';
import { SelectorPart } from './types';
export declare type CueGroup = {
    cues: Cue[];
    penalty: number;
    selectorParts: SelectorPart[];
    valueLength: number;
};
export declare type OnFoundFn = (cueGroup: CueGroup) => void;
export declare type FindOptimalCueGroupsInput = {
    cues: Cue[];
    onFound: OnFoundFn;
    target: HTMLElement;
    targetGroup: HTMLElement[];
};
/**
 * Build the cue sets.
 * There are multiple since each level of cues
 * can only have one type per level (css/text).
 */
export declare const buildCueSets: (cues: Cue[]) => Cue[][];
/**
 * Build all combinations of items with the specified size.
 */
export declare const combine: <T>(items: T[], size: number) => T[][];
export declare const sortCues: (cues: Cue[]) => Cue[];
export declare const trimExcessCues: (cuesToTrim: Cue[], target: HTMLElement, goalSize: number) => CueGroup | null;
export declare const findBestCueGroup: (seedGroup: CueGroup, maxSize: number, targetGroup: HTMLElement[]) => CueGroup;
export declare const findOptimalCueGroups: (input: FindOptimalCueGroupsInput) => void;
/**
 * @summary Given a list of cue groups, picks the one with the lowest total penalty
 *   and lowest total value length. That is, the one that is likely to produce the
 *   shortest and most accurate selector.
 */
export declare const pickBestCueGroup: (cueGroups: CueGroup[]) => CueGroup | null;

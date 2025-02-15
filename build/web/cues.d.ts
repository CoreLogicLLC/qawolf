export declare type Cue = {
    level: number;
    penalty: number;
    type: string;
    value: string;
};
export declare type BuildCues = {
    cueTypesConfig: CueTypesConfig;
    isClick: boolean;
    target: HTMLElement;
};
declare type CueTypeConfig = {
    elements: string[];
    isPreferred?: boolean;
    penalty: number;
};
declare type CueTypesConfig = Record<string, CueTypeConfig>;
declare type BuildCuesForElement = {
    cueTypesConfig: CueTypesConfig;
    element: HTMLElement;
    isClick: boolean;
    level: number;
};
/**
 * @summary Get final cue types config
 * @return Cue type config with preferred attributes added. For now,
 *   all attributes are given 0 penalty, but eventually the user
 *   config could support custom penalties for each.
 */
export declare const getCueTypesConfig: (attributes: string[]) => CueTypesConfig;
export declare const buildCueValueForTag: (element: HTMLElement) => string;
export declare const buildCuesForElement: ({ cueTypesConfig, element, isClick, level, }: BuildCuesForElement) => Cue[];
export declare const buildCues: ({ cueTypesConfig, isClick, target, }: BuildCues) => Cue[];
export declare const findNearestPreferredAttributeCue: (cues: Cue[]) => Cue | null;
export declare const getPenalty: (cues: Cue[]) => number;
export declare const getValueLength: (cues: Cue[]) => number;
export {};

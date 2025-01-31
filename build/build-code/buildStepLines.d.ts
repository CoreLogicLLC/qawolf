import { Step } from '../types';
export declare type StepLineBuildContext = {
    initializedFrames: Map<string, string>;
    initializedPages: Set<number>;
    visiblePage: number;
};
/**
 * @summary Given a step, returns the correct page variable for it,
 *   such as `page` for the main page or `page2` for the second page.
 */
export declare const getStepPageVariableName: (step: Step) => string;
export declare const escapeSelector: (selector: string) => string;
export declare const buildValue: ({ action, value }: Step) => string;
export declare const buildExpressionLine: (step: Step, frameVariable?: string) => string;
export declare const buildStepLines: (step: Step, buildContext?: StepLineBuildContext) => string[];

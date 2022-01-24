declare type ValueMatchOperatorType = 'startsWith' | 'endsWith' | 'contains' | 'equals';
declare type ValueMatchOperator = '^=' | '$=' | '*=' | '=';
declare type ValueMatch = {
    match: string;
    operator: ValueMatchOperator;
    type: ValueMatchOperatorType;
    startPosition: number;
};
export declare const getTokens: (value: string) => string[];
/**
 * @summary Given a value string that has already been pieced out,
 *   determines whether it appears to be dynamically generated (random, non-word)
 * @param {String} value The string to check
 * @return {Boolean} True if it appears to be dynamically generated
 */
export declare const tokenIsDynamic: (value: string) => boolean;
/**
 * @summary Given an attribute value, breaks it apart into pieces/words, and
 *   then determines how many pieces are dynamically generated.
 * @param {String} value The attribute value to check
 * @param {Number} [threshold=0.5] Provide a threshold override if necessary
 * @return {Boolean} If two or more pieces are dynamic, or if 1 out of 2 pieces
 *   or 1 out of 1 piece are dynamic, returns true. Also returns `true` if
 *   `value` is not a string.
 */
export declare const isDynamic: (value: string, threshold?: number) => boolean;
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
export declare const getValueMatches: (value: string) => ValueMatch[];
export {};

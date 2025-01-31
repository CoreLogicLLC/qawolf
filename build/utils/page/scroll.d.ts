import { ElementHandle, Page } from 'playwright';
export interface ScrollValue {
    x: number;
    y: number;
}
export interface ScrollOptions extends ScrollValue {
    timeout?: number;
}
export declare const DEFAULT_TIMEOUT = 30000;
export declare const getScrollValue: (page: Page, elementHandle: ElementHandle<Element>) => Promise<ScrollValue>;
export declare const scroll: (page: Page, selector: string, { timeout, x, y }: ScrollOptions) => Promise<void>;

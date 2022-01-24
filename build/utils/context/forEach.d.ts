import { BrowserContext, Frame, Page } from 'playwright';
declare type FrameParams = {
    frame: Frame;
    page: Page;
};
export declare const forEachPage: (context: BrowserContext, pageFn: (page: Page) => any) => Promise<void>;
export declare const forEachFrame: (context: BrowserContext, frameFn: (params: FrameParams) => any) => Promise<void>;
export {};

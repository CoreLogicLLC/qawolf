import { Page } from 'playwright';
export interface AssertTextOptions {
    timeout?: number;
}
export declare const assertElementText: (page: Page, selector: string, text: string, options?: AssertTextOptions) => Promise<void>;

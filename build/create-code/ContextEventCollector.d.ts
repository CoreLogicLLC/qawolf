/// <reference types="node" />
import { EventEmitter } from 'events';
import { BrowserContext, Frame, Page, CDPSession } from 'playwright';
declare type FrameSelector = {
    index: number;
    selector: string;
};
declare type LastPageNavigation = {
    lastHighestEntryId: number;
    lastHistoryEntriesLength: number;
    lastHistoryIndex: number;
};
export declare const buildFrameSelector: (frame: Frame, attributes: string[]) => Promise<string>;
export declare class ContextEventCollector extends EventEmitter {
    readonly _activeSessions: Set<CDPSession>;
    readonly _attributes: string[];
    readonly _context: BrowserContext;
    readonly _frameSelectors: Map<Frame, FrameSelector>;
    readonly _pageNavigationHistory: Map<Page, LastPageNavigation>;
    static create(context: BrowserContext): Promise<ContextEventCollector>;
    protected constructor(context: BrowserContext);
    _create(): Promise<void>;
}
export {};

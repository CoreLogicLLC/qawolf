import { BrowserContext } from 'playwright';
import { CodeFileUpdater } from './CodeFileUpdater';
import { ContextEventCollector } from './ContextEventCollector';
import { PageEvent } from '../types';
declare type CreateCliOptions = {
    codePath: string;
    context: BrowserContext;
};
declare type ConstructorOptions = {
    codeUpdater: CodeFileUpdater;
    collector: ContextEventCollector;
};
export declare class CreateManager {
    static create(options: CreateCliOptions): Promise<CreateManager>;
    private _codeUpdater;
    private _collector;
    private _events;
    private _windowEvents;
    protected constructor(options: ConstructorOptions);
    protected update(event: PageEvent, isWindowEvent?: boolean): Promise<void>;
    finalize(): Promise<void>;
}
export {};

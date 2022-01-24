export declare type Action = 'click' | 'fill' | 'goBack' | 'goForward' | 'goto' | 'press' | 'reload' | 'scroll' | 'selectOption' | 'type';
export declare type BrowserName = 'chromium' | 'firefox' | 'webkit';
export declare type Callback<S = void, T = void> = (data?: S) => T;
export interface Doc {
    attrs: Record<string, string>;
    name: string;
}
export interface PageEvent {
    frameIndex?: number;
    frameSelector?: string;
    name: string;
    page: number;
    time: number;
    value?: string | ScrollValue | null;
}
export interface WindowEvent extends PageEvent {
    name: WindowEventName;
}
export declare type WindowEventName = 'goBack' | 'goForward' | 'goto' | 'reload';
export interface ElementEvent extends PageEvent {
    isTrusted: boolean;
    name: ElementEventName;
    selector: string;
    target: Doc;
}
export declare type ElementEventName = 'change' | 'click' | 'input' | 'keydown' | 'keyup' | 'mousedown' | 'paste' | 'scroll';
export interface InputEvent extends ElementEvent {
    name: 'input';
    value: string | null;
}
export interface KeyEvent extends ElementEvent {
    name: 'keydown' | 'keyup';
    value: string;
}
export interface LogEvent {
    level: string;
    message: string;
}
export interface PasteEvent extends ElementEvent {
    name: 'paste';
    value: string;
}
export interface ScrollEvent extends ElementEvent {
    name: 'scroll';
    value: ScrollValue;
}
export declare type ScrollValue = {
    x: number;
    y: number;
};
export interface Step {
    action: Action;
    event: PageEvent;
    index: number;
    value?: StepValue;
}
export declare type StepValue = string | ScrollValue | null | undefined;
export interface Workflow {
    device?: string;
    name: string;
    steps: Step[];
    url: string;
}

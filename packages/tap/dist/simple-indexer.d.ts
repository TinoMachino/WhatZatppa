import { HandlerOpts, TapHandler } from './channel';
import { IdentityEvent, RecordEvent, TapEvent } from './types';
type IdentityEventHandler = (evt: IdentityEvent, opts?: HandlerOpts) => Promise<void>;
type RecordEventHandler = (evt: RecordEvent, opts?: HandlerOpts) => Promise<void>;
type ErrorHandler = (err: Error) => void;
export declare class SimpleIndexer implements TapHandler {
    private identityHandler;
    private recordHandler;
    private errorHandler;
    identity(fn: IdentityEventHandler): this;
    record(fn: RecordEventHandler): this;
    error(fn: ErrorHandler): this;
    onEvent(evt: TapEvent, opts: HandlerOpts): Promise<void>;
    onError(err: Error): void;
}
export {};
//# sourceMappingURL=simple-indexer.d.ts.map
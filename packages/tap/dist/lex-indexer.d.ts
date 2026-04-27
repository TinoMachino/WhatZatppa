import { Infer, Main, RecordSchema } from '@atproto/lex';
import { HandlerOpts, TapHandler } from './channel';
import { IdentityEvent, RecordEvent, TapEvent } from './types';
type BaseRecordEvent = Omit<RecordEvent, 'record' | 'action' | 'cid'>;
export type CreateEvent<R> = BaseRecordEvent & {
    action: 'create';
    record: R;
    cid: string;
};
export type UpdateEvent<R> = BaseRecordEvent & {
    action: 'update';
    record: R;
    cid: string;
};
export type PutEvent<R> = CreateEvent<R> | UpdateEvent<R>;
export type DeleteEvent = BaseRecordEvent & {
    action: 'delete';
};
export type CreateHandler<R> = (evt: CreateEvent<R>, opts: HandlerOpts) => Promise<void>;
export type UpdateHandler<R> = (evt: UpdateEvent<R>, opts: HandlerOpts) => Promise<void>;
export type PutHandler<R> = (evt: PutEvent<R>, opts: HandlerOpts) => Promise<void>;
export type DeleteHandler = (evt: DeleteEvent, opts: HandlerOpts) => Promise<void>;
export type UntypedHandler = (evt: RecordEvent, opts: HandlerOpts) => Promise<void>;
export type IdentityHandler = (evt: IdentityEvent, opts: HandlerOpts) => Promise<void>;
export type ErrorHandler = (err: Error) => void;
export type RecordHandler<R> = CreateHandler<R> | UpdateHandler<R> | PutHandler<R> | DeleteHandler;
export declare class LexIndexer implements TapHandler {
    private handlers;
    private otherHandler;
    private identityHandler;
    private errorHandler;
    private handlerKey;
    private register;
    create<const T extends RecordSchema>(ns: Main<T>, handler: CreateHandler<Infer<T>>): this;
    update<const T extends RecordSchema>(ns: Main<T>, handler: UpdateHandler<Infer<T>>): this;
    delete<const T extends RecordSchema>(ns: Main<T>, handler: DeleteHandler): this;
    put<const T extends RecordSchema>(ns: Main<T>, handler: PutHandler<Infer<T>>): this;
    other(fn: UntypedHandler): this;
    identity(fn: IdentityHandler): this;
    error(fn: ErrorHandler): this;
    onEvent(evt: TapEvent, opts: HandlerOpts): Promise<void>;
    private handleRecordEvent;
    onError(err: Error): void;
}
export {};
//# sourceMappingURL=lex-indexer.d.ts.map
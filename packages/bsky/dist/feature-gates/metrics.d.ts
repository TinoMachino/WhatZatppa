type Events = {
    'experiment:viewed': {
        experimentId: string;
        variationId: string;
    };
    'feature:viewed': {
        featureId: string;
        featureResultValue: unknown;
        /** Only available if feature has experiment rules applied */
        experimentId?: string;
        /** Only available if feature has experiment rules applied */
        variationId?: string;
    };
};
export type Config = {
    trackingEndpoint?: string;
};
export declare class MetricsClient<M extends Record<string, any> = Events> {
    private config;
    maxBatchSize: number;
    private started;
    private queue;
    private flushInterval;
    constructor(config: Config);
    start(): void;
    stop(): void;
    track<E extends keyof M>(event: E, payload: M[E], metadata?: Record<string, any>): void;
    flush(): void;
    private sendBatch;
}
export {};
//# sourceMappingURL=metrics.d.ts.map
import { RequestHandler } from 'express';
import { AppContextWithKwsClient } from './types';
export declare const webhookAuth: ({ secret }: {
    secret: string;
}) => RequestHandler;
export declare const webhookHandler: (ctx: AppContextWithKwsClient) => RequestHandler;
//# sourceMappingURL=webhook.d.ts.map
import stream from 'node:stream';
import { Server } from '@atproto/xrpc-server';
import { AppContext } from '../../../../context';
export default function (server: Server, ctx: AppContext): void;
export declare const getCarStream: (ctx: AppContext, did: string, since?: string) => Promise<stream.Readable>;
//# sourceMappingURL=getRepo.d.ts.map
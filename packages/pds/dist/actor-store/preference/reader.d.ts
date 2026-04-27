import { app } from '../../lexicons/index.js';
import { ActorDb } from '../db';
import { PrefAllowedOptions } from './util';
export declare class PreferenceReader {
    db: ActorDb;
    constructor(db: ActorDb);
    getPreferences(namespace: string, opts: PrefAllowedOptions): Promise<AccountPreference[]>;
}
export type AccountPreference = app.bsky.actor.defs.Preferences[number];
export declare const prefMatchNamespace: (namespace: string, fullname: string) => boolean;
//# sourceMappingURL=reader.d.ts.map
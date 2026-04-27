import { AccountPreference, PreferenceReader } from './reader';
import { PrefAllowedOptions } from './util';
export declare class PreferenceTransactor extends PreferenceReader {
    putPreferences(values: AccountPreference[], namespace: string, opts: PrefAllowedOptions): Promise<void>;
}
//# sourceMappingURL=transactor.d.ts.map
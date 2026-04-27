import { DidString } from '@atproto/lex';
export type ParsedLabelers = {
    dids: DidString[];
    redact: Set<DidString>;
};
export declare const parseLabelerHeader: (header: string | undefined) => ParsedLabelers | null;
export declare const defaultLabelerHeader: (dids: DidString[]) => ParsedLabelers;
export declare const formatLabelerHeader: (parsed: ParsedLabelers) => string;
//# sourceMappingURL=util.d.ts.map
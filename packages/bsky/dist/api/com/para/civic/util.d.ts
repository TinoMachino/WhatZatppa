import { AppContext } from '../../../../context';
type Labelers = ReturnType<AppContext['reqLabelers']>;
export declare const getVisibleParticipantDids: (opts: {
    ctx: AppContext;
    dids: string[];
    viewer?: string;
    labelers: Labelers;
}) => Promise<Set<string>>;
export {};
//# sourceMappingURL=util.d.ts.map
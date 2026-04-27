import { AtUriString, DidString, UriString } from '@atproto/syntax';
import { DataPlaneClient } from '../data-plane/client';
import { ParsedLabelers } from '../util';
import { Label, LabelerRecord } from '../views/types.js';
import { HydrationMap, Merges, RecordInfo } from './util';
export type { Label };
export type SubjectLabels = {
    isImpersonation: boolean;
    isTakendown: boolean;
    needsReview: boolean;
    labels: HydrationMap<`${string}::${string}`, Label>;
};
export declare class Labels extends HydrationMap<UriString, SubjectLabels> implements Merges {
    static key(label: Label): `${string}::${string}`;
    merge(map: Labels): this;
    getBySubject(sub: UriString): Label[];
}
export type LabelerAgg = {
    likes: number;
};
export type LabelerAggs = HydrationMap<DidString, LabelerAgg>;
export type Labeler = RecordInfo<LabelerRecord>;
export type Labelers = HydrationMap<DidString, Labeler>;
export type LabelerViewerState = {
    like?: AtUriString;
};
export type LabelerViewerStates = HydrationMap<DidString, LabelerViewerState>;
export declare class LabelHydrator {
    dataplane: DataPlaneClient;
    constructor(dataplane: DataPlaneClient);
    getLabelsForSubjects(subjects: UriString[], labelers: ParsedLabelers): Promise<Labels>;
    getLabelers(dids: DidString[], includeTakedowns?: boolean): Promise<Labelers>;
    getLabelerViewerStates(dids: DidString[], viewer: DidString): Promise<LabelerViewerStates>;
    getLabelerAggregates(dids: DidString[], viewer: DidString | null): Promise<LabelerAggs>;
}
//# sourceMappingURL=label.d.ts.map
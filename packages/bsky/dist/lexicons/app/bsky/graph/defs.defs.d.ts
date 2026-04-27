import { l } from '@atproto/lex';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
import * as ActorDefs from '../actor/defs.defs.js';
import * as RichtextFacet from '../richtext/facet.defs.js';
import * as FeedDefs from '../feed/defs.defs.js';
declare const $nsid = "app.bsky.graph.defs";
export { $nsid };
type ListViewBasic = {
    $type?: 'app.bsky.graph.defs#listViewBasic';
    uri: l.AtUriString;
    cid: l.CidString;
    name: string;
    purpose: ListPurpose;
    avatar?: l.UriString;
    listItemCount?: number;
    labels?: LabelDefs.Label[];
    viewer?: ListViewerState;
    indexedAt?: l.DatetimeString;
};
export type { ListViewBasic };
declare const listViewBasic: l.TypedObjectSchema<"app.bsky.graph.defs#listViewBasic", l.Validator<ListViewBasic, ListViewBasic>>;
export { listViewBasic };
type ListView = {
    $type?: 'app.bsky.graph.defs#listView';
    uri: l.AtUriString;
    cid: l.CidString;
    creator: ActorDefs.ProfileView;
    name: string;
    purpose: ListPurpose;
    description?: string;
    descriptionFacets?: RichtextFacet.Main[];
    avatar?: l.UriString;
    listItemCount?: number;
    labels?: LabelDefs.Label[];
    viewer?: ListViewerState;
    indexedAt: l.DatetimeString;
};
export type { ListView };
declare const listView: l.TypedObjectSchema<"app.bsky.graph.defs#listView", l.Validator<ListView, ListView>>;
export { listView };
type ListItemView = {
    $type?: 'app.bsky.graph.defs#listItemView';
    uri: l.AtUriString;
    subject: ActorDefs.ProfileView;
};
export type { ListItemView };
declare const listItemView: l.TypedObjectSchema<"app.bsky.graph.defs#listItemView", l.Validator<ListItemView, ListItemView>>;
export { listItemView };
type StarterPackView = {
    $type?: 'app.bsky.graph.defs#starterPackView';
    uri: l.AtUriString;
    cid: l.CidString;
    record: l.LexMap;
    creator: ActorDefs.ProfileViewBasic;
    list?: ListViewBasic;
    listItemsSample?: ListItemView[];
    feeds?: FeedDefs.GeneratorView[];
    joinedWeekCount?: number;
    joinedAllTimeCount?: number;
    labels?: LabelDefs.Label[];
    indexedAt: l.DatetimeString;
};
export type { StarterPackView };
declare const starterPackView: l.TypedObjectSchema<"app.bsky.graph.defs#starterPackView", l.Validator<StarterPackView, StarterPackView>>;
export { starterPackView };
type StarterPackViewBasic = {
    $type?: 'app.bsky.graph.defs#starterPackViewBasic';
    uri: l.AtUriString;
    cid: l.CidString;
    record: l.LexMap;
    creator: ActorDefs.ProfileViewBasic;
    listItemCount?: number;
    joinedWeekCount?: number;
    joinedAllTimeCount?: number;
    labels?: LabelDefs.Label[];
    indexedAt: l.DatetimeString;
};
export type { StarterPackViewBasic };
declare const starterPackViewBasic: l.TypedObjectSchema<"app.bsky.graph.defs#starterPackViewBasic", l.Validator<StarterPackViewBasic, StarterPackViewBasic>>;
export { starterPackViewBasic };
type ListPurpose = 'app.bsky.graph.defs#modlist' | 'app.bsky.graph.defs#curatelist' | 'app.bsky.graph.defs#referencelist' | l.UnknownString;
export type { ListPurpose };
declare const listPurpose: l.StringSchema<{
    knownValues: ["app.bsky.graph.defs#modlist", "app.bsky.graph.defs#curatelist", "app.bsky.graph.defs#referencelist"];
}>;
export { listPurpose };
/** A list of actors to apply an aggregate moderation action (mute/block) on. */
type Modlist = 'app.bsky.graph.defs#modlist';
export type { Modlist };
/** A list of actors to apply an aggregate moderation action (mute/block) on. */
declare const modlist: l.TokenSchema<"app.bsky.graph.defs#modlist">;
export { modlist };
/** A list of actors used for curation purposes such as list feeds or interaction gating. */
type Curatelist = 'app.bsky.graph.defs#curatelist';
export type { Curatelist };
/** A list of actors used for curation purposes such as list feeds or interaction gating. */
declare const curatelist: l.TokenSchema<"app.bsky.graph.defs#curatelist">;
export { curatelist };
/** A list of actors used for only for reference purposes such as within a starter pack. */
type Referencelist = 'app.bsky.graph.defs#referencelist';
export type { Referencelist };
/** A list of actors used for only for reference purposes such as within a starter pack. */
declare const referencelist: l.TokenSchema<"app.bsky.graph.defs#referencelist">;
export { referencelist };
type ListViewerState = {
    $type?: 'app.bsky.graph.defs#listViewerState';
    muted?: boolean;
    blocked?: l.AtUriString;
};
export type { ListViewerState };
declare const listViewerState: l.TypedObjectSchema<"app.bsky.graph.defs#listViewerState", l.Validator<ListViewerState, ListViewerState>>;
export { listViewerState };
/** indicates that a handle or DID could not be resolved */
type NotFoundActor = {
    $type?: 'app.bsky.graph.defs#notFoundActor';
    actor: l.AtIdentifierString;
    notFound: true;
};
export type { NotFoundActor };
/** indicates that a handle or DID could not be resolved */
declare const notFoundActor: l.TypedObjectSchema<"app.bsky.graph.defs#notFoundActor", l.Validator<NotFoundActor, NotFoundActor>>;
export { notFoundActor };
/** lists the bi-directional graph relationships between one actor (not indicated in the object), and the target actors (the DID included in the object) */
type Relationship = {
    $type?: 'app.bsky.graph.defs#relationship';
    did: l.DidString;
    /**
     * if the actor follows this DID, this is the AT-URI of the follow record
     */
    following?: l.AtUriString;
    /**
     * if the actor is followed by this DID, contains the AT-URI of the follow record
     */
    followedBy?: l.AtUriString;
    /**
     * if the actor blocks this DID, this is the AT-URI of the block record
     */
    blocking?: l.AtUriString;
    /**
     * if the actor is blocked by this DID, contains the AT-URI of the block record
     */
    blockedBy?: l.AtUriString;
    /**
     * if the actor blocks this DID via a block list, this is the AT-URI of the listblock record
     */
    blockingByList?: l.AtUriString;
    /**
     * if the actor is blocked by this DID via a block list, contains the AT-URI of the listblock record
     */
    blockedByList?: l.AtUriString;
};
export type { Relationship };
/** lists the bi-directional graph relationships between one actor (not indicated in the object), and the target actors (the DID included in the object) */
declare const relationship: l.TypedObjectSchema<"app.bsky.graph.defs#relationship", l.Validator<Relationship, Relationship>>;
export { relationship };
//# sourceMappingURL=defs.defs.d.ts.map
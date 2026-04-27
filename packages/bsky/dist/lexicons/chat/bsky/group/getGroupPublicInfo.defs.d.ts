import { l } from '@atproto/lex';
import * as GroupDefs from './defs.defs.js';
declare const $nsid = "chat.bsky.group.getGroupPublicInfo";
export { $nsid };
/** [NOTE: This is under active development and should be considered unstable while this note is here]. Get public information about a group from an join link. */
declare const main: l.Query<"chat.bsky.group.getGroupPublicInfo", l.ParamsSchema<{
    readonly code: l.StringSchema<{}>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    group: l.RefSchema<l.Validator<GroupDefs.GroupPublicView, GroupDefs.GroupPublicView>>;
}>>, readonly ["InvalidCode"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.group.getGroupPublicInfo", $params: l.ParamsSchema<{
    readonly code: l.StringSchema<{}>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    group: l.RefSchema<l.Validator<GroupDefs.GroupPublicView, GroupDefs.GroupPublicView>>;
}>>;
//# sourceMappingURL=getGroupPublicInfo.defs.d.ts.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelHydrator = exports.Labels = void 0;
const syntax_1 = require("@atproto/syntax");
const index_js_1 = require("../lexicons/index.js");
const util_1 = require("./util");
class Labels extends util_1.HydrationMap {
    static key(label) {
        return `${label.src}::${label.val}`;
    }
    merge(map) {
        for (const [key, theirs] of map) {
            if (!theirs)
                continue;
            const mine = this.get(key);
            if (mine) {
                mine.isTakendown = mine.isTakendown || theirs.isTakendown;
                mine.labels = mine.labels.merge(theirs.labels);
            }
            else {
                this.set(key, theirs);
            }
        }
        return this;
    }
    getBySubject(sub) {
        const it = this.get(sub)?.labels.values();
        if (!it)
            return [];
        const labels = [];
        for (const label of it) {
            if (label)
                labels.push(label);
        }
        return labels;
    }
}
exports.Labels = Labels;
class LabelHydrator {
    constructor(dataplane) {
        Object.defineProperty(this, "dataplane", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: dataplane
        });
    }
    async getLabelsForSubjects(subjects, labelers) {
        const map = new Labels();
        if (!subjects.length || !labelers.dids.length)
            return map;
        const res = await this.dataplane.getLabels({
            subjects,
            issuers: labelers.dids,
        });
        for (const cur of res.labels) {
            const parsed = (0, util_1.parseJsonBytes)(index_js_1.com.atproto.label.defs.label, cur);
            if (!parsed || parsed.neg)
                continue;
            const { sig: _, ...label } = parsed;
            let entry = map.get(label.uri);
            if (!entry) {
                entry = {
                    isImpersonation: false,
                    isTakendown: false,
                    needsReview: false,
                    labels: new util_1.HydrationMap(),
                };
                map.set(label.uri, entry);
            }
            const isActionableNeedsReview = label.val === NEEDS_REVIEW_LABEL &&
                !label.neg &&
                labelers.redact.has(label.src);
            // we action needs review labels on backend for now so don't send to client until client has proper logic for them
            if (!isActionableNeedsReview) {
                entry.labels.set(Labels.key(label), label);
            }
            if (TAKEDOWN_LABELS.includes(label.val) &&
                !label.neg &&
                labelers.redact.has(label.src)) {
                entry.isTakendown = true;
            }
            if (isActionableNeedsReview) {
                entry.needsReview = true;
            }
            if (label.val === IMPERSONATION_LABEL &&
                !label.neg &&
                labelers.redact.has(label.src)) {
                entry.isImpersonation = true;
            }
        }
        return map;
    }
    async getLabelers(dids, includeTakedowns = false) {
        const map = new util_1.HydrationMap();
        if (!dids.length)
            return map;
        const res = await this.dataplane.getLabelerRecords({
            uris: dids.map(labelerDidToUri),
        });
        for (let i = 0; i < dids.length; i++) {
            const did = dids[i];
            const record = (0, util_1.parseRecord)(index_js_1.app.bsky.labeler.service.main, res.records[i], includeTakedowns);
            map.set(did, record ?? null);
        }
        return map;
    }
    async getLabelerViewerStates(dids, viewer) {
        const map = new util_1.HydrationMap();
        if (!dids.length)
            return map;
        const likes = await this.dataplane.getLikesByActorAndSubjects({
            actorDid: viewer,
            refs: dids.map((did) => ({ uri: labelerDidToUri(did) })),
        });
        for (let i = 0; i < dids.length; i++) {
            const did = dids[i];
            map.set(did, {
                like: (0, util_1.parseString)(likes.uris[i]),
            });
        }
        return map;
    }
    async getLabelerAggregates(dids, viewer) {
        const map = new util_1.HydrationMap();
        if (!dids.length)
            return map;
        const refs = dids.map((did) => ({ uri: labelerDidToUri(did) }));
        const counts = await this.dataplane.getInteractionCounts({
            refs,
            skipCacheForDids: viewer ? [viewer] : undefined,
        });
        for (let i = 0; i < dids.length; i++) {
            const did = dids[i];
            map.set(did, {
                likes: counts.likes[i] ?? 0,
            });
        }
        return map;
    }
}
exports.LabelHydrator = LabelHydrator;
const labelerDidToUri = (did) => {
    return syntax_1.AtUri.make(did, index_js_1.app.bsky.labeler.service.$type, 'self').toString();
};
const IMPERSONATION_LABEL = 'impersonation';
const TAKEDOWN_LABELS = ['!takedown', '!suspend'];
const NEEDS_REVIEW_LABEL = 'needs-review';
//# sourceMappingURL=label.js.map
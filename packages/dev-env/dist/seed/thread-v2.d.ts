import { TestNetwork } from '../network';
import { RecordRef, SeedClient } from './client';
type User = {
    id: string;
    did: string;
    email: string;
    handle: string;
    password: string;
    displayName: string;
    description: string;
    selfLabels: undefined;
};
export declare const TAG_BUMP_DOWN = "down";
export declare const TAG_HIDE = "hide";
export declare function simple(sc: SeedClient<TestNetwork>, prefix?: string): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"alice" | "bob" | "carol" | "op", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function long(sc: SeedClient<TestNetwork>): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"alice" | "bob" | "carol" | "dan" | "op", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function deep(sc: SeedClient<TestNetwork>): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"op", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function branchingFactor(sc: SeedClient<TestNetwork>): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"bob" | "op", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function annotateMoreReplies(sc: SeedClient<TestNetwork>): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"alice" | "op", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function annotateOP(sc: SeedClient<TestNetwork>): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"alice" | "bob" | "op", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function sort(sc: SeedClient<TestNetwork>): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"alice" | "bob" | "carol" | "op", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function bumpOpAndViewer(sc: SeedClient<TestNetwork>): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"alice" | "bob" | "carol" | "op" | "viewer", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function bumpGroupSorting(sc: SeedClient<TestNetwork>): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"alice" | "op" | "viewer", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function bumpFollows(sc: SeedClient<TestNetwork>): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"alice" | "bob" | "carol" | "op" | "viewerF" | "viewerNoF", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function blockDeletionAuth(sc: SeedClient<TestNetwork>, labelerDid: string): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"alice" | "op" | "opBlocked" | "auth" | "blocker" | "blocked", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function mutes(sc: SeedClient<TestNetwork>): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"alice" | "op" | "opMuted" | "muted" | "muter", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function threadgated(sc: SeedClient<TestNetwork>): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"alice" | "bob" | "op" | "viewer" | "opMuted", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export declare function tags(sc: SeedClient<TestNetwork>): Promise<{
    seedClient: SeedClient<TestNetwork>;
    users: Record<"hide" | "alice" | "following" | "down" | "op" | "viewer", User>;
    root: {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
        quote: RecordRef | undefined;
    };
    r: Record<string, {
        text: string;
        ref: RecordRef;
        images: import("./client").ImageRef[];
    }>;
}>;
export {};
//# sourceMappingURL=thread-v2.d.ts.map
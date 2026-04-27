export type QueryParams = {
    post: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    uri: string;
    postType?: 'policy' | 'matter' | 'meme';
    official?: boolean;
    party?: string;
    community?: string;
    category?: string;
    tags?: string[];
    flairs?: string[];
    voteScore: number;
    interactionMode: 'policy_ballot' | 'reddit_votes';
    createdAt?: string;
}
export type HandlerInput = void;
export interface HandlerSuccess {
    encoding: 'application/json';
    body: OutputSchema;
    headers?: {
        [key: string]: string;
    };
}
export interface HandlerError {
    status: number;
    message?: string;
    error?: 'NotFound';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getPostMeta.d.ts.map
export type SentimentResult = {
    label: 'anger' | 'fear' | 'trust' | 'uncertainty' | 'neutral';
    score: number;
    comparative: number;
};
export declare function analyzeDiscourse(text: string): {
    sentiment: SentimentResult;
    keywords: string[];
    constructiveness: number;
};
//# sourceMappingURL=discourse-nlp.d.ts.map
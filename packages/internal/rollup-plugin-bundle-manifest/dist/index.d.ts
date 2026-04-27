import type { Plugin } from 'rollup';
type AssetItem = {
    type: 'asset';
    mime?: string;
    sha256: string;
    data?: string;
};
type ChunkItem = {
    type: 'chunk';
    mime: string;
    sha256: string;
    dynamicImports: string[];
    isDynamicEntry: boolean;
    isEntry: boolean;
    isImplicitEntry: boolean;
    name: string;
    data?: string;
};
export type ManifestItem = AssetItem | ChunkItem;
export type Manifest = Record<string, ManifestItem>;
export declare function bundleManifest({ name, data, }?: {
    name?: string;
    data?: boolean;
}): Plugin<never>;
export {};
//# sourceMappingURL=index.d.ts.map
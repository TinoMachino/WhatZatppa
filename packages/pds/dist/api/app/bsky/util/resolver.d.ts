import { AppContext } from '../../../../context';
export declare const getDidDoc: (ctx: AppContext, did: string) => Promise<{
    id: string;
    '@context'?: string[] | "https://www.w3.org/ns/did/v1" | undefined;
    alsoKnownAs?: string[] | undefined;
    verificationMethod?: {
        type: string;
        id: string;
        controller: string;
        publicKeyJwk?: Record<string, unknown> | undefined;
        publicKeyMultibase?: string | undefined;
    }[] | undefined;
    authentication?: (string | {
        type: string;
        id: string;
        controller: string;
        publicKeyJwk?: Record<string, unknown> | undefined;
        publicKeyMultibase?: string | undefined;
    })[] | undefined;
    service?: {
        type: string;
        id: string;
        serviceEndpoint: string | Record<string, unknown>;
    }[] | undefined;
}>;
//# sourceMappingURL=resolver.d.ts.map
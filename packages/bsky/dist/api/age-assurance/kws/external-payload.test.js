"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const external_payload_1 = require("./external-payload");
(0, globals_1.describe)('parseKWSExternalPayloadVersion', () => {
    (0, globals_1.it)('should return V2 for "2"', () => {
        const result = (0, external_payload_1.parseKWSExternalPayloadVersion)('2');
        (0, globals_1.expect)(result).toBe('2');
    });
    (0, globals_1.it)('should return V1 for unknown versions', () => {
        const result = (0, external_payload_1.parseKWSExternalPayloadVersion)('unknown');
        (0, globals_1.expect)(result).toBe('1');
    });
});
(0, globals_1.describe)('parseKWSExternalPayloadV1WithV2Compat', () => {
    (0, globals_1.it)('should parse V1 payload correctly', () => {
        const payload = {
            attemptId: '123',
            actorDid: 'did:plc:123',
        };
        const serialized = (0, external_payload_1.serializeKWSExternalPayloadV1)(payload);
        const result = (0, external_payload_1.parseKWSExternalPayloadV1WithV2Compat)(serialized);
        (0, globals_1.expect)(result).toEqual({
            version: external_payload_1.KWSExternalPayloadVersion.V1,
            ...payload,
        });
    });
    (0, globals_1.it)('should parse V2 payload correctly', () => {
        const payload = {
            version: external_payload_1.KWSExternalPayloadVersion.V2,
            attemptId: '123',
            actorDid: 'did:plc:123',
            countryCode: 'US',
        };
        const serialized = (0, external_payload_1.serializeKWSExternalPayloadV2)(payload);
        const result = (0, external_payload_1.parseKWSExternalPayloadV1WithV2Compat)(serialized);
        (0, globals_1.expect)(result).toEqual(payload);
    });
});
(0, globals_1.describe)('serializeKWSExternalPayloadV2 & parseKWSExternalPayloadV2', () => {
    const payload = {
        version: external_payload_1.KWSExternalPayloadVersion.V2,
        attemptId: '123',
        actorDid: 'did:plc:123',
        countryCode: 'US',
        regionCode: 'CA',
    };
    (0, globals_1.it)('compresses when serializing', () => {
        const serialized = (0, external_payload_1.serializeKWSExternalPayloadV2)(payload);
        const comparison = JSON.stringify({
            v: external_payload_1.KWSExternalPayloadVersion.V2,
            id: payload.attemptId,
            did: payload.actorDid,
            gc: payload.countryCode,
            gr: payload.regionCode,
        });
        (0, globals_1.expect)(serialized).toEqual(comparison);
    });
    (0, globals_1.it)('decompresses when parsing', () => {
        const serialized = (0, external_payload_1.serializeKWSExternalPayloadV2)(payload);
        const deserialized = (0, external_payload_1.parseKWSExternalPayloadV2)(serialized);
        (0, globals_1.expect)(deserialized).toEqual(payload);
    });
});
//# sourceMappingURL=external-payload.test.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="jest" />
const utils_1 = require("./utils");
describe('normalizeUserContext', () => {
    it('defaults', () => {
        const ctx = (0, utils_1.normalizeUserContext)({});
        expect(ctx.did).toBeUndefined();
        expect(ctx.deviceId).toMatch(/^anon-/);
        expect(ctx.sessionId).toMatch(/^anon-/);
    });
    it('with did', () => {
        const ctx = (0, utils_1.normalizeUserContext)({
            did: 'did:example:123',
        });
        expect(ctx.did).toBe('did:example:123');
        expect(ctx.deviceId).toBe('did:example:123');
        expect(ctx.sessionId).toMatch(/^anon-/);
    });
    it('with did and deviceId', () => {
        const ctx = (0, utils_1.normalizeUserContext)({
            did: 'did:example:123',
            deviceId: 'device-456',
        });
        expect(ctx.did).toBe('did:example:123');
        expect(ctx.deviceId).toBe('device-456');
        expect(ctx.sessionId).toMatch(/^anon-/);
    });
    it('with only deviceId and sessionId', () => {
        const ctx = (0, utils_1.normalizeUserContext)({
            deviceId: 'device-456',
            sessionId: 'session-789',
        });
        expect(ctx.did).toBeUndefined();
        expect(ctx.deviceId).toBe('device-456');
        expect(ctx.sessionId).toBe('session-789');
    });
});
describe('mergeUserContexts', () => {
    it('anonymous base context, override with did', () => {
        const base = (0, utils_1.normalizeUserContext)({});
        const merged = (0, utils_1.mergeUserContexts)(base, { did: 'did:example:123' });
        expect(merged.did).toBe('did:example:123');
        expect(merged.deviceId).toBe('did:example:123');
        expect(merged.sessionId).toBe(base.sessionId);
    });
    it('base context with did, override with different did', () => {
        const base = (0, utils_1.normalizeUserContext)({ did: 'did:example:123' });
        const merged = (0, utils_1.mergeUserContexts)(base, { did: 'did:example:456' });
        expect(merged.did).toBe('did:example:456');
        expect(merged.deviceId).toBe('did:example:456');
        expect(merged.sessionId).toMatch(/^anon-/);
    });
    it('base context with did, override with same did', () => {
        const base = (0, utils_1.normalizeUserContext)({ did: 'did:example:123' });
        const merged = (0, utils_1.mergeUserContexts)(base, { did: 'did:example:123' });
        expect(merged.did).toBe('did:example:123');
        expect(merged.deviceId).toBe('did:example:123');
        expect(merged.sessionId).toBe(base.sessionId);
    });
});
//# sourceMappingURL=utils.test.js.map
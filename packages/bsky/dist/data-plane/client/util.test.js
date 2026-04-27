"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="jest" />
const util_1 = require("./util");
describe('callerInterceptor', () => {
    it('sets x-atlantis-caller header on the request', async () => {
        const interceptor = (0, util_1.callerInterceptor)('appview');
        const expectedResponse = { status: 'ok' };
        const next = jest.fn().mockResolvedValue(expectedResponse);
        const req = { header: new Headers() };
        const handler = interceptor(next);
        const res = await handler(req);
        expect(req.header.get('x-atlantis-caller')).toBe('appview');
        expect(next).toHaveBeenCalledWith(req);
        expect(res).toBe(expectedResponse);
    });
    it('uses the provided caller value', async () => {
        const interceptor = (0, util_1.callerInterceptor)('feed-generator');
        const next = jest.fn().mockResolvedValue({});
        const req = { header: new Headers() };
        await interceptor(next)(req);
        expect(req.header.get('x-atlantis-caller')).toBe('feed-generator');
    });
    it('does not overwrite other existing headers', async () => {
        const interceptor = (0, util_1.callerInterceptor)('appview');
        const next = jest.fn().mockResolvedValue({});
        const req = { header: new Headers({ 'x-other': 'value' }) };
        await interceptor(next)(req);
        expect(req.header.get('x-atlantis-caller')).toBe('appview');
        expect(req.header.get('x-other')).toBe('value');
    });
});
//# sourceMappingURL=util.test.js.map
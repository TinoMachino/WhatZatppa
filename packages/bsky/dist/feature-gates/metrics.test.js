"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="jest" />
const logger_1 = require("../logger");
const metrics_1 = require("./metrics");
jest.mock('../logger', () => ({
    featureGatesLogger: {
        error: jest.fn(),
    },
}));
// Helper to flush promises and timers
const flushPromises = () => new Promise((r) => setImmediate(r));
describe('MetricsClient', () => {
    let fetchMock;
    let fetchRequests;
    let client;
    beforeEach(() => {
        jest.useFakeTimers({ doNotFake: ['setImmediate', 'performance'] });
        fetchRequests = [];
        fetchMock = jest.fn().mockImplementation(async (_url, options) => {
            const body = JSON.parse(options.body);
            fetchRequests.push({ body });
            return { ok: true, status: 200, text: async () => '' };
        });
        global.fetch = fetchMock;
    });
    afterEach(() => {
        client?.stop();
        jest.useRealTimers();
        jest.clearAllMocks();
    });
    it('flushes events on interval', async () => {
        client = new metrics_1.MetricsClient({
            trackingEndpoint: 'https://test.metrics.api',
        });
        client.track('click', { button: 'submit' });
        client.track('view', { screen: 'home' });
        expect(fetchRequests).toHaveLength(0);
        // Advance past the 10 second interval
        jest.advanceTimersByTime(10000);
        await flushPromises();
        expect(fetchRequests).toHaveLength(1);
        expect(fetchRequests[0].body.events).toHaveLength(2);
        expect(fetchRequests[0].body.events[0].event).toBe('click');
        expect(fetchRequests[0].body.events[1].event).toBe('view');
    });
    it('flushes when maxBatchSize is exceeded', async () => {
        client = new metrics_1.MetricsClient({
            trackingEndpoint: 'https://test.metrics.api',
        });
        client.maxBatchSize = 5;
        // Add events up to maxBatchSize (should not flush yet)
        for (let i = 0; i < 5; i++) {
            client.track('click', { button: `btn-${i}` });
        }
        expect(fetchRequests).toHaveLength(0);
        // One more event should trigger flush (> maxBatchSize)
        client.track('click', { button: 'btn-trigger' });
        await flushPromises();
        expect(fetchRequests).toHaveLength(1);
        expect(fetchRequests[0].body.events).toHaveLength(6);
    });
    it('logs error on failed request', async () => {
        fetchMock.mockImplementation(async () => {
            return {
                ok: false,
                status: 500,
                text: async () => 'Internal Server Error',
            };
        });
        client = new metrics_1.MetricsClient({
            trackingEndpoint: 'https://test.metrics.api',
        });
        client.track('click', { button: 'submit' });
        // Trigger flush via interval
        jest.advanceTimersByTime(10000);
        await flushPromises();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(logger_1.featureGatesLogger.error).toHaveBeenCalledWith(expect.objectContaining({
            err: expect.any(Error),
        }), 'Failed to send metrics');
    });
    it('handles fetch text() error gracefully', async () => {
        fetchMock.mockImplementation(async () => {
            return {
                ok: false,
                status: 500,
                text: async () => {
                    throw new Error('Failed to read response');
                },
            };
        });
        client = new metrics_1.MetricsClient({
            trackingEndpoint: 'https://test.metrics.api',
        });
        client.track('click', { button: 'submit' });
        // Trigger flush - should not throw
        jest.advanceTimersByTime(10000);
        await flushPromises();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(logger_1.featureGatesLogger.error).toHaveBeenCalledWith(expect.objectContaining({
            err: expect.objectContaining({
                message: expect.stringContaining('Unknown error'),
            }),
        }), 'Failed to send metrics');
    });
    it('flushes when stop() is called', async () => {
        client = new metrics_1.MetricsClient({
            trackingEndpoint: 'https://test.metrics.api',
        });
        client.track('click', { button: 'submit' });
        expect(fetchRequests).toHaveLength(0);
        // Stop should flush remaining events
        client.stop();
        await flushPromises();
        expect(fetchRequests).toHaveLength(1);
        expect(fetchRequests[0].body.events).toHaveLength(1);
        expect(fetchRequests[0].body.events[0].event).toBe('click');
    });
    it('does not send if trackingEndpoint is not configured', async () => {
        client = new metrics_1.MetricsClient({});
        client.track('click', { button: 'submit' });
        // Trigger flush via interval
        jest.advanceTimersByTime(10000);
        await flushPromises();
        expect(fetchMock).not.toHaveBeenCalled();
    });
    it('start() is idempotent', async () => {
        client = new metrics_1.MetricsClient({
            trackingEndpoint: 'https://test.metrics.api',
        });
        // track() calls start() internally
        client.track('click', { button: 'submit' });
        client.start();
        client.start();
        // Advance past interval - should only flush once
        jest.advanceTimersByTime(10000);
        await flushPromises();
        expect(fetchRequests).toHaveLength(1);
    });
    it('does not flush if queue is empty', async () => {
        client = new metrics_1.MetricsClient({
            trackingEndpoint: 'https://test.metrics.api',
        });
        client.start();
        // Advance past interval with empty queue
        jest.advanceTimersByTime(10000);
        await flushPromises();
        expect(fetchMock).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=metrics.test.js.map
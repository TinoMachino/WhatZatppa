var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
import { openAuthSessionAsync } from 'expo-web-browser';
import { OAuthClient, } from '@atproto/oauth-client';
import { default as NativeModule } from './ExpoAtprotoOAuthClientModule';
import { ExpoKey } from './utils/expo-key';
import { AuthorizationServerMetadataCache, DidCache, DpopNonceCache, HandleCache, ProtectedResourceMetadataCache, SessionStore, StateStore, } from './utils/stores';
export const CUSTOM_URI_SCHEME_REGEX = /^(?:[^.]+(?:\.[^.]+)+):\/(?:[^/].*)?$/;
const isCustomUriScheme = (uri) => CUSTOM_URI_SCHEME_REGEX.test(uri);
const runtimeImplementation = {
    createKey: async (algs) => ExpoKey.generate(algs),
    digest: async (bytes, { name }) => NativeModule.digest(bytes, name),
    getRandomValues: async (length) => NativeModule.getRandomValues(length),
};
export class ExpoOAuthClient extends OAuthClient {
    #disposables;
    constructor(options) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            const stack = __addDisposableResource(env_1, new DisposableStack(), false);
            super({
                ...options,
                responseMode: options.responseMode ?? 'query',
                keyset: undefined,
                runtimeImplementation,
                sessionStore: stack.use(new SessionStore()),
                stateStore: stack.use(new StateStore()),
                didCache: stack.use(new DidCache()),
                handleCache: stack.use(new HandleCache()),
                dpopNonceCache: stack.use(new DpopNonceCache()),
                authorizationServerMetadataCache: stack.use(new AuthorizationServerMetadataCache()),
                protectedResourceMetadataCache: stack.use(new ProtectedResourceMetadataCache()),
            });
            this.#disposables = stack.move();
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            __disposeResources(env_1);
        }
    }
    async handleCallback() {
        return null;
    }
    async signIn(input, options) {
        const redirectUri = options?.redirect_uri ??
            this.clientMetadata.redirect_uris.find(isCustomUriScheme);
        if (!redirectUri) {
            throw new TypeError('A redirect URI with a custom scheme is required for Expo OAuth.');
        }
        const url = await this.authorize(input, {
            ...options,
            redirect_uri: redirectUri,
            display: options?.display ?? 'touch',
        });
        const result = await openAuthSessionAsync(url.toString(), redirectUri, {
            dismissButtonStyle: 'cancel', // iOS only
            preferEphemeralSession: false, // iOS only
        });
        if (result.type === 'success') {
            const callbackUrl = new URL(result.url);
            const params = this.responseMode === 'fragment'
                ? new URLSearchParams(callbackUrl.hash.slice(1))
                : callbackUrl.searchParams;
            const { session } = await this.callback(params, {
                redirect_uri: redirectUri,
            });
            return session;
        }
        else {
            throw new Error(`Authentication cancelled: ${result.type}`);
        }
    }
    async [Symbol.asyncDispose]() {
        this.#disposables.dispose();
    }
}
//# sourceMappingURL=expo-oauth-client.native.js.map
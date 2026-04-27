"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authWithApiKey = exports.isRolodexError = exports.Code = exports.createRolodexClient = void 0;
const connect_1 = require("@connectrpc/connect");
Object.defineProperty(exports, "Code", { enumerable: true, get: function () { return connect_1.Code; } });
const connect_node_1 = require("@connectrpc/connect-node");
const rolodex_connect_1 = require("./proto/rolodex_connect");
const createRolodexClient = (opts) => {
    const transport = (0, connect_node_1.createConnectTransport)(opts);
    return (0, connect_1.createPromiseClient)(rolodex_connect_1.RolodexService, transport);
};
exports.createRolodexClient = createRolodexClient;
const isRolodexError = (err, code) => {
    if (err instanceof connect_1.ConnectError) {
        return !code || err.code === code;
    }
    return false;
};
exports.isRolodexError = isRolodexError;
const authWithApiKey = (apiKey) => (next) => (req) => {
    req.header.set('authorization', `Bearer ${apiKey}`);
    return next(req);
};
exports.authWithApiKey = authWithApiKey;
//# sourceMappingURL=rolodex.js.map
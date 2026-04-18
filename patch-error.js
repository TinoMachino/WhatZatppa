const fs = require('fs');
const filepath = 'watx/packages/xrpc-server/src/server.ts';
let content = fs.readFileSync(filepath, 'utf8');
content = content.replace(
  "httpLogger.error({ err }, 'xrpc server error')",
  "httpLogger.error({ err }, 'xrpc server error'); console.error('====== XRPC ERROR ======', err, err?.stack);"
);
fs.writeFileSync(filepath, content);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_zlib_1 = require("node:zlib");
const connect_1 = require("@connectrpc/connect");
const MOCK_SITEMAP_INDEX = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://bsky.app/sitemap/users/2025-01-01/1.xml.gz</loc>
  </sitemap>
</sitemapindex>`;
const MOCK_SITEMAP_PAGE = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bsky.app/profile/test.bsky.social</loc>
  </url>
</urlset>`;
exports.default = () => ({
    async getSitemapIndex() {
        return {
            sitemap: (0, node_zlib_1.gzipSync)(Buffer.from(MOCK_SITEMAP_INDEX)),
        };
    },
    async getSitemapPage(req) {
        const date = req.date?.toDate();
        const isExpectedDate = date &&
            date.getFullYear() === 2025 &&
            date.getMonth() === 0 &&
            date.getDate() === 1;
        const isExpectedBucket = req.bucket === 1;
        if (!isExpectedDate || !isExpectedBucket) {
            throw new connect_1.ConnectError('Sitemap page not found', connect_1.Code.NotFound);
        }
        return {
            sitemap: (0, node_zlib_1.gzipSync)(Buffer.from(MOCK_SITEMAP_PAGE)),
        };
    },
});
//# sourceMappingURL=sitemap.js.map
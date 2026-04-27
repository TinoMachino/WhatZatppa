"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFormRedirect = writeFormRedirect;
const index_js_1 = require("./html/index.js");
const request_js_1 = require("./http/request.js");
const write_html_js_1 = require("./write-html.js");
// We prevent the user from coming "back" to this page and resubmitting the form
// repeatedly by disabling the submit button after the first submission.
const SCRIPT = (0, index_js_1.js) `
const form = document.forms[0];

let canSubmit = true;

form.addEventListener('submit', (event) => {
  if (!canSubmit) {
    event.preventDefault();
  } else {
    canSubmit = false;
  }
});

setTimeout(() => {
  form.submit();
}, 1);
`;
// @NOTE If translations and design are needed, consider replacing this with a
// web app page.
function writeFormRedirect(res, method, uri, params, options) {
    res.setHeader('Cache-Control', 'no-store');
    // Prevent the Chrome from caching this page
    // see: https://latesthackingnews.com/2023/12/12/google-updates-chrome-bfcache-for-faster-page-viewing/
    (0, request_js_1.setCookie)(res, 'bfCacheBypass', 'foo', { maxAge: 1, sameSite: 'lax' });
    return (0, write_html_js_1.writeHtml)(res, {
        ...options,
        htmlAttrs: { lang: 'en' },
        scripts: [SCRIPT],
        body: (0, index_js_1.html) `
      <form method="${method}" action="${uri}">
        ${Array.from(params, ([key, value]) => [
            (0, index_js_1.html) `<input type="hidden" name="${key}" value="${value}" />`,
        ])}
        <input type="submit" value="Continue" />
      </form>
    `,
    });
}
//# sourceMappingURL=write-form-redirect.js.map
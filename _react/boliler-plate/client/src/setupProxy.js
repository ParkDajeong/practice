// Proxy 관련
// https://ljh86029926.gitbook.io/coding-apple-react/undefined-1/cra
// https://www.youtube.com/watch?v=6fDWf4xilaY&feature=emb_title

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};

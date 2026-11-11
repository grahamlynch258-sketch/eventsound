const { join } = require("path");

// Keep the downloaded browser inside node_modules so Netlify's dependency
// cache carries it between builds (the default is ~/.cache, which is not cached).
module.exports = {
  cacheDirectory: join(__dirname, "node_modules", ".cache", "puppeteer"),
};

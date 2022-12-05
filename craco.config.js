const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@components": path.join(path.resolve(__dirname, "./src/components")),
      "@pages": path.join(path.resolve(__dirname, "./src/pages")),
      "@proptypes": path.join(path.resolve(__dirname, "./src/propTypes")),
      "@images": path.join(path.resolve(__dirname, "./src/img")),
      "@axios": path.join(path.resolve(__dirname, "./src/axios")),
      "@redux": path.join(path.resolve(__dirname, "./src/redux")),
    },
  },
};

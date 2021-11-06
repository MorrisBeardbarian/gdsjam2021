const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public", "js"),
    filename: "main.js",
  },
  mode: process.env.APP_ENV === "production" ? "production" : "development",
};

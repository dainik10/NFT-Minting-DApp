const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js", // Replace with the entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Replace with the output directory for your bundled files
    filename: "bundle.js", // Replace with the desired name for the bundled file
  },
  plugins: [new Dotenv()],
  // Add other Webpack configurations as needed
};

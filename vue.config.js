module.exports = {
  devServer: {
    proxy: {
      "/index.php": {
        target: "http://121.41.95.148",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/index.php": "/index.php"
        }
      }
    }
  }
};

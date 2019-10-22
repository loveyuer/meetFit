module.exports = {
  devServer: {
    proxy: {
      "/admin": {
        target: "http://121.41.95.148",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/admin": "/index.php/admin"
        }
      }
    }
  }
};

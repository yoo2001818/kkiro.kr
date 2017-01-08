module.exports = {
  assets: {
    images: {
      extensions: ['png', 'jpg', 'jpeg', 'gif', 'tiff']
    },
    fonts: {
      extensions: ['otf', 'eot', 'svg', 'ttf', 'woff', 'woff2']
    },
    css: {
      extensions: ['css', 'scss', 'sass'],
      parser: function() {
        return '';
      }
    }
  }
};

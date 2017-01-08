module.exports = {
  assets: {
    images: {
      extensions: ['png', 'jpg', 'jpeg', 'gif', 'tiff'],
      path: function (module) {
        return module.name.replace(/(^|!)\.\/src/g, './lib');
      }
    },
    fonts: {
      extensions: ['otf', 'eot', 'svg', 'ttf', 'woff', 'woff2'],
      path: function (module) {
        return module.name.replace(/(^|!)\.\/src/g, './lib');
      }
    },
    css: {
      extensions: ['css', 'scss', 'sass'],
      parser: function() {
        return '';
      },
      path: function (module) {
        return module.name.replace(/(^|!)\.\/src/g, './lib');
      }
    }
  }
};

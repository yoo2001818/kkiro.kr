var path = require('path');

module.exports = {
  site: {
    title: 'kkiro.kr',
    subtitle: 'A blog',
    rights: '(c) Kkiro. All rights reserved.',
    // This is specified in Atom format.
    author: {
      name: 'Kkiro',
      uri: 'http://kkiro.kr',
      email: 'yoo2001818@gmail.com'
    },
    icon: 'http://kkiro.kr/favicon.ico',
    id: 'http://kkiro.kr/',
    link: {
      href: 'http://kkiro.kr/'
    }
  },
  source: path.resolve(__dirname, 'posts'),
  metadata: path.resolve(__dirname, 'public', 'metadata')
};

var path = require('path');

module.exports = {
  site: {
    title: 'kkiro.kr',
    description: 'A blog',
    copyright: '&copy; Kkiro. All rights reserved.',
    // This is specified in Atom format.
    author: {
      name: 'Kkiro',
      uri: 'http://kkiro.kr',
      email: 'yoo2001818@gmail.com'
    },
    icon: 'http://kkiro.kr/favicon.ico',
    image: 'http://kkiro.kr/favicon.ico',
    id: 'http://kkiro.kr/',
    link: {
      href: 'http://kkiro.kr/'
    },
    menu: {
      About: '/about',
      Tags: '/tags',
      Resume: '/resume'
    },
    language: 'en-US'
  },
  source: path.resolve(__dirname, 'posts'),
  media: path.resolve(__dirname, 'media'),
  metadata: path.resolve(__dirname, 'public', 'metadata')
};

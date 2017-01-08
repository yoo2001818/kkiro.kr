var path = require('path');
var fs = require('fs');

module.exports = {
  site: {
    title: 'kkiro.kr',
    description: 'Kkiro\'s personal blog',
    copyright: 'Kkiro. All rights reserved.',
    // This is specified in Atom format.
    author: {
      name: 'Kkiro',
      uri: 'http://kkiro.kr',
      email: 'yoo2001818@gmail.com'
    },
    icon: 'http://kkiro.kr/favicon.ico',
    image: 'http://kkiro.kr/media/logo.png',
    id: 'http://kkiro.kr/',
    link: {
      href: 'http://kkiro.kr/'
    },
    menu: {
      About: '/about/',
      Tags: '/tags/'
    },
    language: 'en-US'
  },
  footer: fs.readFileSync(path.resolve(__dirname, 'footer.txt'), 'utf-8'),
  source: path.resolve(__dirname, 'posts'),
  media: path.resolve(__dirname, 'media'),
  output: path.resolve(__dirname, 'public')
};

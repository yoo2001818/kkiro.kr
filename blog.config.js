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
    // This is main language of the site - if other languages are detected,
    // separate post lists will be created for different languages.
    language: 'en',
    // Other languages.
    languages: {
      ko: {
        description: '끼로의 블로그',
        menu: {
          소개: '/lang-ko/about/',
          태그: '/lang-ko/tags/'
        }
      }
    }
  },
  footer: fs.readFileSync(path.resolve(__dirname, 'footer.txt'), 'utf-8'),
  source: path.resolve(__dirname, 'posts'),
  media: path.resolve(__dirname, 'media'),
  output: path.resolve(__dirname, 'public')
};

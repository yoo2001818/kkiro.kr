---
title: The blog structure
published: 2017/01/24 03:09
updated: 2017/01/24 03:09
tags: blog, react, redux, structure, node.js
comment: true
---
I can't believe it took half a month to be motivated to write an article.
Anyway, like I said
[before](/2017-01-09-ive-just-started-the-blog/),
I'm writing an article about the blog structure. It's quite messy though.

---

# Overview
The blog ([kkiro.kr](http://kkiro.kr/)) uses a static blog generator -
which uses React server side rendering (SSR) to render the page. It also uses
JSON chunks to download only required information.

The generator is separated to multiple parts, mainly:
- **Client code** - The client code. Uses redux and react-router to resolve
  the address and manage metadata. Webpack is used to bundle them.
- **Metadata generator** - Crawls the `posts` folder and generates posts
  metadata.
- **Metadata separator** - Separates the metadata to several JSON files.
- **React renderer** - Renders each page using `renderToStaticMarkup` to build
  HTML files. Uses the client code to render the page.
- **RSS / Atom renderer** - Renders Atom/RSS feed using
  [pug](https://pugjs.com/) template engine.

## Why?
Sure, I could have made the blog using other static blog generators. But
they're not fancy - I wanted to use React, single page app (SPA) and bunch of
'new' technologies because they're cool.

Or maybe I could've used blog platforms - Blogger, Tumblr, etc. But I don't
want to use them, since they can't be modified easily, like implementing
multilingual support.

So I searched for static blog generator that uses React, and there is only one
blog generator:
[Gatsby](https://github.com/gatsbyjs). But it currently saves whole article
data into single JS file. Which is very horrible for scaling.
They're creating new version of Gatsby which builds JSON for each page, and
uses GraphQL to generate metadata. They look cool, but it's not out yet.
I'll reconsider using Gatsby once version 1.0 gets released.

Anyway, sure, GraphQL is cool, but I'm not quite ready for it now - I don't
think it has matured enough.

# Client code
Well, the client code is the client code. I've used redux to manage
the site state, but it's not really necessary though.

The redux's metadata loader middleware automatically fetches the metadata and
fills the data into right place using
[schema file](https://github.com/yoo2001818/kkiro.kr/blob/master/src/schema.js)
from the metadata separator.

To allow server side rendering, it uses prefetching mechanism that utilizes
react-router's structure.

There's nothing much to explain about it, since it's just a site made with
React, react-router, redux.

The blog generator actually calls webpack to bundle the client code, though.

# Metadata generator
**Metadata generator** crawls the `posts` folder and generates posts
metadata. Since we don't use GraphQL or something like that to process the
data, the data is separated to actual post data and post lists, tag lists,
etc... at the generation time.

To support Korean, I've added multilingual support too, so each list and post
data is separated with languages.

So the generator generates this single JSON metadata file. This is used to
build the whole site.
```js
{
  site: {
    /* Site configuration */
  },
  tags: {
    ko: ['test', 'tag'],
    en: ['test', 'tag']
  },
  posts: {
    ko: [
      { /* Post */ },
      { /* Post */ }
    ]
  },
  postEntries: {
    ko: {
      postName: { /* Post with content */ }
    }
  },
  tagEntries: {
    ko: {
      test: [
        { /* Post */ },
        { /* Post */ }
      ]
    }
  }
}
```

It doesn't look fancy - but this is done to create the JSON file for each page.
After the generation is finished, It passes the data into the separator.

# Metadata separator
**Metadata separator** splits the metadata file into chunks of metadata
information, and stores them into a dictionary with generated keys - eventually
they become the filename.

Then it gets stored into metadata directory, ready to be read by the client.

![File list](/media/metadataSeparatorFileList.png)

The separation is done using a
[schema file](https://github.com/yoo2001818/kkiro.kr/blob/master/src/schema.js),
which defines how the metadata should be splited.

At this stage, the site becomes renderable by the client, and the splited
metadata files actually gets used on the development server, which supports
dynamic preview of the page.

Anyway, the generator still has to render the pages and atom / RSS feed.

# React renderer
**React renderer** renders the website's HTML file using the client code.

First, link renderer reads the metadata and generates the URLs that need to be
renderered.
Then, React renderer renders the actual pages into HTML.

It doesn't do anything special - it's just uses React's `renderToStaticMarkup`
to render it. But I've been struggled to couple webpack and
webpack-isomorphic-tools within the generator.

It uses prefetch routine to fetch the required data into redux state, which
gets stored into HTML file too. I used `JSON.stringify` for this before,
but since that could lead to serious XSS issue (it doesn't properly escape
HTML), I changed it into `serialize-javascript` package.

It also uses react-helmet to construct header tags too.

After everything is done, it simply stores bunch of HTML pages.

# RSS / Atom renderer
**RSS / Atom renderer** renders the RSS / Atom feed of the blog. Actually, I
could have skipped that, but since I use the feed reader often, I wanted to
implement RSS / Atom feed for my blog too.

Originally I wanted to use React to generate XML too - but it's pretty
meaningless and React doesn't support XML generation anyway. So I just decided
to use [pug](https://pugjs.com/) template engine for this purpose.

Well, the pug template receives the metadata and renders the XML file. That's
it. Nothing special. I had to make it call markdown renderer since it
wants HTML, not markdown document.

After implementing multilingual support, the RSS / Atom feed had to render
the XML for each languages. So I've changed them to filter the articles with
selected language.

# Conclusion
That's pretty all about my blog's structure. I had fun making it since I've
never done static generation before. It turned out that I just had to use
server side rendering like regular web server.

The code's pretty bad, though, but feel free to look around the source
code: https://github.com/yoo2001818/kkiro.kr

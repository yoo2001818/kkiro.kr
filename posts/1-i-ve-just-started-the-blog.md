---
title: I've just started the blog
published: 2017/01/09 00:13
updated: 2017/01/09 00:13
tags: blog
comment: true
---
Finally, after like 8 years, I've started a blog. (My website was under
construction for 8 years. Really!)

---

It's quite simple and buggy now though, but I'll improve on that.

## Blog generator
I've made a static blog generator because nothing was good enough. I badly
wanted to use React in my blog, but, there was no static blog generator that
fits my use.

Actually, there was only one React static blog generator:
[Gatsby](https://github.com/gatsbyjs). But it currently saves whole article
data into single JS file. Which is very horrible for scaling.
[There's an GitHub issue for this.](https://github.com/gatsbyjs/gatsby/issues/431)

So I made a [blog generator](https://github.com/yoo2001818/kkiro.kr) suitable
for my use. But since it's quite complicated, I'm having a problem separating
the generator and the website. (It's not heavily tied with each other though,
but since everything depends on single schema, it's hard to separate them to
libraries)
I'll write detailed article about it later.

## Multilingual support?
I made simple multilingual support for this blog to support Korean.
It was pretty hard to edit the code to do multilingual support, since almost
every code had to be modified.

It simply separates the site with languages, which can be switched using
the button on the top right.

# kkiro.kr
Personal website (blog) made with React

[http://kkiro.kr/](http://kkiro.kr)

# What is this?
This is the source code of my blog, which is a static website made using React.

I orignally thought of making static generator first then making my blog, but,
since it's quite complicated and there's no 'user serviceable part' in the
library, I decided to keep it as a part of my blog. But you can copy this
project and create your own, of course. I'll separate it once I finish tidying
up.

# Why did you make this?
There already is a React-based static website generator called
[Gatsby](https://github.com/gatsbyjs/gatsby), but it saves whole blog
data in the single JS file!
[It'll be improved, though.](https://github.com/gatsbyjs/gatsby/issues/431)
It'll be really really bad if the blog gets bigger.

So I decided to create a static blog generator which keeps its data into bunch
of JSON files, then makes AJAX call to fetch them.

Sure, it's more complicated, but it'd be better if the site gets bigger.

# Structure

## Procedure
The generator is (mainly) divided to 4 parts:

- Metadata generator from posts
- Route generator from metadata
- Client side code /w react-router
- RSS / Atom generator

### Metadata generation
Generator scans `posts` directory and generates metadata from the file. It
should generate tags and posts directory at the same time.

Metadata is then separated to several json files, ready to be loaded by
client side code. Post specific files should be loaded to metadata
directory too.

### Route generation
Route generator scans the metadata and creates a list of 'interesting'
addresses. Then `react-blog` will run server side rendering for each
addresses.

### Client side code
Client side code is React single page application. It fetches metadata on the
fly then renders the page.

### RSS / Atom generator
RSS / Atom genrator changes the metadata into RSS / Atom XML file.
Since React can't do XML rendering, I've used [pug](https://pugjs.org/)
template engine to render them.

# License
The code itself is under MIT license, however, blog posts and media files
doesn't have license (All rights reserved).

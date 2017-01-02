# react-blog
Static website generator with React

## Procedure
react-blog is (mainly) divided to three parts:

- Metadata generator from posts
- Route generator from metadata
- Client side code /w react-router

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
Client side code is ...client side code. It fetches metadata on the fly
then renders the page.

## Hot module replacement?
When in development mode, metadata generator will be running and watching
`posts` directory. If an update occurs, it'll update metadata directory,
which will trigger `webpack-dev-server` to rebuild the project.

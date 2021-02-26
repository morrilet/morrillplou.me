# morrillplou.me

A static personal page with a blog. Built with 11ty and Sass. Hosted on Netlify.


# Running the Project

Running the project is fairly straightforward - just use `npm run start` to spin up a development server that auto-updates everything for you.

If you're trying to run specific steps, this list should help you out:

* Are you trying to run a one-off compile?
    * Use `npm run build` to compile the entire site.
    * Use `npm run sass` to compile Sass files to CSS.
    * Use `npm run eleventy` to compile all other file types to static HTML.
* Do you need auto-updating?
    * For the whole site, use `npm run start` as described above.
    * Use `npm run watch:sass` to compile Sass files to CSS and watch for changes.
    * Use `npm run watch:eleventy` to compile all other file types to static HTML and watch for changes.

# Building Pages

For things like blog posts, we simply add a new .md file to the posts directory. By doing this we tell the site to load 
it alongside the the other blog posts and index it. Front matter tags can be a bit much to remember, but here's how you do
some common tasks:

* Title
    * Add the `title` front-matter tag.
* Banner Images
    * Add the `image` front-matter tag.
* Date Overrides
    * Add the `date` front-matter tag to override the default file (post) creation date.
    * Add the `date_modified` front-matter tag to specify an edit date (shown alongside the post creation date.)
* Excerpts
    * Use the `excerpt` front-matter tag
    * Add `<!-- more -->` to the body of the post where you want the excerpt to stop. Beware that this also captures formatting.
* Images
    * Use the format `![alt-text](/images/my/image)` to inject a single image.
    * Add this tag to your page for a gallery: `{% include components/image-slider with { images: [{ src: "img/url", alt: "alt text"},] } %}`.
    As a bonus, put your image list in the front-matter!
* Code Snippets
    * Nest your sample code between ```` ``` js (or any other extension) ```` and ```` ``` ```` tags to create a multi-line, formatted snippet.
* Slug Customization
    * Add the `slug` front-matter tag. If unused we'll default to a cleaned-up version of the `title`.
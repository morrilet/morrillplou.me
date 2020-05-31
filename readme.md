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
    * Use `npm run watch:elevents` to compile all other file types to static HTML and watch for changes.
---
title: 11ty Excerpts and You
image: "/images/posts/11ty_excerpts/11ty_code_possum.png"
---

So you've got some **Really Radical Content**(tm) and you want to show a bit of ankle in 11ty. That's all fine and dandy but it turns out that this can
be a little trickier than you may think at first blush. 

<!-- more -->

# Option 1: TemplateContent

If you've done any poking around online you may have run into solutions using a custom shortcode to read `templateContent`. While this might work for some
(and will probably be your best bet in the future) I was running into sorting issues when using this method. Reversing / sorting the collection I was grabbing
excerpts from failed the second *any* of my code called `post.templateContent`. I'm still not sure why, but I'm going to chalk it up to the growing pains of
a young tool (v0.11 as I'm typing this.)

Either way, in case you're living in the future or you're only getting a single excerpt, here's the code I was using for this.

``` js
// eleventy.js
const getExcerpt = (post) => {

    if (!post.hasOwnProperty('templateContent')) {
        console.warn('Post has no property templateContent - unable to extract excerpt.')
        return null
    }

    let excerpt = null;
    const content = post.templateContent;
    const separators = [
        { start: '<!-- start excerpt -->', end: '<!-- end excerpt -->'},
        { start: '<p>', end: '</p>'}
    ];

    separators.some((separator) => {
        const startPos = content.indexOf(separator.start);
        const endPos = content.indexOf(separator.end);
        if (startPos !== -1 && endPos !== -1) {
            excerpt = content.substring(startPos + separator.start.length, endPos).trim();
            return true;
        }
    })
    return excerpt;
}

module.exports = (function(eleventyConfig) {
    eleventyConfig.addShortcode('excerpt', (post) => getExcerpt(post))
}
```

If you want to dig a little deeper on this method, check out [this post](https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/#displaying-excerpts-on-the-homepage).

# Option 2: Gray-Matter

According to the [docs](https://www.11ty.dev/docs/data-frontmatter-customize/#example-parse-excerpts-from-content), we've been able to parse excerpts from content
since v0.9. This is super handy. It lets us add a customizable tag (such as `<!-- more -->`) to our content in order to auto-generate an excerpt without needing to
write any shortcodes. The issue I ran into with this, however, is that I often start my posts with a header. This was getting pulled into the excerpt because we can
only specify the *end* of the excerpt. If this is a non-issue for you, great! This is the 'official' way to set up excerpts on your site.

``` js
// eleventy.js
module.exports = (function(eleventyConfig) {
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!-- more -->"
    })
}
```

As a fun aside, I wasn't able to use this solution at first because the excerpt data wasn't yet available in `post.data.page`. That 
[became available](https://github.com/11ty/eleventy/issues/1044) shortly after I picked this back up.


# Option 3: Front-Matter + Gray-Matter

In order to handle the case where I start a post with a title, I added the option to explicitly set the excerpt in front-matter. From there I wrote a quick shortcode
to grab the excerpt from `post.data.excerpt` (front-matter) *or* `post.data.page.excerpt` depending on availability. Add in some markdown rendering so links and the
like still work and we're off to the races.

``` js
// eleventy.js
const markdownIt = require('markdown-it');

const getExcerpt = (post) => {
    const md = new markdownIt({ html: true })
    if (post.data.excerpt) {
        return md.render(post.data.excerpt);
    } 
    else if (post.data.page.excerpt) {
        return md.render(post.data.page.excerpt);
    }
    return null
}

module.exports = (function(eleventyConfig) {
    eleventyConfig.addShortcode('excerpt', (post) => getExcerpt(post))
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!-- more -->"
    })
}
```

# Option 4: Paired Shortcodes in Markdown?

This isn't something I've fully explored, but I'd love to be able to use [paired shortcodes](https://www.11ty.dev/docs/shortcodes/#paired-shortcodes) in markdown
for something like this. If `templateContent` didn't wreck collection sorting that's essentially what we'd be doing with option 1, but I'd love if something like
this were supported out of the box. In the meatime, if `templateContent` decides to work or someone comes up with a way to bypass it in option 1 I'll be switching
over to that solution.

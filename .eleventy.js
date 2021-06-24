const syntaxHighlighter = require('@11ty/eleventy-plugin-syntaxhighlight');
const embedEverything = require('eleventy-plugin-embed-everything');
const markdownIt = require('markdown-it');
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]


/**
 * Attempts to get an excerpt from a post object. The excerpt is the content between before the first 
 * instance of '<!-- more -->' or the excerpt listed in front-matter, based on availability.
 * 
 * @param {object} post 
 */
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

    // Config
    eleventyConfig.addPassthroughCopy('_includes/styles');
    eleventyConfig.addPassthroughCopy('_includes/images');
    eleventyConfig.addPassthroughCopy({'node_modules/@glidejs/glide/dist': 'bin/glide/'})
    eleventyConfig.addPassthroughCopy({'node_modules/lightbox2/dist': 'bin/lightbox/'})
    eleventyConfig.addPassthroughCopy('icons');
    eleventyConfig.addPassthroughCopy('images');
    eleventyConfig.addShortcode('excerpt', (post) => getExcerpt(post))
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!-- more -->"
    })

    // Plugins
    eleventyConfig.addPlugin(syntaxHighlighter);
    eleventyConfig.addPlugin(embedEverything);

    // Filters
    eleventyConfig.addFilter('characterCount', (str) => {
        return str.length;
    })
    eleventyConfig.addFilter('toUTCString', (str) => {
        var date = new Date(str);

        var day = date.getUTCDate();
        var month = months[date.getUTCMonth()];
        var fullYear = date.getUTCFullYear().toString()
        var year = fullYear.slice(fullYear.length - 2);

        return day + " " + month + " '" + year;
    })
});
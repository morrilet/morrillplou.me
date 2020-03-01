const syntaxHighlighter = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (function(eleventyConfig) {

    // Config
    eleventyConfig.addPassthroughCopy('_includes/styles');
    eleventyConfig.addPassthroughCopy('_includes/images');

    // Plugins
    eleventyConfig.addPlugin(syntaxHighlighter);

    // Filters
    eleventyConfig.addFilter('characterCount', (str) => {
        return str.length;
    })
});
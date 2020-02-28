module.exports = (function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('_includes/styles');
    eleventyConfig.addPassthroughCopy('_includes/images');

    eleventyConfig.addFilter('characterCount', (str) => {
        return str.length;
    })
});
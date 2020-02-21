module.exports = (function(eleventyConfig) {
    eleventyConfig.addFilter('characterCount', (str) => {
        return str.length;
    })
});
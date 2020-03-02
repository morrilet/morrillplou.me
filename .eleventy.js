const syntaxHighlighter = require('@11ty/eleventy-plugin-syntaxhighlight');
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
    eleventyConfig.addFilter('toUTCString', (str) => {
        var date = new Date(str);

        var day = date.getUTCDate();
        var month = months[date.getUTCMonth()];
        var fullYear = date.getUTCFullYear().toString()
        var year = fullYear.slice(fullYear.length - 2);

        return day + " " + month + " '" + year;
    })
});
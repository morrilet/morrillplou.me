window.onscroll = function() { handleScroll() }

/**
 * Adjusts the width of a progress bar based on the scroll position within the page.
 */
function handleScroll() {

    // Get the current Y position of the top of the screen within the document.
    var scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

    // Get the max Y value of the top of the screen (page height - screen height).
    var maxScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Get the scroll position as a percentage.
    var scrollPercentage = (scrollPosition / maxScrollHeight) * 100;

    // Set the width of the progress bar.
    document.getElementById('title-progress-bar').style.width = scrollPercentage + '%';
}
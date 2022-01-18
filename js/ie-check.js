window.addEventListener('DOMContentLoaded', function() {
    var userAgent = window.navigator.userAgent;
    var isIE = /MSIE|Trident/.test(userAgent);

    if ( isIE ) {
        window.NotificationAPI.notify("Are you using Internet Explorer? Some parts of the site might not work for you.", false);
    }
});
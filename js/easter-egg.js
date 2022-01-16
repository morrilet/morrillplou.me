window.addEventListener('load', () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);

    let welcomeStrings = [
        "Oh, hey, long time no see.",
        "Not sure what you expected, but welcome back!",
        "Howdy! Been a minute.",
        "Nice to see you again!",
        "Welcome back, friend.",
        "Hey, we just saw each other!",
    ]

    if (urlParams.get('selfReferral')) {
        let randomIndex = Math.floor(Math.random() * welcomeStrings.length);
        window.NotificationAPI.notify(welcomeStrings[randomIndex], true);
        
        // Remove the `selfReferral` URL parameter.
        window.history.replaceState({}, document.title, "/");
    }
})
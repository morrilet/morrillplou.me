window.addEventListener('load', () => {
    console.log('Loaded contact-form.js!');
    document.getElementById('contact-form').addEventListener('submit', submitForm);
})

const submitForm = (e) => {
    e.preventDefault();

    let form = document.getElementById('contact-form');
    let formData = new FormData(form);

    if (window.fetch) {
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        }).then((success) => {
            if (success.status == 200) {
                window.NotificationAPI.notify("Success! Your message has been sent.", true);
            } else {
                throw new Error('Request failed');
            }
        }).catch(() => {
            window.NotificationAPI.notify("Unexpected error! Please contact me directly using the links below.", false);
        })
    } else {
        // TODO: XMLHttpRequest
        window.NotificationAPI.notify('Your browser does not support this feature. Please contact me directly using the link below.', false)
    }
}
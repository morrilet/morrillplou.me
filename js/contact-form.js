window.addEventListener('load', () => {
    document.getElementById('contact').addEventListener('submit', submitForm);
})

const submitForm = (e) => {
    e.preventDefault();

    let form = e.currentTarget;
    let formData = new FormData(form);
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    }

    if (window.fetch) {
        fetch('/contact', options).then((success) => {
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
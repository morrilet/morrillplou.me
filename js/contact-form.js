window.addEventListener('DOMContentLoaded', () => {

    const submitForm = (e) => {
        console.log('HERE SUBMIT FORM LISTENER');
        
        e.preventDefault();
    
        console.log(e);
    
        let form = e.currentTarget;
        let formData = new FormData(form);
        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams(formData).toString()
        }
    
        if (window.fetch) {
            fetch(form.getAttribute('action'), options).then((success) => {
                if (success.status == 200) {
                    window.NotificationAPI.notify("Success! Your message has been sent.", true);
                } else {
                    throw new Error('Request failed');
                }
            }).catch(() => {
                window.NotificationAPI.notify("Unexpected error! Please contact me directly using the links below.", false);
            })
        } else {
            // TODO: XMLHttpRequest or allow event default
            window.NotificationAPI.notify('Your browser does not support this feature. Please contact me directly using the link below.', false)
        }
    }
    
    document.getElementById('contact').addEventListener('submit', submitForm);
})
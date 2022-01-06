window.addEventListener('load', () => {
    const NotificationAPI = {
        notify: (text) => {
            let textElement = document.getElementById('notification-text');
            if (textElement) {
                textElement.innerHTML = text;
            }
        }
    }
})
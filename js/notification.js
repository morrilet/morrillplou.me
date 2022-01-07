window.addEventListener('DOMContentLoaded', () => {
    window.NotificationAPI = {
        notify: (text, successful) => {
            let bannerElement = document.getElementById('notification');
            let textElement = document.getElementById('notification-text');

            if (bannerElement) {
                bannerElement.style.display = "block";
                bannerElement.style.backgroundColor = successful ? "#92B5A6" : "#E09B5E";  // Colors from global.scss.

                if (textElement) {
                    textElement.innerHTML = text;
                }
            }
        }
    }
})
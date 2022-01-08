window.addEventListener('DOMContentLoaded', () => {
    let menuButton = document.getElementById('menu-button');
    let externalMenu = document.getElementById('external-menu');
    externalMenu.style.display = 'none';

    menuButton.addEventListener('click', () => {
        if (externalMenu.style.display === 'none') {
            externalMenu.style.display = 'block';
        } else {
            externalMenu.style.display = 'none';
        }
    })
})
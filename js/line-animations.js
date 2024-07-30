window.addEventListener('load', () => {
    const maskLine = document.getElementById('mask-path-inner');
    const maskTotalLength = maskLine.getTotalLength();

    maskLine.style.strokeDasharray = maskTotalLength + ' ' + maskTotalLength;
    maskLine.style.strokeDashoffset = maskTotalLength;
})
Array.from(document.querySelectorAll('.glide')).map((el) => {
    var glide = new Glide(el, {
        perView: 3
    }).mount()
})
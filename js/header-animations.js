import { gsap } from "/bin/gsap/index.js";
import { ScrollTrigger } from "/bin/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const header = document.getElementById("header");
    const headerBlock = document.getElementById("header-block");
    
    gsap.timeline()
        .add("start")
        .fromTo(
            '#header',
            {
                y: -100
            },
            {
                scrollTrigger: {
                    trigger: '#content',
                    start: 'top top',
                    end: '+=5rem',
                    scrub: 1
                },
                y: 0
            },
        )
        .fromTo(
            '#header-block',
            {
                y: -100
            },
            {
                scrollTrigger: {
                    trigger: '#content',
                    start: 'top top',
                    end: '+=5rem',
                    scrub: 1
                },
                y: 0
            },
        )
});
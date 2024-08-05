import { gsap } from "/bin/gsap/index.js";
import { ScrollTrigger } from "/bin/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const animationSpeed = 0.6;
const scrollTrigger = {
    trigger: '#title-wrapper',
    start: 'bottom top+=25%',
    end: '+=1px',
    scrub: animationSpeed,
}

window.addEventListener('load', () => {
    gsap.timeline()
        .fromTo(
            '#header',
            {
                yPercent: -100
            },
            {
                scrollTrigger,
                yPercent: 0,
            },
        )
        .fromTo(
            '#header-block',
            {
                yPercent: -100
            },
            {
                scrollTrigger,
                yPercent: 0,
            },
        )
});
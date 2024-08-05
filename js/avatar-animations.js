import { gsap } from "/bin/gsap/index.js";
import { ScrollTrigger } from "/bin/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    gsap.timeline()
        .fromTo(
            '#avatar-container',
            {
                yPercent: 0
            },
            {
                scrollTrigger: {
                    trigger: '#title-wrapper',
                    start: 'top top',
                    scrub: .1
                },
                yPercent: -25
            },
        )
        .fromTo(
            '#plane-stroke-top',
            {
                yPercent: 0
            },
            {
                scrollTrigger: {
                    trigger: '#title-wrapper',
                    start: 'top top',
                    scrub: .1
                },
                yPercent: -12.5
            }
        )
});
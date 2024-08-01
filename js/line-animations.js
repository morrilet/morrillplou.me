import { gsap } from "/bin/gsap/index.js";
import { ScrollTrigger } from "/bin/gsap/ScrollTrigger.js";
import { MotionPathPlugin } from "/bin/gsap/MotionPathPlugin.js";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

window.addEventListener('load', () => {
    const maskLine = document.getElementById('mask-path-inner');
    const maskTotalLength = maskLine.getTotalLength();
    maskLine.style.strokeDasharray = `${maskTotalLength} ${maskTotalLength}`;

    const planeAlignOrigin = [0.5, 0.65];
    const planeAngleOffset = 50;

    gsap.timeline()
        .add("start")
        .fromTo(
            '#mask-path-inner',
            {
                strokeDashoffset: maskTotalLength,
                display: "none",
            },
            {
                strokeDashoffset: maskTotalLength * 0.35,
                display: "block",
                ease: "expo.out",
                duration: 0.8
            },
            "start"
        )
        .to(
            "#paper-plane",
            {
                motionPath: {
                    path: "#main-path",
                    align: "#main-path",
                    alignOrigin: planeAlignOrigin,
                    autoRotate: planeAngleOffset,
                    end: 1 * (1 - 0.35)
                },
                duration: 0.8,
                ease: "expo.out",
            },
            "start"
        )
        .add("scroll-start")
        .fromTo(
            '#mask-path-inner',
            {
                strokeDashoffset: maskTotalLength * 0.35
            },
            {
                scrollTrigger: {
                    trigger: '#mask-path-inner',
                    start: 'top top',
                    end: '+=20%',
                    scrub: 1
                },
                strokeDashoffset: 0,
            },
            "scroll-start",
        )
        .fromTo(
            "#paper-plane",
            {
                motionPath: {
                    path: "#main-path",
                    align: "#main-path",
                    alignOrigin: planeAlignOrigin,
                    autoRotate: planeAngleOffset,
                    start: 1 * (1 - 0.35)
                }
            },
            {
                scrollTrigger: {
                    trigger: '#mask-path-inner',
                    start: 'top top',
                    end: '+=20%',
                    scrub: 1
                },
                motionPath: {
                    path: "#main-path",
                    align: "#main-path",
                    alignOrigin: planeAlignOrigin,
                    autoRotate: planeAngleOffset,
                    start: 1 * (1 - 0.35)
                },
                duration: 0.8
            },
            "scroll-start"
        )

    // gsap.fromTo(
    //     '#mask-path-inner', 
    //     {
    //         strokeDashoffset: maskTotalLength,
    //         display: "none",
    //     }, 
    //     {
    //         scrollTrigger: {
    //             trigger: '#mask-path-inner',
    //             start: 'top top',
    //             end: '+=20%',
    //             scrub: 1,
    //         },
    //         strokeDashoffset: 0,
    //         display: "block"
    //     }
    // );
})

// window.onscroll = function() { handleScroll() }

// /**
//  * Adjusts the stroke-dashoffset of our lines based on where it is in our view.
//  */
// function handleScroll() {
//     // Get the mask link and calculate its length so we know what value to use at the start of the effect.
//     const maskLine = document.getElementById('mask-path-inner');
//     const maskTotalLength = maskLine.getTotalLength();

//     maskLine.style.strokeDasharray = `${maskTotalLength} ${maskTotalLength}`;
//     maskLine.style.strokeDashoffset = maskTotalLength;
//     // maskLine.setAttributeNS('svg', 'stroke-dasharray', `${maskTotalLength} ${maskTotalLength}`);
//     // maskLine.setAttributeNS('svg', 'dash-offset', maskTotalLength);

//     // Get the current Y position of the top of the screen within the document.
//     var scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

//     // Get the max Y value of the top of the screen (page height - screen height).
//     var maxScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

//     // Get the scroll position as a percentage.
//     var scrollPercentage = (scrollPosition / maxScrollHeight);

//     // Set the dash offset of the masking path.
//     console.log(lerp(maskTotalLength, 0, scrollPercentage))
//     maskLine.style.strokeDashoffset = lerp(maskTotalLength, 0, scrollPercentage);
//     // maskLine.setAttributeNS('svg', 'dash-offset', lerp(maskTotalLength, 0, scrollPercentage))
// }

// function lerp(start, end, t) {
//     return start + t * (end - start);
// }
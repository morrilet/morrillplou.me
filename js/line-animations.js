import { gsap } from "/bin/gsap/index.js";
import { ScrollTrigger } from "/bin/gsap/ScrollTrigger.js";
import { MotionPathPlugin } from "/bin/gsap/MotionPathPlugin.js";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

// Getting the length of our paths when using `vector-effect: "non-scaling-stroke" is no good.
// Here we take the scale of the path into account. Big thanks to this answer:
// https://stackoverflow.com/questions/44389668/svg-gettotallength-wont-return-the-right-size-for-non-scaling-stroke-get-sv
const getTotalLengthWithScale = (path) => {
    const scale = path.getBoundingClientRect().width / path.getBBox().width;
    return path.getTotalLength() * scale;
}

window.addEventListener('load', () => {
    const maskLineTop = document.getElementById('mask-path-top-inner');
    const maskTotalLengthTop = maskLineTop.getTotalLength();  // Don't worry about scale here - it's acting up on small displays and it's not necessary for such a simple line.
    maskLineTop.style.strokeDasharray = `${maskTotalLengthTop} ${maskTotalLengthTop}`;

    const maskLineMid = document.getElementById('mask-path-mid-inner');
    const maskTotalLengthMid = getTotalLengthWithScale(maskLineMid);
    maskLineMid.style.strokeDasharray = `${maskTotalLengthMid} ${maskTotalLengthMid}`;

    const planeAlignOrigin = [0.5, 0.65];
    const planeAngleOffset = 50;
    const scrollStartOffset = 0.45;

    const planeMotionPath = {
        path: "#main-path-top",
        align: "#main-path-top",
        alignOrigin: planeAlignOrigin,
        autoRotate: planeAngleOffset
    }

    gsap.timeline()
        .fromTo(
            '#mask-path-mid-inner',
            {
                strokeDashoffset: maskTotalLengthMid,
                display: "none",
            },
            {
                scrollTrigger: {
                    trigger: '#plane-stroke-mid',
                    start: 'top center+=25%',
                    end: 'bottom center+=25%',
                    scrub: 1,
                    markers: true,
                },
                strokeDashoffset: 0,
                display: "block",
                ease: "expo.out"
            }
        )

    gsap.timeline()
        .add("start")
        .fromTo(
            '#mask-path-top-inner',
            {
                strokeDashoffset: maskTotalLengthTop,
                display: "none",
            },
            {
                strokeDashoffset: maskTotalLengthTop * scrollStartOffset,
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
                    ...planeMotionPath,
                    end: 1 - scrollStartOffset,
                },
                duration: 0.8,
                ease: "expo.out",
            },
            "start"
        )
        .add("scroll-start")
        .fromTo(
            '#mask-path-top-inner',
            {
                strokeDashoffset: maskTotalLengthTop * scrollStartOffset
            },
            {
                scrollTrigger: {
                    trigger: '#title-wrapper',
                    start: 'center top+=20%',
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
                    ...planeMotionPath,
                    start: 1 - scrollStartOffset,
                }
            },
            {
                scrollTrigger: {
                    trigger: '#title-wrapper',
                    start: 'center top+=20%',
                    end: '+=20%',
                    scrub: 1
                },
                motionPath: {
                    path: "#main-path-top",
                    align: "#main-path-top",
                    alignOrigin: planeAlignOrigin,
                    autoRotate: planeAngleOffset,
                    start: 1 - scrollStartOffset,
                },
                duration: 0.8
            },
            "scroll-start"
        )
})

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// console.log('scrollTrigger', ScrollTrigger);
// console.log('motionPathPlugin', MotionPathPlugin);
// console.log('gsap', gsap);
// console.log('app.js is running!');

gsap.to(".hero__background__one__circle", {
  scrollTrigger: {
    trigger: ".hero__background__one svg",
    start: "top 10%",
    end: "+=1983",
    scrub: true
  },
  motionPath: {
    path: ".hero__background__one__line",
    align: ".hero__background__one__line",
    alignOrigin: [0.5, 0.5]
  }
});
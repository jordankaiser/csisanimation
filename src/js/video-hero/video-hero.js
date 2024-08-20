import { gsap } from 'gsap';
import videojs from 'video.js';

const videos = document.querySelectorAll('.hero__videos video');
let videoAnimation;

if (videos.length < 1) return;

function videoHero() {
  // createAnimation();
  attachListeners()
    .then(() => {
      playAllVideos();
    })
    .catch((error) => {
      console.error('One or more videos failed to load:', error);
    });
}

function attachListeners() {
  const videoPromises = Array.from(videos).map((video, key) => {
    return eventListeners(video)
      .then(() => {
        console.log(`Video ${key} loaded`);
      })
      .catch((error) => {
        console.error(`Error loading video ${key}:`, error);
        throw error;
      });
  });

  return Promise.all(videoPromises);
}

function eventListeners(video) {
  const abandonWait = 300000;

  return new Promise((resolve, reject) => {
    console.log('promise');
    // Abandon loading if video does not load within specified duration.
    const canPlayAbandon = setTimeout(() => {
      video.removeEventListener('canplay', canPlayHandler);

      // Reject the promise.
      reject(new Error(`Video did not load within ${abandonWait} milliseconds. Aborting load attempt.`));
    }, abandonWait);

    // Event handler.
    const canPlayHandler = () => {
      console.log('Video loaded:', video.src);
      clearTimeout(canPlayAbandon);
      video.removeEventListener('canplay', canPlayHandler);

      // Resolve the promise.
      resolve();
    };

    // Event listener.
    video.addEventListener('loadeddata', canPlayHandler);
  });
}

function playAllVideos() {
  videos.forEach((video) => {
    video.play();
  });
  // videoAnimation.play();
}

function createAnimation() {
  videoAnimation = gsap.timeline({ paused: true });

  videoAnimation
    .fromTo('.hero__videos', 
      {
        scale: 0.8,
        opacity: 0,
        ease: 'power2.out'
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    });
}

export { videoHero };
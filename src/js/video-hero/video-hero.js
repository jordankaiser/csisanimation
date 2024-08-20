import { gsap } from 'gsap';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const videoElements = document.querySelectorAll('.hero__videos video');
let videoPlayers = [];
let videoAnimation;

if (videoElements.length < 1) return;

function videoHero() {
  attachListeners()
    .then(() => {
      createAnimation();
      playAllVideos();
    })
    .catch((error) => {
      console.error('One or more videos failed to load:', error);
    });
}

function attachListeners() {
  const videoPromises = Array.from(videoElements).map((videoElement, key) => {
    return initializeVideoPlayer(videoElement, key)
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

function initializeVideoPlayer(videoElement, key) {
  const abandonWait = 300000;

  return new Promise((resolve, reject) => {
    // Initialize Video.js player
    const player = videojs(videoElement, {
      controls: false,
      autoplay: false,
      preload: 'auto'
    });

    videoPlayers.push(player);

    // Abandon loading if video does not load within specified duration.
    const canPlayAbandon = setTimeout(() => {
      player.off('canplay', canPlayHandler);

      // Reject the promise.
      reject(new Error(`Video did not load within ${abandonWait} milliseconds. Aborting load attempt.`));
    }, abandonWait);

    // Event handler.
    const canPlayHandler = () => {
      console.log('Video loaded:', player.currentSrc());
      clearTimeout(canPlayAbandon);
      player.off('canplay', canPlayHandler);

      // Resolve the promise.
      resolve();
    };

    // Event listener.
    player.on('canplay', canPlayHandler);
  });
}

function playAllVideos() {
  videoPlayers.forEach((player) => {
    player.play();
  });
  // Uncomment if you have an animation to play
  videoAnimation.play();
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
        duration: 0.75,
        ease: 'power2.out'
    });
}

export { videoHero };
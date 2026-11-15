const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.topbar nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const heroPhoto = document.querySelector('.hero-photo');
const candlePhotos = [
  { src: 'assets/holiday-candle.png', alt: 'Festive candle arrangement' },
  { src: 'assets/mulled-wine-candles.png', alt: 'Red candle glasses by Adele' },
  { src: 'assets/christmas-tree-candle.png', alt: 'Hand-decorated Christmas tree candle' },
  { src: 'assets/reindeer-mug-candle.png', alt: 'Festive candle in a reindeer mug' },
  { src: 'assets/christmas-arrangement.png', alt: 'Christmas candle arrangement' },
];

const preloadedPhotos = candlePhotos.map((photo) => {
  const image = new Image();
  image.src = photo.src;
  return image;
});

let currentPhoto = candlePhotos[Math.floor(Math.random() * candlePhotos.length)];
heroPhoto.src = currentPhoto.src;
heroPhoto.alt = currentPhoto.alt;

let isChangingPhoto = false;

async function showRandomPhoto() {
  if (isChangingPhoto) return;
  isChangingPhoto = true;

  const availablePhotos = candlePhotos.filter((photo) => photo.src !== currentPhoto.src);
  const nextPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];
  const nextPhotoImage = preloadedPhotos.find((image) => image.src.endsWith(nextPhoto.src));

  try {
    await nextPhotoImage.decode();

    const blurAnimation = heroPhoto.animate(
      [{ filter: 'blur(0px)' }, { filter: 'blur(12px)' }],
      { duration: 500, easing: 'ease-in-out', fill: 'forwards' },
    );
    await blurAnimation.finished;

    heroPhoto.src = nextPhoto.src;
    heroPhoto.alt = nextPhoto.alt;
    currentPhoto = nextPhoto;

    const unblurAnimation = heroPhoto.animate(
      [{ filter: 'blur(12px)' }, { filter: 'blur(0px)' }],
      { duration: 500, easing: 'ease-in-out', fill: 'forwards' },
    );
    blurAnimation.cancel();
    await unblurAnimation.finished;
    unblurAnimation.cancel();
  } catch (error) {
    console.error('Could not change the candle photo.', error);
  } finally {
    isChangingPhoto = false;
  }
}

window.setInterval(showRandomPhoto, 5000);

const snowfall = document.querySelector('.snowfall');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const snowflakeImagePath = 'assets/Icons/snowflake.svg';
const snowflakeCount = 32;

for (let index = 0; index < snowflakeCount; index += 1) {
  const snowflake = document.createElement('span');
  const duration = 28 + Math.random() * 24;

  snowflake.className = 'snowflake';
  const flakeImage = document.createElement('img');
  flakeImage.src = snowflakeImagePath;
  flakeImage.alt = '';
  snowflake.append(flakeImage);
  snowflake.style.setProperty('--snow-x', `${Math.random() * 100}%`);
  snowflake.style.setProperty('--snow-size', `${5 + Math.random() * 4}px`);
  snowflake.style.setProperty('--snow-opacity', `${0.45 + Math.random() * 0.4}`);
  snowflake.style.setProperty('--snow-duration', `${duration}s`);
  snowflake.style.setProperty('--snow-delay', `${-Math.random() * duration}s`);
  snowflake.style.setProperty('--snow-drift', `${-35 + Math.random() * 70}px`);
  snowflake.classList.add('snowflake-static');
  snowflake.style.setProperty('--snow-y', `${Math.random() * 100}%`);

  snowfall.append(snowflake);
}

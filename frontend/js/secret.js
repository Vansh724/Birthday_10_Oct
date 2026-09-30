/* =========================================================
   SECRET EXPERIENCE
   Completely independent from the existing Day system.
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const intro = document.getElementById("intro");
const musicScreen = document.getElementById("musicScreen");
const micScreen = document.getElementById("micScreen");
const ending = document.getElementById("ending");

const startButton = document.getElementById("startButton");
const music = document.getElementById("music");

const visualizer = document.getElementById("visualizer");
const micVisualizer = document.getElementById("micVisualizer");

const micButton = document.getElementById("micButton");
const micStatus = document.getElementById("micStatus");

const endingPoint = document.getElementById("endingPoint");
const finalMessage = document.getElementById("finalMessage");


/* =========================================================
   CANVAS SETUP
========================================================= */

const canvasContext = visualizer.getContext("2d");
const micContext = micVisualizer.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

function resizeCanvas() {

  width = window.innerWidth;
  height = window.innerHeight;

  visualizer.width = width * devicePixelRatio;
  visualizer.height = height * devicePixelRatio;

  visualizer.style.width = width + "px";
  visualizer.style.height = height + "px";

  canvasContext.setTransform(
    devicePixelRatio,
    0,
    0,
    devicePixelRatio,
    0,
    0
  );


  micVisualizer.width = width * devicePixelRatio;
  micVisualizer.height = height * devicePixelRatio;

  micVisualizer.style.width = width + "px";
  micVisualizer.style.height = height + "px";

  micContext.setTransform(
    devicePixelRatio,
    0,
    0,
    devicePixelRatio,
    0,
    0
  );
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* =========================================================
   SCREEN SWITCHER
========================================================= */

function showScreen(screen) {

  document.querySelectorAll(".screen").forEach(element => {
    element.classList.remove("active");
  });

  screen.classList.add("active");
}


/* =========================================================
   START EXPERIENCE
========================================================= */

startButton.addEventListener("click", async () => {

  showScreen(musicScreen);

  try {
    await music.play();
  } catch (error) {

    console.log("Audio could not start:", error);

    document.getElementById("tinyMessage").textContent =
      "tap anywhere to start the music";

    document.body.addEventListener(
      "click",
      () => music.play(),
      { once: true }
    );
  }

  startMusicVisualizer();
});


/* =========================================================
   AUDIO ANALYSER
========================================================= */

let audioContext;
let analyser;
let frequencyData;

function setupAudioAnalyser() {

  if (audioContext) {
    return;
  }

  audioContext = new (
    window.AudioContext ||
    window.webkitAudioContext
  )();

  analyser = audioContext.createAnalyser();

  analyser.fftSize = 256;

  const source = audioContext.createMediaElementSource(music);

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  frequencyData = new Uint8Array(
    analyser.frequencyBinCount
  );
}


/* =========================================================
   MUSIC VISUALIZER
========================================================= */

let musicAnimation;

function startMusicVisualizer() {

  setupAudioAnalyser();

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  drawMusic();
}


function drawMusic() {

  musicAnimation = requestAnimationFrame(drawMusic);

  analyser.getByteFrequencyData(frequencyData);

  canvasContext.clearRect(
    0,
    0,
    width,
    height
  );


  const centerX = width / 2;
  const centerY = height / 2;

  let total = 0;

  for (let i = 0; i < frequencyData.length; i++) {
    total += frequencyData[i];
  }

  const average =
    total / frequencyData.length;


  /* -----------------------------------------
     BACKGROUND GLOW
  ----------------------------------------- */

  const glowRadius =
    100 + average * 1.7;

  const gradient =
    canvasContext.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      glowRadius
    );

  gradient.addColorStop(
    0,
    `rgba(170,150,255,${0.06 + average / 3000})`
  );

  gradient.addColorStop(
    1,
    "rgba(0,0,0,0)"
  );

  canvasContext.fillStyle = gradient;

  canvasContext.fillRect(
    0,
    0,
    width,
    height
  );


  /* -----------------------------------------
     CENTRAL ORBIT
  ----------------------------------------- */

  const baseRadius =
    Math.min(width, height) * 0.16;

  const radius =
    baseRadius + average * 0.6;

  canvasContext.beginPath();

  canvasContext.arc(
    centerX,
    centerY,
    radius,
    0,
    Math.PI * 2
  );

  canvasContext.strokeStyle =
    `rgba(220,210,255,${0.12 + average / 1500})`;

  canvasContext.lineWidth = 1;

  canvasContext.stroke();


  /* -----------------------------------------
     FREQUENCY PARTICLES
  ----------------------------------------- */

  const particleCount = 90;

  for (
    let i = 0;
    i < particleCount;
    i++
  ) {

    const index =
      Math.floor(
        (i / particleCount) *
        frequencyData.length
      );

    const value =
      frequencyData[index] || 0;

    const angle =
      (i / particleCount) *
      Math.PI * 2;

    const distance =
      radius +
      value * 1.1;

    const x =
      centerX +
      Math.cos(angle) * distance;

    const y =
      centerY +
      Math.sin(angle) * distance;

    const size =
      0.5 + value / 70;

    canvasContext.beginPath();

    canvasContext.arc(
      x,
      y,
      size,
      0,
      Math.PI * 2
    );

    canvasContext.fillStyle =
      `rgba(235,230,255,${0.15 + value / 500})`;

    canvasContext.fill();
  }


  /* -----------------------------------------
     INNER PULSE
  ----------------------------------------- */

  const pulse =
    12 + average * 0.25;

  canvasContext.beginPath();

  canvasContext.arc(
    centerX,
    centerY,
    pulse,
    0,
    Math.PI * 2
  );

  canvasContext.fillStyle =
    `rgba(255,255,255,${0.35 + average / 800})`;

  canvasContext.fill();


  /* -----------------------------------------
     MUSIC END DETECTION
  ----------------------------------------- */

  if (
    music.ended &&
    average < 2
  ) {

    cancelAnimationFrame(musicAnimation);

    setTimeout(() => {

      showScreen(micScreen);

    }, 1800);
  }
}


/* =========================================================
   MICROPHONE EXPERIENCE
========================================================= */

let microphoneStream;
let microphoneContext;
let microphoneAnalyser;
let microphoneData;

let micAnimation;


micButton.addEventListener(
  "click",
  startMicrophone
);


async function startMicrophone() {

  if (!navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia) {

    micStatus.textContent =
      "microphone isn't available here";

    return;
  }


  try {

    microphoneStream =
      await navigator.mediaDevices.getUserMedia({
        audio: true
      });


    microphoneContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();


    const source =
      microphoneContext.createMediaStreamSource(
        microphoneStream
      );


    microphoneAnalyser =
      microphoneContext.createAnalyser();

    microphoneAnalyser.fftSize = 256;

    source.connect(microphoneAnalyser);


    microphoneData =
      new Uint8Array(
        microphoneAnalyser.frequencyBinCount
      );


    micButton.classList.add("listening");

    micStatus.textContent =
      "go on...";


    drawMicrophone();


    setTimeout(() => {

      stopMicrophone();

    }, 6500);

  } catch (error) {

    console.log(error);

    micStatus.textContent =
      "microphone permission is needed";

  }
}


/* =========================================================
   MICROPHONE VISUALIZER
========================================================= */

function drawMicrophone() {

  micAnimation =
    requestAnimationFrame(
      drawMicrophone
    );


  microphoneAnalyser.getByteFrequencyData(
    microphoneData
  );


  micContext.clearRect(
    0,
    0,
    width,
    height
  );


  const centerX =
    width / 2;

  const centerY =
    height / 2;


  let total = 0;

  for (
    let i = 0;
    i < microphoneData.length;
    i++
  ) {

    total += microphoneData[i];

  }


  const average =
    total /
    microphoneData.length;


  /* -----------------------------------------
     SOUND WAVES
  ----------------------------------------- */

  for (
    let ring = 0;
    ring < 4;
    ring++
  ) {

    const radius =
      70 +
      ring * 45 +
      average * 0.8;


    micContext.beginPath();

    micContext.arc(
      centerX,
      centerY,
      radius,
      0,
      Math.PI * 2
    );


    micContext.strokeStyle =
      `rgba(210,200,255,${0.08 - ring * 0.012})`;

    micContext.lineWidth = 1;

    micContext.stroke();
  }


  /* -----------------------------------------
     PARTICLES
  ----------------------------------------- */

  const particles = 100;


  for (
    let i = 0;
    i < particles;
    i++
  ) {

    const index =
      i % microphoneData.length;

    const value =
      microphoneData[index];


    const angle =
      (i / particles) *
      Math.PI * 2;


    const radius =
      80 +
      value * 1.8;


    const x =
      centerX +
      Math.cos(angle) * radius;


    const y =
      centerY +
      Math.sin(angle) * radius;


    micContext.beginPath();


    micContext.arc(
      x,
      y,
      1 + value / 80,
      0,
      Math.PI * 2
    );


    micContext.fillStyle =
      `rgba(235,230,255,${0.12 + value / 500})`;


    micContext.fill();
  }
}


/* =========================================================
   STOP MICROPHONE
========================================================= */

function stopMicrophone() {

  cancelAnimationFrame(
    micAnimation
  );


  if (microphoneStream) {

    microphoneStream
      .getTracks()
      .forEach(track => track.stop());

  }


  micButton.classList.remove(
    "listening"
  );


  micStatus.textContent =
    "";


  setTimeout(() => {

    startEnding();

  }, 1200);
}


/* =========================================================
   ENDING
========================================================= */

function startEnding() {

  showScreen(ending);


  endingPoint.style.transform =
    "scale(1)";


  setTimeout(() => {

    endingPoint.style.transform =
      "scale(18)";

    endingPoint.style.opacity =
      "0";

  }, 500);


  setTimeout(() => {

    finalMessage.classList.add("show");

  }, 2200);
}
// Coding Train / Daniel Shiffman
// http://thecodingtrain.com

// Code for: https://youtu.be/jEwAMgcCgOA

// this-dot-kp.mp3 can be downloaded from
// @ https://github.com/CodingTrain/website-archive/blob/main/Tutorials/P5JS/p5.js_sound/17.9_graphingAmplitude/this-dot-kp.mp3

// let song;
// let amp;
// let button;

// let volhistory = [];

// function toggleSong() {
//   if (song.isPlaying()) {
//     song.pause();
//   } else {
//     song.play();
//   }
// }

// function preload() {
//   song = loadSound('data/this-dot-kp.mp3');
// }

// function setup() {
//   createCanvas(400, 400);
//   button = createButton('toggle');
//   button.mousePressed(toggleSong);
//   song.play();
//   amp = new p5.Amplitude();
// }

// function draw() {
//   background(0);
//   let vol = amp.getLevel();
//   volhistory.push(vol);
//   stroke(255);
//   noFill();
//   push();
//   let currentY = map(vol, 0, 1, height, 0);
//   translate(0, height / 2 - currentY);
//   beginShape();
//   for (let i = 0; i < volhistory.length; i++) {
//     let y = map(volhistory[i], 0, 1, height, 0);
//     vertex(i, y);
//   }
//   endShape();
//   pop();
//   if (volhistory.length > width - 50) {
//     volhistory.splice(0, 1);
//   }

//   stroke(255, 0, 0);
//   line(volhistory.length, 0, volhistory.length, height);
//   //ellipse(100, 100, 200, vol * 200);
// }

// Run this example on a mobile device
// Rotate the device by 90 degrees in the
// X-axis to change the value.

let value = 0;
function draw() {
  fill(value);
  rect(25, 25, 50, 50);
  describe(`50-by-50 black rect in center of canvas.
    turns white on mobile when device turns`);
  describe(`50-by-50 black rect in center of canvas.
    turns white on mobile when x-axis turns`);
}
function deviceTurned() {
  if (turnAxis === 'X') {
    if (value === 0) {
      value = 255;
    } else if (value === 255) {
      value = 0;
    }
  }
}

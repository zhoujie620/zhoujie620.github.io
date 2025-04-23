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

let boxes = []; // 存储所有方块的数组
const numBoxes = 20; // 方块的数量
const boxSize = 50; // 方块的尺寸
const gravity = 0.5; // 重力加速度

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // 初始化多个方块
  for (let i = 0; i < numBoxes; i++) {
    boxes.push(new Box(random(width), random(height), boxSize));
  }
}

function draw() {
  background(30);

  // 更新并显示所有方块
  for (let box of boxes) {
    box.update();
    box.display();
  }
}

// 方块类
class Box {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
    this.vx = 0; // 水平速度
    this.vy = 0; // 垂直速度
    this.damping = 0.8; // 反弹阻尼系数
  }

  // 更新方块位置
  update() {
    // 获取设备的加速度数据
    let ax = accelerationX;
    let ay = accelerationY;

    // 根据加速度更新水平速度
    this.vx += ax * 0.1;
    this.vy += gravity; // 应用重力加速度

    // 更新方块位置
    this.x += this.vx;
    this.y += this.vy;

    // 边界检测和反弹
    if (this.x < 0 || this.x + this.size > width) {
      this.vx *= -this.damping; // 水平反弹
      this.x = constrain(this.x, 0, width - this.size);
    }
    if (this.y + this.size > height) {
      this.vy *= -this.damping; // 垂直反弹
      this.y = constrain(this.y, 0, height - this.size);
    }
  }

  // 显示方块
  display() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}

// 窗口大小变化时调整画布
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

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

let ball; // 小球对象
let gravity; // 重力向量
let permissionGranted = false; // 权限是否已授予

function setup() {
  createCanvas(windowWidth, windowHeight); // 创建画布，适应屏幕大小
  ball = new Ball(width / 2, height / 2, 30); // 初始化小球
  gravity = createVector(0, 0); // 初始化重力向量

  // 检查是否需要请求权限
  if (typeof(DeviceOrientationEvent) !== 'undefined' && DeviceOrientationEvent.requestPermission) {
    // 显示提示信息
    textSize(20);
    textAlign(CENTER, CENTER);
    text("点击屏幕以允许访问设备方向数据", width / 2, height / 2);
  } else {
    // 如果不需要请求权限，直接监听设备方向事件
    permissionGranted = true;
    window.addEventListener('deviceorientation', handleOrientation);
  }
}

function draw() {
  background(220);

  if (!permissionGranted) {
    // 如果权限未授予，显示提示信息
    textSize(20);
    textAlign(CENTER, CENTER);
    text("点击屏幕以允许访问设备方向数据", width / 2, height / 2);
    return;
  }

  // 更新重力向量
  updateGravity();

  // 应用重力到小球
  ball.applyForce(gravity);

  // 更新小球位置
  ball.update();
  ball.edges(); // 处理边界碰撞
  ball.display(); // 显示小球
}

// 更新重力向量
function updateGravity() {
  if (permissionGranted) {
    // 如果权限已授予，直接监听设备方向事件
    window.addEventListener('deviceorientation', handleOrientation);
  }
}

// 处理设备方向事件
function handleOrientation(event) {
  // 获取设备的 beta（前后倾斜）和 gamma（左右倾斜）角度
  let beta = radians(event.beta); // 前后倾斜角度（-180 到 180）
  let gamma = radians(event.gamma); // 左右倾斜角度（-90 到 90）

  // 根据角度计算重力向量
  gravity.x = sin(gamma) * 0.5; // 左右倾斜影响 x 方向
  gravity.y = sin(beta) * 0.5; // 前后倾斜影响 y 方向
}

// 小球类
class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y); // 位置
    this.vel = createVector(0, 0); // 速度
    this.acc = createVector(0, 0); // 加速度
    this.r = r; // 半径
  }

  // 应用力
  applyForce(force) {
    this.acc.add(force);
  }

  // 更新位置
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // 重置加速度
  }

  // 处理边界碰撞
  edges() {
    if (this.pos.x < this.r) {
      this.pos.x = this.r;
      this.vel.x *= -0.8; // 反弹并减少速度
    } else if (this.pos.x > width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -0.8;
    }

    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y *= -0.8;
    } else if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -0.8;
    }
  }

  // 显示小球
  display() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

// 点击屏幕时请求权限
function touchStarted() {
  if (!permissionGranted && typeof(DeviceOrientationEvent) !== 'undefined' && DeviceOrientationEvent.requestPermission) {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          permissionGranted = true;
          window.addEventListener('deviceorientation', handleOrientation);
        }
      })
      .catch(console.error);
  }
  return false; // 阻止默认行为
}

let socket = io();
let color_1;
let color_2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(0);
  background(bgColor);
  color_1=color(255,153,50);
  color_2=color(100,0,100);
}


function draw() {
}

socket.on("relay", (msg) => {
  if (msg.type === "rot") {
     let c=lerpColor(color_1,color_2,map(msg.rot_z,0,360,0,1))
      background(c);
  }
});
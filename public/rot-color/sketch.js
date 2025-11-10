let socket = io();
let accWithGravity = { x: 0, y: 0, z: 0 };
let color_1;
let color_2;


function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(230);
  background(bgColor);
  // socket = io();
  textAlign(CENTER, CENTER);
  textSize(64);
  color_1=color(255,153,50);
  color_2=color(100,0,100);
}

function draw() {
  // background(bgColor);
  if (!started ) {
    background(0, 0, 0);
    fill(255);
    text("Please tap to begin", width / 2, height / 2);
  } else {
    // let c=lerpColor(color_1,color_2,map(rotationZ,0,360,0,1))
    // background(c);
    let rot_x = round(rotationX * 100) / 100; //this just makes xx.xx decimal places
    let rot_y = round(rotationY * 100) / 100;
    let rot_z = round(rotationZ * 100) / 100;
    background(rot_x,rot_y,rot_z)

    text(
      "x: rot: "+ rot_x +
        "\ny: rot: " + rot_y +
        "\nz: rot: " + rot_z,
      width / 2,
      height / 2,
    );
    let data={type:"rot",rot_z:rot_z}
    socket.emit("relay",data);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// below code is essential for ios13 and above.
// A click is needed for the device to request permission
function touchStarted() {
  if (!started) {
    askPermission();
  }
}


socket.on("relay", (msg) => {
  //
  if (msg.type === "rot") {
     let c=lerpColor(color_1,color_2,map(msg.rot_z,0,360,0,1))
      background(c);
  }
});
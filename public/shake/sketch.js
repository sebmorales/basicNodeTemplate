let socket = io();

//array of answers
let msg = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes – definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don’t count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful",
];

let currentMsg = "";

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(0, 0, 0); //rgb
  background(bgColor);
  // socket = io();
  textAlign(CENTER, CENTER);
  textSize(64);
}

function draw() {
  // background(bgColor);
  if (started == false) {
    background(0, 0, 0);
    fill(255);
    text("Please tap to begin, \nthen shake!", width / 2, height / 2);
  } else {
    background(0, 0, 0, 2);
  }
}

//p5 function that is called when the device is shaken
function deviceShaken() {
  currentMsg = random(msg);
  background(60, 10, 150);
  text(currentMsg, width / 2, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// below code is essential for ios13 and above.
// A click is needed for the device to request permission
function touchStarted() {
  if (started == false) {
    askPermission();
  }
}

socket.on("connect", () => {
  // user_id = socket.id;
  console.log("connection established");
  // stars.push(new Star(-100, -100, user_id));
});

socket.on("relay", (data) => {
  if (data.type === "shake") {
    started = true;
    currentMsg = random(msg);
    background(60, 10, 150);
    text(currentMsg, width / 2, height / 2);
  }
});

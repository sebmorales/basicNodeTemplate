let socket = io();

// All available sounds and images
const allSounds = ['bird1.mp3', 'bubble1.wav', 'bubble2.wav', 'bubble3.wav', 'bubble4.wav', 'bubble5.wav', 'bubble6.wav', 'bubble7.wav', 'click.wav', 'click2.wav', 'click3.wav', 'click4.wav', 'click5.wav', 'cracking1.wav', 'cracking2.wav', 'cracking3.wav', 'cracking4.wav', 'pop.wav'];

const allImages = ['bug.jpg', 'cat.gif', 'giphy.gif', 'moodeng.gif', 'moodeng2.gif', 'thumbnails_computer.jpg', 'thumbnails_forest.jpg', 'thumbnails_sky.jpg', 'thumbnails_subway.jpg', 'thumbnails_taxi.jpg', 'thumbnails_underground.jpg'];

// Participant's random selection
let mySounds = [];
let myImages = [];
let soundButtons = [];
let imageButtons = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Get 4 random sounds and images
  mySounds = getRandomItems(allSounds, 4);
  myImages = getRandomItems(allImages, 4);
  
  // Create sound buttons using p5.dom
  for(let i = 0; i < 4; i++) {
    let btn = createButton(`${mySounds[i].split('.')[0]}`);
    btn.position(50 + i * 80, 120);
    btn.size(60, 40);
    btn.mousePressed(() => sendSound(mySounds[i]));
    soundButtons.push(btn);
  }
  
  // Create image buttons using p5.dom
  for(let i = 0; i < 4; i++) {
    let btn = createButton(`${myImages[i].split('.')[0]}`);
    btn.position(50 + i * 80, 260);
    btn.size(60, 40);
    btn.mousePressed(() => sendImage(myImages[i]));
    imageButtons.push(btn);
  }
  
  console.log('My sounds:', mySounds);
  console.log('My images:', myImages);
}

function draw() {
  background(240);
  
  // Title
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  text('Participant Interface', width/2, 30);
  
  // Sound section title
  textSize(18);
  text('SOUNDS', width/2, 80);
  
  // Image section title
  text('IMAGES', width/2, 220);
  
  // Instructions
  textSize(14);
  fill(100);
  text('Click buttons to send sounds/images', width/2, 350);
}

function getRandomItems(array, count) {
  let shuffled = array.slice();
  for(let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function sendSound(soundName) {
  let data = {
    type: 'sound',
    value: soundName
  };
  
  socket.emit('relay', data);
  
  // Visual feedback
  fill(0, 255, 0, 100);
  noStroke();
  rect(0, 0, width, height);
}

function sendImage(imageName) {
  let data = {
    type: 'image', 
    value: imageName
  };
  
  socket.emit('relay', data);
  console.log('Sent image:', imageName);
  
  // Visual feedback
  fill(0, 0, 255, 100);
  noStroke();
  rect(0, 0, width, height);
}
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
  
  let buttonHeight = windowHeight / 12;
  let buttonMargin = 20;
  let buttonWidth = windowWidth - (buttonMargin * 2);
  
  // Create sound buttons using p5.dom (full width, stacked)
  for(let i = 0; i < 4; i++) {
    let btn = createButton(`SOUND: ${mySounds[i].split('.')[0]}`);
    btn.position(buttonMargin, buttonHeight * (i + 1));
    btn.size(buttonWidth, buttonHeight);
    btn.style('font-size', `${windowHeight/16}px`);
    btn.mousePressed(() => sendSound(mySounds[i]));
    soundButtons.push(btn);
  }
  
  // Create image buttons using p5.dom (full width, stacked)
  for(let i = 0; i < 4; i++) {
    let btn = createButton(`IMAGE: ${myImages[i].split('.')[0]}`);
    btn.position(buttonMargin, buttonHeight * (i + 6));
    btn.size(buttonWidth, buttonHeight);
    btn.style('font-size', `${windowHeight/16}px`);
    btn.mousePressed(() => sendImage(myImages[i]));
    imageButtons.push(btn);
  }
  
  console.log('My sounds:', mySounds);
  console.log('My images:', myImages);
}

function draw() {
  background(255);
  
  // Title
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(windowHeight/16);
  text('Participant Interface', width/2, windowHeight/24);
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
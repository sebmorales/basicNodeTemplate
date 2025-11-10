// Draw Example - Interactive drawing canvas that sends data to other clients
// This example shows how to send real-time drawing data using Socket.io

const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

// Listen for drawing data from other clients
socket.on('test', (data) => {
  if (data && data.length >= 3) {
    fill(data[3] || 255, data[4] || 255, data[5] || 255, 100);
    ellipse(data[0], data[1], data[2]);
  }
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
}

function draw() {
  // Generate random colors for this user's drawing
  const colors = [random(255), random(255), random(255)];
  fill(...colors);
  
  // Create drawing data: [x, y, size, red, green, blue]
  const value = [mouseX, mouseY, random(5, 20), ...colors];
  
  // Draw locally
  ellipse(value[0], value[1], value[2]);
  
  // Send drawing data to server (which broadcasts to all clients)
  socket.emit('test', value);
}
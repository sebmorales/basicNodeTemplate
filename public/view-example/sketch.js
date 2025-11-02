// View Example - Viewer canvas that only receives and displays data from other clients
// This example shows how to listen for real-time data using Socket.io

const socket = io();

socket.on('connect', () => {
  console.log('Connected to server as viewer');
});

// Listen for drawing data from other clients
socket.on('test', (value) => {
  if (value && value.length >= 3) {
    // Destructure the incoming data: [x, y, size, red, green, blue]
    const [x, y, size, r = 255, g = 255, b = 255] = value;
    
    // Use the received colors with some transparency variation
    fill(r, g, b, random(50, 200));
    console.log(`Drawing ellipse at ${x}, ${y} with size ${size}`);
    
    // Draw the received data
    ellipse(x, y, size);
  }
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
}

function draw() {
  // Viewer mode - no local drawing, only receiving and displaying data from others
  // The canvas only updates when data is received via Socket.io
}
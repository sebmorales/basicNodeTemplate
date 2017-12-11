var socket = io('');
socket.on('connect', function(){
});

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(20);
}

function draw(){
  fill(random(255),random(255),random(255));
  ellipse(mouseX,mouseY,random(5,20));
  socket.emit("test",mouseX+" "+mouseY);
}

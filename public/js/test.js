var socket = io('');
socket.on('connect', function(){
});

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(20);
}

function draw(){
  fill(random(255),random(255),random(255));
  var value=[mouseX,mouseY,random(5,20)]
  ellipse(value[0],value[1],value[2]);
  socket.emit("test",value);
}

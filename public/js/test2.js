var socket = io('');
var fromSocket=[0,0,0];
socket.on('connect', function(){

  socket.on('test', function(value){
    fill(random(10,240));
    console.log('drawing ellipse'+value[0]+" "+value[1]+" "+value[2]);
    ellipse(value[0],value[1],value[2]);

  });

});

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(20);
}

function draw(){

}

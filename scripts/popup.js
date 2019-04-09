//Uses the canvas API
//Pretty straightforward, makes drawing to screen simple
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

console.log("aaaaaaaaaaaah");

//'visualizer' is the canvas specified in popup.html
canvas = document.getElementById('visualizer');
//Obvi we are rendering 2d
canvasContext = canvas.getContext("2d");

var WIDTH = 500;
var HEIGHT = 500;
console.log("aaaaaaaaaaaah");
//This line will connect to onclick_background.js
var port = chrome.runtime.connect();

//Sends the message 'start' to onclick_background
//Message doesn't matter, we just want the message to go through.
port.postMessage({ action: 'start' });

port.onMessage.addListener(function (message) {
  //from onclick_background
  var dataArr = message.data;
  var bufferL = message.bufferLength;

  canvasContext.fillStyle = 'rgb(50, 50, 70)';
  canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
  canvasContext.lineWidth = 1;

  //We draw the canvas like a long brush stroke.
  //This let's the canvas know we are ready to draw.
  canvasContext.beginPath();

  //thiccness of our line
  var LineWidth = WIDTH * 1.0 / bufferL;

  var x = 0;

  for (var i = 0; i < bufferL; i++) {
    //Don't combine the next two lines of code (things break idk)
    var data = dataArr[i];
    //divide by 128 to get centered vertically
    var v = data / 128.0;
    var y = v * HEIGHT / 2;

    var r = 300 - data;
    var g = 185;
    var b = 225;

    //random Linewidth
    var numarr = [1, 2, 3, 4, 10];
    canvasContext.lineWidth = numarr[Math.floor(Math.random() * numarr.length)];

    canvasContext.strokeStyle = 'rgb(' + r + ' , ' + g + ', ' + b + ')';
    if (i === 0) {
      canvasContext.moveTo(x, y);
    }
    else {
      canvasContext.lineTo(x, y);

    }
    x += LineWidth;

  }
  canvasContext.lineTo(canvas.width, canvas.height / 2);
  canvasContext.stroke();
})

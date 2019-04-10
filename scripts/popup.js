//Uses the canvas API
//Pretty straightforward, makes drawing to screen simple
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

//'visualizer' is the canvas specified in popup.html
canvas = document.getElementById('visualizer');
//Obvi we are rendering 2d
canvasContext = canvas.getContext("2d");

var WIDTH = 500;
var HEIGHT = 250;
//This line will connect to onclick_background.js
var port = chrome.runtime.connect();
//Runs when message is received from onclick_background.js with data from stream


/**
 *
 * @constructor
 * @param {var} message
 */
port.onMessage.addListener(function (message) {
  //from onclick_background
  var dataArr = message.data;
  var bufferL = message.bufferLength;

  canvasContext.fillStyle = 'rgb(255, 255, 255)';
  canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
  canvasContext.lineWidth = 1;

  //We draw the canvas like a long brush stroke.
  //This lets the canvas know we are ready to draw.
  canvasContext.beginPath();

  //thiccness of our line
  var LineWidth = WIDTH / bufferL;

  var x = 0;
  var max = 0;
  for (var i = 0; i < bufferL; i++) {
    //Don't combine the next two lines of code (things break idk)
    var data = dataArr[i];
    console.log(dataArr);

    var v = (data*HEIGHT)/2.0;
    var y = v/128.0;

    var r = 300 - data;
    var g = 185;
    var b = 225;

    canvasContext.lineWidth = LineWidth;

    canvasContext.fillStyle = 'rgb(' + r + ' , ' + g + ', ' + b + ')';

    canvasContext.fillRect(x,HEIGHT-y/2.0,LineWidth,y)

    x += LineWidth;

  }
  //canvasContext.lineTo(canvas.width, canvas.height*2);
  //canvasContext.stroke();
})

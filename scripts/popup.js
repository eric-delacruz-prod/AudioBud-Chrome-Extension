//Uses the canvas API
//Pretty straightforward, makes drawing to screen simple
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

//'visualizer' is the canvas specified in popup.html
canvas = document.getElementById('visualizer');
//Obvi we are rendering 2d
canvasContext = canvas.getContext("2d");

var WIDTH = canvas.width;
var HEIGHT = canvas.height;
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

  //thiccness of our line
  var LineWidth = WIDTH / bufferL


  canvasContext.fillStyle = 'rgb(0, 0, 0)';
  canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
  canvasContext.lineWidth = LineWidth;

  //We draw the canvas like a long brush stroke.
  //This lets the canvas know we are ready to draw.
  canvasContext.beginPath();

  var x = 0;
  var max = 0;
  //I have the array starting at 4 because the lower frequencies
  //always seem to be maxing out and I think it looks bad.
  for (var i = 0; i < bufferL; i++) {
    //Don't combine the next two lines of code (things break idk)
    var data = dataArr[i];

    // 0 <= data <= 255
    // so, right now height is 250px
    // Need to normalize the range
    // And then we span the height
    var v = (data)/255
    var y = v*HEIGHT

    var r = 300 - data;
    var g = 185;
    var b = 225;


    canvasContext.fillStyle = 'rgb(' + r + ' , ' + g + ', ' + b + ')';

    // x is the x coordinate of upper left corner
    // HEIGHT-y/2.0 is the y coordinate of upper left corner
    // LineWidth is the width of the rect in pix
    // and y is the height of the rect in pix
    canvasContext.fillRect(x,HEIGHT-y,LineWidth,y)

    x += LineWidth;

  }
  //canvasContext.lineTo(canvas.width, canvas.height*2);
  //canvasContext.stroke();
})

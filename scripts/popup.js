/*let act = document.getElementById('act');


act.onclick = function() {
    console.log("act pressed")
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "#6bdcfe";'});
        console.log("BGcolor Changed")
  });
};*/
/*chrome.tabs.query({active:true},function(tabs) {
  console.log(tabs);
  chrome.runtime.sendMessage({message:"start",data:tabs[0]});
})*/
console.log("aaaaaaaaaaaah");

canvas = document.getElementById('visualizer');
canvasCtx = canvas.getContext("2d");

var WIDTH = 500;
var HEIGHT = 500;
console.log("aaaaaaaaaaaah");
var port = chrome.runtime.connect();
port.postMessage({action: 'start'});

port.onMessage.addListener(function(message) {
  var dataArr = message.data;
  var bufferL = message.bufferLength;

  canvasCtx.fillStyle = 'rgb(242, 242, 242)';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.lineWidth = 2;
  canvasCtx.beginPath();

  var LineWidth = WIDTH * 1.0 / bufferL;

  var x = 0;

  for(var i=0 ; i < bufferL; i++)
  {
    var data = dataArr[i];
    var v = data / 128.0;
    var y = v * HEIGHT/2;

    var r = data + 120;
    var g = 255 - data;
    var b = data / 3;

    canvasCtx.strokeStyle =  'rgb(' + r +' , ' + g + ', ' + b + ')';
    if(i === 0)
    {
      canvasCtx.moveTo(x, y);
    }
    else{
      canvasCtx.lineTo(x,y);
    }
    x += LineWidth;

  }
  canvasCtx.lineTo(canvas.width, canvas.height/2);
  canvasCtx.stroke();
})

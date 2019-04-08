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

var WIDTH = 300;
var HEIGHT = 300;
console.log("aaaaaaaaaaaah");
var port = chrome.runtime.connect();
port.postMessage({action: 'start'});

port.onMessage.addListener(function(msg) {
  var dataArray = msg.data;
  var bufferLength = msg.bufferLength;

  canvasCtx.fillStyle = 'rgb(242, 242, 242)';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  //canvasCtx.lineWidth = 2;
  //canvasCtx.beginPath();
})

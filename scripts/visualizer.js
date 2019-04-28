var port = chrome.runtime.connect();
var connected;
console.log("Connected");
port.onMessage.addListener(function(message) {
    var dataArr = message.data;
    var bufferL = message.bufferLength; 
    if(!Boolean(connected)) {
        connected = 1;
        canvasContainer = document.createElement('div');
        canvasContainer.setAttribute("class","audioVisualizerContainer");
        document.body.appendChild(canvasContainer);
        canvasContainer.style.position="absolute";
        canvasContainer.style.left="0px";
        canvasContainer.style.top="0px";
        canvasContainer.style.width="100%";
        canvasContainer.style.height="100%";
        canvasContainer.style.zIndex="1000";
        audioCanvas = document.createElement('canvas');
        audioCanvas.style.width = document.body.clientHeight;
        audioCanvas.style.height = document.body.clientWidth;
        audioCanvas.height = document.body.clientHeight;
        audioCanvas.width = document.body.clientWidth;
        audioCanvas.style.overflow = 'visible';
        audioCanvas.style.position = 'absolute';
        audioCanvas.ctx = audioCanvas.getContext("2d");
        canvasContainer.appendChild(audioCanvas);
    } 
    var dataArr = message.data;
    var bufferL = message.bufferLength;
    var frame = requestAnimationFrame(function() {
        audioCanvas.ctx.clearRect(0,0,audioCanvas.width,audioCanvas.height);
        audioCanvas.ctx.fillStyle = "rgb(165, 165, 165)";
        audioCanvas.ctx.fillRect(0,0,3000,2000);
        var recWidth = (3000 / bufferL);
        var recHeight;
        var x = 0;
        audioCanvas.ctx.beginPath();
        for (var i = 0; i < bufferL; i++) {
            var data = dataArr[i];
            recHeight = Math.round(data)
            var r = 300 - data;
            var g = 185;
            var b = 225;
            audioCanvas.ctx.fillStyle = "rgb(" + (300-recHeight*2) + "," + (185-recHeight) + "," + (185-recHeight) + ")";
            audioCanvas.ctx.fillRect(x,0,recWidth,recHeight*3.5);
            x += recWidth;
        }
        audioCanvas.ctx.closePath();
    });
});
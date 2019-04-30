var port = chrome.runtime.connect();
var connected;
let visual;
let count = 0;
console.log("Connected");

port.onMessage.addListener(function(message) {
    var active = message.active;
    console.log(active);

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
        audioCanvas.style.width = 1600;
        audioCanvas.style.height = document.body.clientWidth;
        audioCanvas.height = 1600;
        audioCanvas.width = document.body.clientWidth;
        audioCanvas.style.overflow = 'visible';
        audioCanvas.style.position = 'absolute';
        audioCanvas.ctx = audioCanvas.getContext("2d");
        canvasContainer.appendChild(audioCanvas);
    }
    if(!Boolean(active)){
        port.disconnect();
        connected = 0;
        canvasContainer.removeChild(audioCanvas);
        document.body.removeChild(canvasContainer);

    }



    // Calling update every time would probably be too taxing on program.
    if(count === 10){
      chrome.storage.sync.get(['visuals'], function(result){
        visual = result.visuals;
      });
      count = 0;
    }
    else {
      count++;
    }


    var dataArr = message.data;
    var bufferL = message.bufferLength;
    var frame = requestAnimationFrame(function() {
        audioCanvas.ctx.clearRect(0,0,audioCanvas.width,1600);
        audioCanvas.ctx.fillStyle = "rgb(50, 50, 70)";
        audioCanvas.ctx.fillRect(0,0,audioCanvas.width,1600);
        var recVertWidth = (audioCanvas.width / bufferL);
        var recVertHeight;
        var recHorzHeight = (1600 / bufferL);
        var recHorzWidth;
        var x = 0;
        var y = 0;
        audioCanvas.ctx.beginPath();
        for (var i = 0; i < bufferL; i++) {
            var data = dataArr[i];
            recVertHeight = Math.round(data)
            recHorzWidth = Math.round(data)

            if(visual === 'RLs'){
              //Solid Bars: Right -> Left
              audioCanvas.ctx.fillStyle = "rgb(" + (300-recHorzWidth) + "," + (185-recHorzHeight) + "," + (185-recHorzWidth) + ")";
              audioCanvas.ctx.fillRect(0,y,recHorzWidth*4,recHorzHeight);
            }
            else if(visual === 'LRs'){
              //Solid Bars: Left -> Right
              audioCanvas.ctx.fillStyle = "rgb(" + (300-recHorzWidth) + "," + (185-recHorzHeight) + "," + (185-recHorzWidth) + ")";
              audioCanvas.ctx.fillRect(audioCanvas.width,y,-recHorzWidth*4,recHorzHeight);
            }
            else if(visual === 'LRRLs'){
              //Solid Bars: Left -> Right & Right -> Left
              audioCanvas.ctx.fillStyle = "rgb(" + (300-recHorzWidth) + "," + (185-recHorzHeight) + "," + (185-recHorzWidth) + ")";
              audioCanvas.ctx.fillRect(0,y,recHorzWidth*2,recHorzHeight);
              audioCanvas.ctx.fillStyle = "rgb(" + (300-recHorzWidth) + "," + (185-recHorzHeight) + "," + (185-recHorzWidth) + ")";
              audioCanvas.ctx.fillRect(audioCanvas.width,y,-recHorzWidth*2,recHorzHeight);
            }
            else{
              //Solid Bars: Top -> Down
              audioCanvas.ctx.fillStyle = "rgb(" + (300-recVertHeight) + "," + (185-recVertHeight) + "," + (185-recVertHeight) + ")";
              audioCanvas.ctx.fillRect(x,0,recVertWidth,recVertHeight*2);
            }

            /*
            //Segmented Bars: Top -> Down NOT WORKING - HOLD IMPLEMENTATION
            audioCanvas.ctx.fillStyle = "rgb(" + (300-recVertHeight) + "," + (185-recVertHeight) + "," + (185-recVertHeight) + ")";
            audioCanvas.ctx.fillRect(x,0,recVertWidth,recVertHeight/2);
            audioCanvas.ctx.fillRect(x,recVertHeight/2+20,recVertWidth,recVertHeight/2);
            audioCanvas.ctx.fillRect(x,(2*(recHVerteight/2)+20)+20,recWidth,recVertHeight/2);
            audioCanvas.ctx.fillRect(x,((2*(recVertHeight/2)+20)+20)+recVertHeight/2+20,recVertWidth,recVertHeight/2);
            audioCanvas.ctx.fillRect(x,(((2*(reVertcHeight/2)+20)+20)+recVertHeight/2+20)+recVertHeight/2+20,recVertWidth,recVertHeight/2);
            */

            x += recVertWidth;
            y += recHorzHeight
        }
        audioCanvas.ctx.closePath();
    });
});

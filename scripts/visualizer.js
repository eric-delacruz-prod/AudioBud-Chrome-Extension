var port = chrome.runtime.connect();
var connected;
let visual;
let count = 0;
let testRun = false;
console.log("Connected");

port.onMessage.addListener(function(message) {
  chrome.storage.sync.get(['testRun'], function(result) {
    testRun = result.testRun;
  });
    var active = message.active;
    console.log(active);

    var dataArr = message.data;
    var bufferL = message.bufferLength-150;
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

    /*if (testRun == true) {
      ///////////////////
      //////TEST 12///////
      ///////////////////
      console.log("Test 12: Check that visuals value is valid");
      let isPassed = false;
      if (visual == 'RLs' || visual == 'LRs' || visual == 'LRRLs' || visual == 'TDs') {
        isPassed = true;
      }
      console.log('Result: ');
      console.log(isPassed);
    }*/


    var dataArr = message.data;
    var bufferL = message.bufferLength-40;
    var frame = requestAnimationFrame(function() {
        audioCanvas.ctx.clearRect(0,0,audioCanvas.width,1600);
        audioCanvas.ctx.fillStyle = "rgb(0, 0, 00)";
        audioCanvas.ctx.fillRect(0,0,audioCanvas.width,1600);
        var recVertWidth = (audioCanvas.width / bufferL);
        var recVertHeight;
        var recHorzHeight = (1600 / bufferL);
        var recHorzWidth;
        var x = 0;
        var y = 0;
        var total = 0;
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
            else if(visual === 'TDs'){
              //Solid Bars: Top -> Down
              audioCanvas.ctx.fillStyle = "rgb(" + (300-recVertHeight) + "," + (185-recVertHeight) + "," + (185-recVertHeight) + ")";
              audioCanvas.ctx.fillRect(x,0,recVertWidth,recVertHeight*2);
            }
            else if(visual === 'PEs'){
              //Pulsing Ellipse: Average Data
              total += Math.round(data);
              if(i == bufferL-1) {
                var gradient = audioCanvas.ctx.createLinearGradient(0, 0, audioCanvas.width, 0);
                gradient.addColorStop("0", "rgb(107, 220, 254)");
                gradient.addColorStop("1.0", "rgb(200, 104, 191)");
                
                var avg = total/bufferL;
                
                audioCanvas.ctx.strokeStyle = gradient;
                audioCanvas.ctx.arc(audioCanvas.width/2,500,avg/2, 0, 2 * Math.PI);
                audioCanvas.ctx.stroke();
                audioCanvas.ctx.closePath();
                audioCanvas.ctx.beginPath();
                audioCanvas.ctx.strokeStyle = gradient;
                audioCanvas.ctx.arc(audioCanvas.width/2,500,avg, 0, 2 * Math.PI);
                audioCanvas.ctx.stroke();
                audioCanvas.ctx.closePath();
                audioCanvas.ctx.beginPath();
                audioCanvas.ctx.strokeStyle = gradient;
                audioCanvas.ctx.arc(audioCanvas.width/2,500,avg*2, 0, 2 * Math.PI);
                audioCanvas.ctx.stroke();
                audioCanvas.ctx.closePath();
                audioCanvas.ctx.beginPath();
                audioCanvas.ctx.strokeStyle = gradient;
                audioCanvas.ctx.arc(audioCanvas.width/2,500,avg*3, 0, 2 * Math.PI);
                audioCanvas.ctx.stroke();
                audioCanvas.ctx.closePath();
                audioCanvas.ctx.beginPath();
                audioCanvas.ctx.strokeStyle = gradient;
                audioCanvas.ctx.arc(audioCanvas.width/2,500,avg*4, 0, 2 * Math.PI);
                audioCanvas.ctx.stroke();
                audioCanvas.ctx.closePath();
                audioCanvas.ctx.beginPath();
              }
            }
            else {
              //Ellipse Bars: Frequency
              var radWidth = Math.PI * 2 / bufferL-100;
              var barx_end = audioCanvas.width/2 + Math.cos(radWidth * i)*(recVertHeight);
              var bary_end = 500 + Math.sin(radWidth * i)*(recVertHeight);
              audioCanvas.ctx.strokeStyle = "rgb(" + (300-recVertHeight) + "," + (185-recVertHeight) + "," + (185-recVertHeight) + ")";
              audioCanvas.ctx.lineWidth = radWidth;
              audioCanvas.ctx.moveTo(audioCanvas.width/2,500);
              audioCanvas.ctx.lineTo(barx_end,bary_end);
              audioCanvas.ctx.stroke();
              audioCanvas.ctx.closePath();
              audioCanvas.ctx.beginPath();
            }
            
            x += recVertWidth;
            y += recHorzHeight;
        }

        audioCanvas.ctx.closePath();
    });
});

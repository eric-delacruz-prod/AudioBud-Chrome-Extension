let active = false;
let sampleTrack = new Audio('misc/Bon Iver - Blood Bank_Proxy.mp3');
var background = {
  init: function() {
    //chrome.browserAction.onClicked.addListener(background.onClick);
    chrome.runtime.onMessage.addListener(background.onMessage);
    chrome.runtime.onConnect.addListener(background.onClick);
  },
  onClick: function(port) {
    if(active == false) {
        var audioCtx = new AudioContext();
        chrome.tabCapture.capture({
          audio : true,
          video : false
        }, function(stream) {
          console.log("fjfjasldkjfasejdf");
          var audioSourceNode = audioCtx.createMediaStreamSource(stream);
          var analyserNode = audioCtx.createAnalyser();
          audioSourceNode.connect(analyserNode);
          analyserNode.connect(audioCtx.destination);

          analyserNode.fftSize = 1024;
          console.log("ayylmao");
          var bufferLength = analyserNode.frequencyBinCount;
          var dataArray = new Uint8Array(bufferLength);
          console.log("wat");

          function draw() {
            analyserNode.getByteTimeDomainData(dataArray);
            port.postMessage({data: dataArray, bufferLength: bufferLength});
          };

          var intv = setInterval(function(){ draw() }, 1000 / 30);
          port.onDisconnect.addListener(function() {
            clearInterval(intv);
            audioCtx.close();
            stream.getAudioTracks()[0].stop();
          });

        })
    }
    else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tab.id,
                {code: 'document.body.style.backgroundColor = "#000000";'});

                //sampleTrack.pause();

                active = false;
        });
    }
  },
  onMessage: function(message, sender, response) {
    console.log("please fo rthe lvoe of god work");
    if (message.message === "start") {

    }
  }

};
background.init();

/*chrome.runtime.onMessage.addListener(function(msg, sender) {
  console.log("this is literally the worst");
  if (msg.message == "start") {
    var audioCtx = new AudioContext();
    chrome.tabCapture.capture({
      audio: true,
      video: false
    }, function(stream) {
      var source = audioCtx.createMediaStreamSource(stream);
      //jinpark adds an analyzer here with the following
      //var analyzer = audioCtx.createAnalyser();
    })
  }
})
*/

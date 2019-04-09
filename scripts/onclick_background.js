var background = {
  init: function() {
    //chrome.browserAction.onClicked.addListener(background.onClick);
    chrome.runtime.onMessage.addListener(background.onMessage);
    chrome.runtime.onConnect.addListener(background.onConnect);
  },
  onConnect: function(port) {
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
          var buffer = analyserNode.frequencyBinCount;
          var data = new Uint8Array(buffer);
          console.log("wat");

          function draw() {
            analyserNode.getByteTimeDomainData(data);
            port.postMessage({data: data, bufferLength: buffer});
          };

          var interval = setInterval(function(){ draw() }, 1000 / 30);
          port.onDisconnect.addListener(function() {
            clearInterval(interval);
            audioCtx.close();
            stream.getAudioTracks()[0].stop();
          });
        })
    }
  }
background.init();

//We use the Web Audio API
//Here is all the documentation needed
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API



var background = {
  init: function() {
    //Use the chrome.runtime API
    chrome.runtime.onMessage.addListener(background.onMessage);
    chrome.runtime.onConnect.addListener(background.onConnect);
  },
  onConnect: function(port) {

        //Creates an AudioContext object representing an audio-processing graph
        var audioContext = new AudioContext();
        //First parameter of .capture specifies what type of
        //information we want from the capture. Here, we want audio.
        //Second is callback
        chrome.tabCapture.capture(
          {
          audio : true,
          video : false
          },
          function(stream) {
console.log("fjfjasldkjfasejdf");
          //stream is a 'MediaStream' that is our audio source
          var audioSourceNode = audioContext.createMediaStreamSource(stream);
          //Creates an analyserNode (hence its name)
          var analyserNode = audioContext.createAnalyser();

          audioSourceNode.connect(analyserNode);
          //destination is the final destination of the audio. So
          //we connect because it only makes sense to display the
          //sound which actually reaches the users ears.
          analyserNode.connect(audioContext.destination);


          //fftSize:=Fast Fourier Transform
          //Basically specifies the resolution
          //Power of 2, spans 32->32768
          analyserNode.fftSize = 16384;
console.log("ayylmao");
          //this buffer is always half the fftSize
          //This is to do with FFT definition, don't adjust here.
          var buffer = analyserNode.frequencyBinCount;
          //Data array of the buffer
          //This is our information we are to display
          var data = new Uint8Array(buffer);
console.log("wat");

          //We draw an oscilloscope reading of the audio
          function draw() {
            analyserNode.getByteTimeDomainData(data);
            //This line sends the data to popup.js
            //The data "enters" popup.js at this line
            // port.onMessage.addListener(function(message)
            port.postMessage({data: data, bufferLength: buffer});
          };

          //Determine how often we want to redraw the function
          //Second parameter (in ms) determines the interval.
          //1000 would be 1 second
          var interval = setInterval(function(){ draw() }, 1000 / 30);

          port.onDisconnect.addListener(function() {
            //close everything down so we can be good lil programmers
            clearInterval(interval);
            audioContext.close();
            stream.getAudioTracks()[0].stop();
          });
        })
    }
  }
background.init();

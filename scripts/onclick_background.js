//We use the Web Audio API
//Here is all the documentation needed
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API



var background = {
  //Initializes listeners
  init: function () {
    //Use the chrome.runtime API
    chrome.runtime.onMessage.addListener(background.onMessage);
    chrome.runtime.onConnect.addListener(background.onConnect);
  },
  //Runs audio capturing code when popup.js runs chrome.runtime.connect()
  onConnect: function (port) {
    //Creates an AudioContext object representing an audio-processing graph
    var audioContext = new AudioContext();
    //First parameter of .capture specifies what type of
    //information we want from the capture. Here, we want audio.
    //Second is callback
    chrome.tabCapture.capture(
      {
        audio: true,
        video: false
      },
      function (stream) {
        //stream is a 'MediaStream' that is our audio source
        var audioSourceNode = audioContext.createMediaStreamSource(stream);
        //Creates an analyserNode (hence its name)
        var analyserNode = audioContext.createAnalyser();
        //Creates a biquadFilter
        var filter = audioContext.createBiquadFilter();

        var selectedFilter    = 0;
        var selectedFrequency = 440;
        var selectedQValue    = 1;
        var selectedGain      = -6;

        audioSourceNode.connect(filter);

        if(selectedFilter===0){
          audioSourceNode.connect(analyserNode);
          audioSourceNode.connect(audioContext.destination);
        }
        else if(selectedFilter===1){
          filter.type = "lowpass";
          filter.frequency.value = selectedFrequency;
          filter.Q.value = selectedQValue;
          filter.gain.value = selectedGain;
          filter.connect(analyserNode);
          filter.connect(audioContext.destination);
        }
        else if(selectedFilter===2){
          filter.type = "highpass";
          filter.frequency.value = selectedFrequency;
          filter.Q.value = selectedQValue;
          filter.gain.value = selectedGain;
          filter.connect(analyserNode);
          filter.connect(audioContext.destination);
        }
        else if(selectedFilter===3){
          filter.type = "bandpass";
          filter.frequency.value = selectedFrequency;
          filter.Q.value = selectedQValue;
          filter.gain.value = selectedGain;
          filter.connect(analyserNode);
          filter.connect(audioContext.destination);
        }
        else if(selectedFilter===4){
          filter.type = "lowshelf";
          filter.frequency.value = selectedFrequency;
          filter.Q.value = selectedQValue;
          filter.gain.value = selectedGain;
          filter.connect(analyserNode);
          filter.connect(audioContext.destination);
        }
        else if(selectedFilter===5){
          filter.type = "highshelf";
          filter.frequency.value = selectedFrequency;
          filter.Q.value = selectedQValue;
          filter.gain.value = selectedGain;
          filter.connect(analyserNode);
          filter.connect(audioContext.destination);
        }
        else if(selectedFilter===6){
          filter.type = "peaking";
          filter.frequency.value = selectedFrequency;
          filter.Q.value = selectedQValue;
          filter.gain.value = selectedGain;
          filter.connect(analyserNode);
          filter.connect(audioContext.destination);
        }
        else if(selectedFilter===7){
          filter.type = "notch";
          filter.frequency.value = selectedFrequency;
          filter.Q.value = selectedQValue;
          filter.gain.value = selectedGain;
          filter.connect(analyserNode);
          filter.connect(audioContext.destination);
        }
        else if(selectedFilter===8){
          filter.type = "allpass";
          filter.frequency.value = selectedFrequency;
          filter.Q.value = selectedQValue;
          filter.gain.value = selectedGain;
          filter.connect(analyserNode);
          filter.connect(audioContext.destination);
        }
        //this sets the range
        //too low and the bars start capping out
        analyserNode.maxDecibels = -20

        //fftSize:=Fast Fourier Transform
        //Basically specifies the resolution
        //Power of 2, spans 32->32768
        var dataResolution = 512;
        analyserNode.fftSize = dataResolution;
        //this buffer is always half the fftSize
        //This is to do with FFT definition, don't adjust here.
        var buffer = analyserNode.frequencyBinCount;
        //Data array of the buffer
        //This is our information we are to display
        var data = new Uint8Array(buffer);

        //We draw an oscilloscope reading of the audio
        function draw() {

          //The buffer array has a length of dataResolution
          //And the values are between 0 and 255
          analyserNode.getByteFrequencyData(data);
          //This line sends the data to popup.js
          //The data "enters" popup.js at this line
          // port.onMessage.addListener(function(message)
          port.postMessage({ data: data, bufferLength: buffer });
        };

        //Determine how often we want to redraw the function
        //Second parameter (in ms) determines the interval.
        //1000 would be 1 second
        var interval = setInterval(function () { draw() }, 1000 / 30);

        port.onDisconnect.addListener(function () {
          //close everything down so we can be good lil programmers
          clearInterval(interval);
          audioContext.close();
          stream.getAudioTracks()[0].stop();
        });
      })
  }
}
background.init();

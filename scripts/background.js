//We use the Web Audio API
//Here is all the documentation needed
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API

  var background = {



  //Initializes listeners
  init: function () {
    //Use the chrome.runtime API
    //chrome.runtime.onMessage.addListener(background.onMessage);
    chrome.runtime.onConnect.addListener(background.onConnect);
  },
  //Runs audio capturing code when popup.js runs chrome.runtime.connect()
  onConnect: function (port) {
    myport = port;
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
        var selectedFilter    = "nofilter"
        var selectedFrequency = 440;
        var selectedQValue    = 1;
        var selectedGain      = -6;

        //stream is a 'MediaStream' that is our audio source
        var audioSourceNode = audioContext.createMediaStreamSource(stream);
        //Creates an analyserNode (hence its name)
        var analyserNode = audioContext.createAnalyser();
        //Creates a biquadFilter
        var filter = audioContext.createBiquadFilter();

        audioSourceNode.connect(filter);

          function update(){

          //Get values from the options.html
          chrome.storage.sync.get(['filter'], function(result){
            selectedFilter = result.filter;
          });
          chrome.storage.sync.get(['frequency'], function(result){
            selectedFrequency = Math.floor(result.frequency);
          });
          chrome.storage.sync.get(['Q'], function(result){
            selectedQValue = Math.floor(result.Q);
          });
          chrome.storage.sync.get(['Gain'], function(result){
            selectedGain = Math.floor(result.Gain);
          });

          //error handlind of inputs.
          if(selectedFrequency>22050)
            selectedFilter=22050;
          else if(selectedFilter<10)
            selectedFilter=10;

          if(selectedQValue>1000)
            selectedQValue=1000;
          else if(selectedQValue<.001)
            selectedQValue=.001;

          if(selectedGain>40)
            selectedGain=40;
          else if(selectedGain<-40)
            selectedGain=-40;

          console.log(selectedFrequency);

          filter.disconnect()
          audioSourceNode.disconnect()

          console.log(selectedFilter)
          if(selectedFilter==="lowpass"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          else if(selectedFilter==="highpass"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          else if(selectedFilter==="bandpass"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          else if(selectedFilter==="lowshelf"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          else if(selectedFilter==="highshelf"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          else if(selectedFilter==="peaking"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          else if(selectedFilter==="notch"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          //all pass
          else{
            audioSourceNode.connect(analyserNode);
            audioSourceNode.connect(audioContext.destination);
          }
          }




          update()
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


        var countToWorkAroundSetInterval = 0;
        //We draw an oscilloscope reading of the audio
        function draw() {

          // Calling update every time would probably be too taxing on program.
          if(countToWorkAroundSetInterval === 150){
            update();
            countToWorkAroundSetInterval = 0;
          }
          else {
            countToWorkAroundSetInterval++;
          }
          //The buffer array has a length of dataResolution
          //And the values are between 0 and 255
          analyserNode.getByteFrequencyData(data);
          //This line sends the data to popup.js
          //The data "enters" popup.js at this line
          // port.onMessage.addListener(function(message)
          active = 1;
          port.postMessage({ active: active, data: data, bufferLength: buffer });
        };

        //Determine how often we want to redraw the function
        //Second parameter (in ms) determines the interval.
        //1000 would be 1 second
        var interval = setInterval(function () { draw() }, 10 );

        myport.onDisconnect.addListener(function () {
          //close everything down so we can be good lil programmers
          clearInterval(interval);
          audioContext.close();
          stream.getAudioTracks()[0].stop();
        });
      })
  },
  call: function(port) {
    active = 0;
    myport.postMessage({active: active, data: null, bufferLength: null});
  },
  active: null,
  myport: null,
}

var pressed;

chrome.browserAction.onClicked.addListener(function(activeTab) {
  if(!Boolean(pressed)){
    console.log("on press");
    pressed = 1;
    background.init()
    chrome.tabs.executeScript(null, {file: "scripts/visualizer.js"});
  } else {
    pressed = 0;
    background.call()
    console.log("off press");
  }
});

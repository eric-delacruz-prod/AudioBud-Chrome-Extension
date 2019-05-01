//We use the Web Audio API
//Here is all the documentation needed
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API

let testRun_local = false; //Controls whether tests are run
let testLoop = 0; //Controls values for bounds testing

chrome.storage.sync.set({testRun: false}, function(){});
//Write default values, otherwise this may crash with infinite float error
chrome.storage.sync.set({filter: 'All-pass'}, function(){});
chrome.storage.sync.set({frequency: 440}, function(){});
chrome.storage.sync.set({Q: 1}, function(){});
chrome.storage.sync.set({Gain: 0}, function(){});
chrome.storage.sync.set({visuals: 'Starburt'});
chrome.storage.sync.set({colors: '#000000'})

chrome.contextMenus.create({
  title: "Test Mode",
  id: "testing",
  contexts: ["all"],
  type: "checkbox"
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "testing") {
    //Get current value of global testRun
    chrome.storage.sync.get(['testRun'], function(result) {
      testRun_local = result.testRun;
    });
    //Toggle value of testRun
    chrome.storage.sync.set({testRun: !testRun_local}, function() {});
    //Update local value of testRun
    chrome.storage.sync.get(['testRun'], function(result) {
      testRun_local = result.testRun;
      console.log("Test Mode Activated:")
      console.log(testRun_local);
    })
  }
  if (testRun_local == true) {
    testLoop = 0;
  }
});

const printResult = function(isPassed) {
  console.log('Result: ');
  console.log(isPassed);
}

var background = {
  //Initializes listeners
  init: function () {
    //Use the chrome.runtime API
    //chrome.runtime.onMessage.addListener(background.onMessage);
    if (testRun_local == true) {
      console.log("Running in test mode!");
    }
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
        var selectedFilter    = "allpass"
        var selectedFrequency = 440;
        var selectedQValue    = 1;
        var selectedGain      = -6;

        if (testRun_local == true) {
            ///////////////////
            //////TEST 1///////
            ///////////////////
            console.log("Test 1: initial filter test check if is 'allpass' ");
            let isPassed = false;
            if (selectedFilter == "allpass" ) {
              isPassed = true;
            }
            printResult(isPassed);

            ///////////////////
            //////TEST 2///////
            ///////////////////
            console.log("Test 2: initial Frequency test ");
            isPassed = false;
            if (selectedFrequency == 440 ) {
              isPassed = true;
            }
            printResult(isPassed);

            ///////////////////
            //////TEST 3///////
            ///////////////////
            console.log("Test 3: initial QValue test ");
            isPassed = false;
            if (selectedQValue    == 1 ) {
              isPassed = true;
            }
            printResult(isPassed);

            ///////////////////
            //////TEST 4///////
            ///////////////////
            console.log("Test 4: initial Gain test ");
            isPassed = false;
            if (selectedGain      == -6) {
              isPassed = true;
            }
            printResult(isPassed);
        }

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

          //////////////////////////
          //SET VALUES FOR TESTING//
          //////////////////////////

          if (testRun_local == true) {
            if (testLoop == 0) {
              selectedFrequency = 100000;
              selectedQValue = 50000;
              selectedGain = 100;
            }
            if (testLoop == 1) {
              selectedFrequency = 0;
              selectedQValue = 0;
              selectedGain = -100;
            }
          }

          //error handlind of inputs.
          if(selectedFrequency>22050)
            selectedFrequency=22050;
          else if(selectedFrequency<10)
            selectedFrequency=10;

          if(selectedQValue>1000)
            selectedQValue=1000;
          else if(selectedQValue<.001)
            selectedQValue=.001;

          if(selectedGain>40)
            selectedGain=40;
          else if(selectedGain<-40)
            selectedGain=-40;

          filter.disconnect()
          audioSourceNode.disconnect()

          if(selectedFilter==="Low-pass"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          else if(selectedFilter==="High-pass"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          else if(selectedFilter==="Band-pass"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          else if(selectedFilter==="Low-shelf"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          else if(selectedFilter==="High-shelf"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          else if(selectedFilter==="Peaking"){
            audioSourceNode.connect(filter);
            filter.type = selectedFilter;
            filter.frequency.value = selectedFrequency;
            filter.Q.value = selectedQValue;
            filter.gain.value = selectedGain;
            filter.connect(analyserNode);
            filter.connect(audioContext.destination);
          }
          else if(selectedFilter==="Notch"){
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

          ////////////////////
          //BOUNDS TESTING////
          ////////////////////

          if (testRun_local == true) {

            if (testLoop == 0) {

              ///////////////////
              //////TEST 6///////
              ///////////////////

              console.log("Test 6: Confirm that frequency upper bound works");
              let isPassed = false;
              if (selectedFrequency <= 22050) {
                isPassed = true;
              }
              printResult(isPassed);

              ///////////////////
              //////TEST 7///////
              ///////////////////

              console.log("Test 7: Confirm that QValue upper bound works");
              isPassed = false;
              if (selectedQValue <= 1000) {
                isPassed = true;
              }
              printResult(isPassed);

              ///////////////////
              //////TEST 8///////
              ///////////////////

              console.log("Test 8: Confirm that gain upper bound works");
              isPassed = false;
              if (selectedGain <= 40) {
                isPassed = true;
              }
              printResult(isPassed);
            }

            else if (testLoop == 1) {

              ///////////////////
              //////TEST 9///////
              ///////////////////

              console.log("Test 9: Confirm that frequency lower bound works");
              isPassed = false;
              if (selectedFrequency >= 10) {
                isPassed = true;
              }
              printResult(isPassed);

              ///////////////////
              //////TEST 10///////
              ///////////////////

              console.log("Test 10: Confirm that QValue lower bound works");
              isPassed = false;
              if (selectedQValue >= .001) {
                isPassed = true;
              }
              printResult(isPassed);

              ///////////////////
              //////TEST 11///////
              ///////////////////

              console.log("Test 11: Confirm that gain lower bound works");
              isPassed = false;
              if (selectedGain >= -40) {
                isPassed = true;
              }
              printResult(isPassed);
            }

            if (testLoop < 2) {
              testLoop++;
            }
          }

          ///////////////////////////
          //END OF BOUNDS TESTING//
          //////////////////////////

          }

          ///////////////////
          //////TEST 5///////
          ///////////////////

          if (testRun_local == true) {
            console.log("Test 5: Confirm that an existing filter is used");
            isPassed = false;
            if (selectedFilter == 'lowpass' || selectedFilter == 'highpass'
              || selectedFilter == 'bandpass' || selectedFilter == 'lowshelf'
              || selectedFilter == 'highshelf' || selectedFilter == 'peaking'
              || selectedFilter == 'notch' || selectedFilter == 'allpass') {
                isPassed = true;
              }
              printResult(isPassed);
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
          if(countToWorkAroundSetInterval === 100){
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

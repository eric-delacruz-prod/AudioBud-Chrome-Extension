let active = false;
let sampleTrack = new Audio('misc/Bon Iver - Blood Bank_Proxy.mp3');
var background = {
  init: function() {
    chrome.browserAction.onClicked.addListener(background.onClick);
    chrome.runtime.onMessage.addListener(background.onMessage);
  },
  onClick: function(tab) {
    if(active == false) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tab.id,
                {code: 'document.body.style.backgroundColor = "#777777";'});

                sampleTrack.play();

                //got background.current from Douille, not sure if accurate
                //trying to get current tabid
                chrome.runtime.sendMessage({message:"start"});
                active = true;
                var audioCtx = new (window.AudioConetext)();
                chrome.tabCapture.capture({
                  audio : true,
                  video : false
                },
        });
    }
    else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tab.id,
                {code: 'document.body.style.backgroundColor = "#000000";'});

                sampleTrack.pause();

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

let active = false;
let sampleTrack = new Audio('misc/Bon Iver - Blood Bank_Proxy.mp3');

chrome.browserAction.onClicked.addListener(function(tab) {
    if(active == false) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tab.id,
                {code: 'document.body.style.backgroundColor = "#777777";'});

                sampleTrack.play();
                
                active = true;
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
});
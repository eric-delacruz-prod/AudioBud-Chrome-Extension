/*let act = document.getElementById('act');


act.onclick = function() {
    console.log("act pressed")
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "#6bdcfe";'});
        console.log("BGcolor Changed")
  });
};*/
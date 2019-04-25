var canv = document.createElement('canvas'); // creates new canvas element
canv.id = 'visualization'; // gives canvas id
canv.height = 2000; //get original canvas height
canv.width = 3000; // get original canvas width
document.body.prepend(canv);

//document.write("<script type='text/javascript' src='popup.js'></script>");

/*var imported = document.createElement('script');
imported.src = "popup.js";
document.canvas.appendChild(imported);*/

//chrome.tabs.executeScript(null, {file: "content_script.js"});
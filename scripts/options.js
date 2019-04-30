let page = document.getElementById('buttonDiv');

const kFilters = ['lowpass', 'highpass', 'bandpass', 'lowshelf',
                  'highshelf', 'peaking', 'notch', 'allpass'];

function constructOptions(kButtonColors) {
 for (let item of kButtonColors) {
   let button = document.createElement('button');
   button.innerHTML = item;
   button.addEventListener('click', function() {
     chrome.storage.sync.set({filter: item}, function() {
       console.log('filter is ' + item);
     })
   });
   page.appendChild(button);
 }
}

function constructOptionFreq(){
  let textbox = document.createElement('input');
  textbox.type = 'number';
  textbox.min = 10;
  textbox.max = 22050;
  textbox.value = 440;
  textbox.addEventListener('click', function() {
    chrome.storage.sync.set({frequency: textbox.value}, function() {
      console.log('frequency is ' + textbox.value);
    })
  });
  textbox.addEventListener('keydown', function() {
    chrome.storage.sync.set({frequency: textbox.value}, function() {
      console.log('frequency is ' + textbox.value);
    })
  });
  document.getElementById('freqForm').appendChild(textbox);
}

function constructOptionQ(){
  let textbox = document.createElement('input');
  textbox.type = 'number';
  textbox.min = .001;
  textbox.max = 1000;
  textbox.value = 1;
  textbox.addEventListener('click', function() {
    chrome.storage.sync.set({Q: textbox.value}, function() {
      console.log('Q is ' + textbox.value);
    })
  });
  textbox.addEventListener('keydown', function() {
    chrome.storage.sync.set({Q: textbox.value}, function() {
      console.log('Q is ' + textbox.value);
    })
  });
  document.getElementById('qForm').appendChild(textbox);
}

function constructOptionGain(){
  let textbox = document.createElement('input');
  textbox.type = 'number';
  textbox.min = -40;
  textbox.max = 40;
  textbox.value = 0;
  textbox.addEventListener('click', function() {
    chrome.storage.sync.set({Gain: textbox.value}, function() {
      console.log('Gain is ' + textbox.value);
    })
  });
  textbox.addEventListener('keydown', function() {
    chrome.storage.sync.set({Gain: textbox.value}, function() {
      console.log('Gain is ' + textbox.value);
    })
  });
  document.getElementById('gainForm').appendChild(textbox);
}

constructOptions(kFilters);
constructOptionFreq();
constructOptionQ();
constructOptionGain();

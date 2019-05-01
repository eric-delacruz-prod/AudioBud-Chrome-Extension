
const kFilters = ['lowpass', 'highpass', 'bandpass', 'lowshelf',
                  'highshelf', 'peaking', 'notch', 'allpass'];
const kVisuals = ['Falling', 'Right-side','Left-side','Fissure','Pulse','Starburst'];

const kColors  = ['#000000','#FFFFFF','#323246','#463232',
                  '#324632','#464632','#595963','#767678'];

function constructOptions(kButtonColors) {
 for (let item of kButtonColors) {
   let button = document.createElement('button');
   button.innerHTML = item;
   button.addEventListener('click', function() {
     chrome.storage.sync.set({filter: item}, function() {
       console.log('filter is ' + item);
     })
   });
   document.getElementById('buttonDiv').appendChild(button);
 }
}

function constructOptionFreq(){
  let textboxFreq = document.createElement('input');
  textboxFreq.type = 'number';
  textboxFreq.min = 10;
  textboxFreq.max = 22050;
  textboxFreq.value = 440;
  textboxFreq.addEventListener('click', function() {
    chrome.storage.sync.set({frequency: textboxFreq.value}, function() {
      console.log('frequency is ' + textboxFreq.value);
    })
  });
  textboxFreq.addEventListener('keydown', function() {
    chrome.storage.sync.set({frequency: textboxFreq.value}, function() {
      console.log('frequency is ' + textboxFreq.value);
    })
  });
  document.getElementById('freqForm').appendChild(textboxFreq);
}

function constructOptionQ(){
  let textboxQ = document.createElement('input');
  textboxQ.type = 'number';
  textboxQ.min = .001;
  textboxQ.max = 1000;
  textboxQ.value = 1;
  textboxQ.addEventListener('click', function() {
    chrome.storage.sync.set({Q: textboxQ.value}, function() {
      console.log('Q is ' + textboxQ.value);
    })
  });
  textboxQ.addEventListener('keydown', function() {
    chrome.storage.sync.set({Q: textboxQ.value}, function() {
      console.log('Q is ' + textboxQ.value);
    })
  });
  document.getElementById('qForm').appendChild(textboxQ);
}

function constructOptionGain(){
  let textboxGain = document.createElement('input');
  textboxGain.type = 'number';
  textboxGain.min = -40;
  textboxGain.max = 40;
  textboxGain.value = 0;
  textboxGain.addEventListener('click', function() {
    chrome.storage.sync.set({Gain: textboxGain.value}, function() {
      console.log('Gain is ' + textboxGain.value);
    })
  });
  textboxGain.addEventListener('keydown', function() {
    chrome.storage.sync.set({Gain: textboxGain.value}, function() {
      console.log('Gain is ' + textboxGain.value);
    })
  });
  document.getElementById('gainForm').appendChild(textboxGain);
}

function constructOptionsVisual(kButtonVisuals) {
 for (let item of kVisuals) {
   let button = document.createElement('button');
   button.innerHTML = item;
   button.addEventListener('click', function() {
     chrome.storage.sync.set({visuals: item}, function() {
       console.log('visual is ' + item);
     })
   });
   document.getElementById('buttonVisual').appendChild(button);
 }
}

function constructOptionsColors(kButtonColors){
  for (let item of kColors){
    let button = document.createElement('button');
    button.innerHTML = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({colors: item}, function(){
        console.log('color is ' + item);
      })
    });
    document.getElementById('buttonColor').appendChild(button);
  }
}

constructOptions(kFilters);
constructOptionFreq();
constructOptionQ();
constructOptionGain();
constructOptionsVisual(kVisuals);
constructOptionsColors(kColors);

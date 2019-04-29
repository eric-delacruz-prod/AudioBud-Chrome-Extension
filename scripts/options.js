let page = document.getElementById('buttonDiv');

const kFilters = ['lowpass', 'highpass', 'bandpass', 'lowshelf',
                  'highshelf', 'peaking', 'notch', 'allpass'];

function constructOptions(kButtonColors) {
 for (let item of kButtonColors) {
   let button = document.createElement('button');
   button.addEventListener('click', function() {
     chrome.storage.sync.set({filter: item}, function() {
       console.log('filter is ' + item);
     })
   });
   page.appendChild(button);
 }
}
constructOptions(kFilters);

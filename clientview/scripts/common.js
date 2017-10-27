let closeButton;

let miniButton;

// https://github.com/electron/electron/blob/master/docs/api/remote.md
let remote = require('electron').remote;

let currentWindow = remote.getCurrentWindow();


// Double check to see if there is a better way to do this. So far it seems the best
document.addEventListener("DOMContentLoaded", function(event) {
    closeButton = document.getElementById("close");
    
     closeButton.onclick = function() {
         //remote.getCurrentWindow().setSize(800,800,true);
         currentWindow.close();
     };
     
     miniButton = document.getElementById("mini");

     miniButton.onclick = function() {
         currentWindow.minimize();
     };



});


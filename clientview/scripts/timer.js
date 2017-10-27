let closeButton;

let miniButton;

// https://github.com/electron/electron/blob/master/docs/api/remote.md
let remote = require('electron').remote;

let currentWindow = remote.getCurrentWindow();

const divisions = 1/60;

function updateTimer() {
    let date = new Date();
    let progress = ((date.getMinutes() + date.getSeconds() * divisions) * divisions * 100);
    document.getElementById("timergreen").style.height = progress + "%";
    document.getElementById("timerred").style.height = (100 - progress) + "%";


};

// Double check to see if there is a better way to do this. So far it seems the best
document.addEventListener("DOMContentLoaded", function(event) {

    /*setTimeout(function() {
        location.reload();
    }, 2000);*/

    setTimeout(updateTimer());
    setInterval(updateTimer, 10000);

    /*loseButton = document.getElementById("close");

    closeButton.onclick = function() {
        //remote.getCurrentWindow().setSize(800,800,true);
        currentWindow.close();
    };

    miniButton = document.getElementById("mini");

    miniButton.onclick = function() {
        currentWindow.minimize();
    };*/



});


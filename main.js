/**
 * Created by sekwah on 7/5/2016.
 *
 * TODO understand let and var more, remember let is newer js so dont use in proper web dev.
 *
 * TODO make stuff like a checking for updates window at the start (add a skip button, in case it freezes or you have a bad connection
 * e.g. gprs will say connected but take forever for pages).
 *
 * TODO need to find a way to test on mac due to some parts being specific for it.
 *
 * TODO find how to make windows communicate with each other (e.g. opening out toolbars to other windows
 *  and making the first window open a recent project or new project) still need to learn the layout of this
 *  system and learn node.js better.
 *
 *  TODO need to look at adding a right click menu like intellij, word and other programs to view past projects and add
 *  funtions to do specific things (like steam)
 */
const electron = require('electron');

const app = electron.app;

// Module for making browser windows
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let editorWindow

// Build instructions (switch to electron-builder or find what discord uses
//electron-packager . timerthingy --overwrite --asar=true --platform=win32 --arch=ia32 --icon=clientview/images/favicon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="Timer Thingy"

// let is more specific to the scope than var
let selectionMenu;

let iconLocation = __dirname + '/clientview/images/favicon.ico';

app.on('ready', () => {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

    window = new BrowserWindow({width: width, height: height - 2, frame: false, titleBarStyle: "hidden"
        , title: "Timer Thingy", resizable: false, hasShadow: false
        , icon: iconLocation, transparent: true, toolbar: false, show: false, alwaysOnTop: true});

    window.once('ready-to-show', () => {
        window.show();
    })
    window.setPosition(0, 0);

    window.loadURL('file://' + __dirname + '/clientview/pages/timer.html');
});

// check with will-quit
app.on('before-quit', function(event){
    // Check if the project is saved at all or
    //event.preventDefault();
});

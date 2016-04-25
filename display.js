var now = Date.now;

/**
 * Display message on screen
 * @param {*} message A message to display
 */
function output(message){
    out.innerHTML += (now() - timestamp) + " : " + message + "<br/>";
}

// Worker
var worker = new Worker("worker.js");
worker.onmessage = function(e){
    output(e.data);
};
worker.onerror = function(e){
    log("[Error] " + e.message);
};
worker.postMessage("start");
var timestamp = now();
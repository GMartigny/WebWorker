importScripts('../workerTools.js');

new Worker(this, function(){
    var each = [];

    for(var i=2; i<21; ++i){
        var toAdd = getDividers(i).substract(each);
        each.push.apply(each, toAdd);
    }
    var prod = each.prod();
    this.send(prod);
});
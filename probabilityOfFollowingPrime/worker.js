importScripts('../workerTools.js');

var max = 25e6,
    primeEndingBy9 = [],
    proba = {
        1: 0,
        3: 0,
        7: 0,
        9: 0
    };

new Worker(this, function(){
    findPrimes();
    this.send("Found primes (" + primeEndingBy9.length + ")");

    makeProba();
    this.send("Get proba");

    for(var i in proba){
        if(proba.hasOwnProperty(i)){
            this.send((proba[i] / primeEndingBy9.length * 100).toFixed(2) + "% chance for " + i);
        }
    }
});

function findPrimes(){
    for(var i = 9; i < max; i += 10){
        if(isPrime(i))
            primeEndingBy9.push(i);
    }
}
function makeProba(){
    for(var i = 0,
        l = primeEndingBy9.length; i < l; ++i){
        var p = primeEndingBy9[i],
            n = 1;
        while(!isPrime(p + n)){
            ++n;
        }

        proba[lastChar(p + n)]++;
    }
}
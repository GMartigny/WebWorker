importScripts('../workerTools.js');

new Worker(this, dumbBrutForce);

function fromDividers(){
    var max = 999,
        min = 100,
        i = max,
        j = max;

    while(!isPalyndrom(i * j)){
        if(j > i && j > min){
            --j;
        }
        else{
            --i;
            j = max; // wrong
        }
    }
    this.send(i + " * " + j + " = " + (i * j));
}

function fromPalyndrom(){
    var max = 999 * 999,
        min = 100 * 100,
        res = false;

    while(!res && max > min){
        if(isPalyndrom(max) && !isPrime(max)){
            var divs = getDividers(max),
                init = divs;
            while(divs.length > 2){
                var min = divs.out(divs.min());
                divs[divs.indexOf(divs.min())] *= min; // wrong
            }
            if(divs[0].length() == 3 && divs[1].length() == 3)
                res = divs;
            else
                this.send(init + " => " + max);
        }
        max--;
    }

    this.send(divs[0] + " * " + divs[1] + " = " + (divs[0] * divs[1]));
}

function dumbBrutForce(){
    var largestPalyndrom = 0;
    for(var i=100; i<1000; ++i){
        for(var j=100; j<1000; ++j){
            var prod = i * j;
            if(isPalyndrom(prod) && prod > largestPalyndrom)
                largestPalyndrom = prod;
        }
    }
    this.send(largestPalyndrom);
}
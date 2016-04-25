var PI = Math.PI,
    PI2 = PI*2,
    random = Math.random,
    sqrt = Math.sqrt,
    pow = Math.pow,
    now = Date.now,
    floor = function(n){
        return n <<0;
    },
    round = function(n){
        return floor(n + 0.5);
    },
    ceil = function(n){
        if(n % 1)
            return floor(n + 1);
        else
            return n;
    };

/**
 * Define if a number is prime
 * @param {Number} n A number
 * @author http://www.javascripter.net/faq/numberisprime.htm
 * @returns {Boolean} Tru if it's a prime number
 */
function isPrime(n){
    if(isNaN(n) || !isFinite(n) || n % 1 || n < 2)
        return false;
    if(n % 2 == 0)
        return (n == 2);
    if(n % 3 == 0)
        return (n == 3);
    var m = sqrt(n);
    for(var i = 5; i <= m; i += 6){
        if(n % i == 0)
            return false;
        if(n % (i + 2) == 0)
            return false;
    }
    return true;
}

/**
 * Return all the integer dividers of a number
 * @param {Number} n The number to test
 * @returns {Array} A list of all integer divider sorted
 */
function getDividers(n){
    if(isPrime(n))
        return [n];

    var max = ceil(n / 2),
        i = 2;

    while(i <= max && (n % i) != 0){
        i++;
    }
    var dividers = getDividers(n / i);
    dividers.unshift(i);
    return dividers;
}

/**
 * Return the last char
 * @param {Number|String} n Any string or number
 * @returns {String} The last char
 */
function lastChar(n){
    n += "";
    return n[n.length - 1];
}

/**
 * Define if a string is a palyndrom
 * @param {Number|String} n Any string or number
 * @returns {Boolean} True if it's a palyndrom
 */
function isPalyndrom(n){
    n += "";
    var i = 0,
        l = n.length - 1,
        ok = true;
    while((ok = (n[i] == n[l - i])) && i < (l / 2 <<0)){
        i++;
    }
    return ok;
}

Array.prototype.max = function(){
    if(this.length < 2)
        return this[0];

    var max = this[0];
    for(var i=1, l=this.length; i<l ; ++i){
        if(this[i] > max)
            max = this[i];
    }

    return max;
};
Array.prototype.min = function(){
    if(this.length < 2)
        return this[0];

    var min = this[0];
    for(var i=1, l=this.length; i<l ; ++i){
        if(this[i] < min)
            min = this[i];
    }

    return min;
};
Array.prototype.out = function(val){
    return this.splice(this.indexOf(val), 1);
};
Array.prototype.substract = function(other){
    for(var i=0, l=other.length; i<l; ++i){
        if(this.indexOf(other[i]) >= 0){
            this.out(other[i]);
        }
    }
    return this;
};
Array.prototype.sum = function(){
    var sum = 0;
    this.map(function(i){
        sum += i;
    });
    return sum;
};
Array.prototype.prod = function(){
    var prod = 1;
    this.map(function(i){
        console.log(i);
        prod *= i;
    });
    return prod;
};
Number.prototype.length = function(){
    return (this + "").length;
};

function Worker(context, action){
    var self = this;
    this.context = context;
    this.action = action;
    context.onmessage = function(){
        self.send(" - Starting - ");
        self.action.call(self);
        self.send(" - End - ");
        clearTimeout(self.timeout);
    };

    this.timeout = setTimeout(function(){
        self.stop.call(self);
    }, 10 * 1000);
}
Worker.prototype = {
    send: function(message){
        this.context.postMessage(message);
    },
    stop: function(){
        this.context.close();
        this.send("Worker took too long");
    }
};

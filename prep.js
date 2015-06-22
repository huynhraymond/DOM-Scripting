var nextBirthdayOfTheWeek = function(birthday) {
    var dow = birthday.getDay(), bYear = birthday.getFullYear();
    do birthday.setFullYear(birthday.getFullYear() + 1);
    while(birthday.getDay() != dow);
    return birthday.getFullYear() - bYear;
};

var nextBirthdayOfTheWeek = function (birthday) {
    var week = birthday.getDay();
    var year = birthday.getFullYear();
    year += 1;
    birthday.setFullYear(year);
    var counter = 1;

    while ( week !== birthday.getDay() ) {
        counter++;
        year++;
        birthday.setFullYear(year);
    }

    return counter;
}

function chain(v, fns) {
    return fns.reduce(function(v, fn) { return fn(v) }, v);
}

function chain(input, fs) {

    var result = fs.reduce(function(input, f) {
        return f.call(null, input);
    }, input);

    return result;
}

function add(x) {
    return x + 10;
}

function mult(x) {
    return x * 30;
}

console.log(chain(2, [mult, add]));
console.log(chain(2, [add, mult]));

Array.prototype.reverse = function() {
    // ...
    for ( var i = 0, len = this.length, half = len / 2; i < half; i++ ){
        len -= 1;
        var temp = this[i];
        this[i] = this[len];
        this[len] = temp;
    }
    return this;
};

console.log([1, 2, 3, 4].reverse());

Array.prototype.reverse = function() {
    for(var i = 0, j = this.length-1; i < j; i++, j--) {
        var tmp = this[i];
        this[i] = this[j];
        this[j] = tmp;
    }
    return this;
};

function pattern(n){
    var output="";
    // Happy Coding ^_^
    if ( n < 1 )
        return output;
    var step  = 0;
    while ( n - step > 1 ) {
        for ( var i = n; i - step > 0; i-- ) {
            output += i.toString();
        }
        output += '\n';
        step++;
    }
    return output + n.toString();
}

console.log(pattern(3));
console.log(pattern(5));
console.log(pattern(0));

function pattern(n) {
    if (n < 1) return ''
    var lines = []

    for (var i = 0; i < n; i++) {
        var line = ''

        for (var j = n; j > i; j--) {
            line += j
        }

        lines.push(line)
    }

    return lines.join('\n')
}

function candies(kids){
    // ...
    if ( kids.length <= 1 )
        return -1;

    var highest = kids.reduce(function(n, kid) {
        return (kid > n) ? kid : n;
    });

    var total = 0;
    for ( var i = 0, len = kids.length; i < len; i++ ) {
        total += Math.abs(highest - kids[i]);
    }

    return total;
}

function candies(kids){
    if (kids.length < 2) return -1;

    var max = Math.max.apply(null, kids);
    var extraCandies = kids.reduce(function (total, kid) {
        return total + max - kid;
    }, 0);
    return extraCandies;
}

function f(n){
//insert your code here.... and go crazy!
    if ( n <= 0 || !Number.isFinite(n) || n % 1 !== 0)
        return false;
    return (n * (n + 1)) / 2;
};

console.log(f(0));

console.log(0.34/0.34);

function f(n){
    return (parseInt(n) === n && n > 0) ? n*(n+1)/2 : false;
};

function list(names){
    //your code here
    var len = names.length;

    if ( len <= 0 ) return '';
    if ( len === 1 ) return names.name;

    names = names.map(function(n) { return n.name });
    var lastname = names.pop();

    return names.join(', ') + ' & ' + lastname;

}

console.log(list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ]))

function list(names){
    return names.reduce(function(prev, current, index, array){
        if (index === 0){
            return current.name;
        }
        else if (index === array.length - 1){
            return prev + ' & ' + current.name;
        }
        else {
            return prev + ', ' + current.name;
        }
    }, '');
}

function scoreThrows(radiuses){
    //Return total number of points
    console.log(radiuses);
    if ( radiuses.length < 1 ) return 0;

    var total = 0, bonus = 0;
    for ( var i = 0, len = radiuses.length; i < len; i++ ) {
        if ( radiuses[i] < 5 )
            total += 10

        else if ( radiuses[i] >= 5 && radiuses[i] <= 10 ) {
            total += 5;
            bonus++;
        }

        else bonus++;
    }

    //return (bonus === 0 ? total + 100 : total);
    return (bonus === 0 ? total + 100 : total);
}

function scoreThrows(radiuses){

    if (radiuses.length <= 0) { return 0 }

    var score = 0
    var award = true
    for(var i = 0; i < radiuses.length; i++) {
        if      (radiuses[i] < 5)   { score += 10 }
        else if (radiuses[i] <= 10) { score += 5; award = false }
        else                        { award = false }
    }

    if (award) { score += 100 }

    return score;
}

function triangleType(a, b, c){
    var result = triangleType.ACUTE,
        sides = [a,b,c].sort(function(a,b){return a-b});

    a = sides[0], b = sides[1], c = sides[2];

    if(a <= c - b) {
        result = triangleType.INVALID;

    } else if(c*c === a*a + b*b) {
        result = triangleType.RIGHT;

    } else if(c*c > a*a + b*b) {
        result = triangleType.OBTUSE;
    }

    return result;
}

triangleType.INVALID = 0;
triangleType.ACUTE = 1;
triangleType.RIGHT = 2;
triangleType.OBTUSE = 3;

function christmasTree(height) {
    var result = [];
    for (var i = 0;  i < height; i++) {
        var row = [];
        for (var j = 0; j < height - 1; j++) {
            row.push(j >= (height - i - 1) ? "*" : " ");
        }
        result.push(row.join("") + "*" + row.reverse().join(""));
    }
    return result.join("\n");
}

console.log(christmasTree(5));
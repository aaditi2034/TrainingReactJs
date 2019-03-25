// Implementing the closure concept where the counter variable is incrementing itself on calling the main method.

var counter = (function incValue(){
    var count=0;
    return function(){
        count = count+1;
        return count;
    }
})();

console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
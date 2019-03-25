// Understanding the closures.

// I want to print different values of i but it is printing the same values of i when i invoked the inner function.
function buildFunction(){
    var arr=[];
    for(var i = 0; i<3;i++){
        arr.push(
            function(){
                console.log(i);
            }
        )
    }
    return arr; 
}
var fs = buildFunction();
fs[0]();
fs[1]();


// Here i used IIFE to solve the above problem .
function buildFunction1 (){
    var arr=[];
    for(var i = 0; i<3;i++){
        arr.push(
            (function(j){
                console.log(j);
            }(i))
        )
    }
    return arr; 
}
var fs1 = buildFunction1();
fs1[0];
fs1[1];
var calculator = function(c,d){
    this.a=c;
    this.b=d;
    add();
    sub();
    mul();
    div();
};

var add = function(){
    console.log(a+b);
}.bind(calculator);
var sub = function(){
    console.log(a-b);
}.bind(calculator);
var mul = function(){
    console.log(a*b);
}.bind(calculator);
var div = function(){
    console.log(a/b);
}.bind(calculator);


calculator(2,4);
console.log("-------------------");
calculator(10,2);

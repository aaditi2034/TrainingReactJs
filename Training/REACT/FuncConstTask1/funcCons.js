// implementing the stack without using 'new' keyword.

//Stack constructor
var maxSize = 4;
function Stack(maxSize){
    console.log(maxSize);
    var stackArray = [];
    var top = -1;
    this.pushItem = function(item){
        if(top < maxSize){
            top += 1;
            stackArray[top] = item;
        }
        //stackArray.push(item);
        return stackArray;
    }
    this.popItem = function(){
        if(top >=0){
            this.popElement = stackArray[top];
            delete stackArray[top];
            top -= 1;
            return this.popElement;
        }
        
    }
}

//'new' implementation

function newKeyword(Stack) {
    var objectEmpty = {};                       //Empty object
    //objectEmpty.__proto__ = Stack.prototype;    
    Stack.apply(objectEmpty,[]);
    return objectEmpty;
}

var stackObj = newKeyword(Stack);
console.log(stackObj);
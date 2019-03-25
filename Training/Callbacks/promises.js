// const myFirstPromise = new Promise(function(resolve, reject){
//   // Executer do something asynchronous which eventually calls either:
//   //
//   //   resolve(someValue); // fulfilled
//   // or
//   //   reject("failure reason"); // rejected
// });


// let myFirstPromise = new Promise(function(resolve, reject){
//   // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
//   // In this example, we use setTimeout(...) to simulate async code. 
//   // In reality, you will probably be using something like XHR or an HTML5 API.
//   resolve("Hello Aditi!!");

//   reject(new Error("error occured"));
// });

// myFirstPromise.then(function(successMessage){
//   // successMessage is whatever we passed in the resolve(...) function above.
//   // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
//   console.log(successMessage);
// }, function(errorMessage){
//   console.log(errorMessage);
// });

function PConst(funcCallback){
  function then(){

  }
  function resolve(){

  }
  function reject(){

  }
  function handle(){

  }
  funcCallback(true, false);
}

function funcCallback(resolveCallback, rejectCallback){
  if(resolveCallback)
    console.log("resolved");
  if(!rejectCallback)
    console.log("rejected");
}
console.log(PConst(funcCallback));
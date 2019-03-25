function MyPromise(executerFunction){

  if (typeof this !== 'object')
    throw new TypeError('Promises must be constructed via new');
  if (typeof executerFunction !== 'function')
    throw new TypeError('executerFunction must be a function');

  // status can be 'PENDING', 'RESOLVED' or 'REJECTED'.
  this.status = 'PENDING';
  // store value once FULFILLED or REJECTED.
  this.value = undefined;
  // store success handlers.
  this.thenCallback = [];
  // store failure handlers.
  this.onCatch = null;
  // stores the context of this in self.
  var self = this;

  // on success of the event.
  function fulfill(result){
    self.status = 'RESOLVED';                           // updating status.
    self.value = result;                               // updating value.
    try{
      self.thenCallback.forEach(function(func){
        self.value = func(self.value);
      })
    }catch(error){
      self.thenCallback = [];
      reject(error);
    }
  }

  // on failure of the event.
  function reject(error){
    self.status = 'REJECTED';                     // updating status.
    self.value = error;                          // updating error.
    if(typeof self.onCatch === 'function'){
      self.catchHandler(self.value);
    }
    throw self.value;
  }

  /* used to get the value of state and value.
  * onResolveCallback : a callback for a success case.
  * onRejectCallback : a callback for a failure case.
  */
  this.thenHandler = function(onResolveCallback, onRejectCallback){

    let res = onResolveCallback(self.value);
    self.value = res;
    self.thenCallback.push(onResolveCallback);

    if(typeof onResolveCallback === 'value')
      return self;

    else if(typeof res === 'object' && res.constructor.name === 'MyPromise'){
      self.value = res;
    }
    if(onRejectCallback){
      this.catchHandler(onRejectCallback);
    }
    return self;
  }

  // handling the error through this method.
  this.catchHandler = function(onRejected){
    self.onCatch = onRejected;
    return self;
  }
  
  // Executing the executerFunction as the object of MyPromise is created.
  executerFunction(fulfill.bind(this) , reject.bind(this));

}
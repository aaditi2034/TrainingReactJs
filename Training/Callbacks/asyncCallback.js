// Example of how callback works and how they are used.

const posts = [
  {title: "Post 1", body: "This is post 1."},
  {title: "Post 2", body: "This is post 2."}
];

function pause(duration) {
  var start = new Date().getTime();
  while (new Date().getTime() - start < duration);
}


function getInfo(){
  setTimeout(function(){
    let output = "";
    posts.forEach(function(post){
      output += `<li>${post.title}  :  ${post.body}</li>`;
    });
    document.body.innerHTML = output;
  },1000);
}

function createPost(post, callback){
  setTimeout(function(){
    posts.push(post);
    callback();
  },1000);
}

//getInfo is passed as a parameter for a callback function.
createPost({title: "Post 3", body: "This is post 3."},getInfo);

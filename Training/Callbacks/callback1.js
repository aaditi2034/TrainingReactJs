// function doHomework(subject, callback) {
//   alert(`Starting my ${subject} homework.`);
//   callback();
// }

// doHomework('math', function() {
//   alert('Finished my homework');
// });=

function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}
function alertFinished(){
  alert('Finished my homework');
}
doHomework('math', alertFinished);
const roboclawPyShell = require('./roboClawPyshell.js')
const myArgs = process.argv.slice(2);

let wheelController = new roboclawPyShell();
if(wheelController){
  wheelController.setSpeed(myArgs[0],myArgs[1],myArgs[2],myArgs[3]);
}

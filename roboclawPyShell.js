const { PythonShell } = require('python-shell')
const clamp = (val,min,max) => Math.min(Math.max(val, min) , max )
const mapRange = (value, oldRange, newRange) => {
    const newValue = (value - oldRange[0]) * (newRange[1] - newRange[0]) / (oldRange[1] - oldRange[0]) + newRange[0]
    return clamp(newValue, newRange[0],newRange[1])
}
const sleep = (ms) => new Promise((resolve) => { setTimeout(resolve,ms) })

module.exports = class roboclawPyShell {
    constructor() {
        this.shell =  new PythonShell('./python/clawSpeedStdIn.py');
        this.shell.send("0 0 0 0") // Has to start w 0 0 0 0, else it fails
        this.shell.on('stderr', (err) => {
            console.log("Python error message", err)
        })

        this.skidding = false;
    }

    setSpeed(leftFront = 0, leftBack = 0, rightFront = 0, rightBack = 0){
        console.log("Setting motors", [leftFront, leftBack, rightFront, rightBack])
        const val = (x) => Math.floor( mapRange(x,[0,100],[0,126]) )
        this.shell.send( `${val(leftFront)} ${val(leftBack)} ${val(rightFront)} ${val(rightBack)}` )
    }

    startSkid(){
        this.skidding = true;
        this.skid();
    }

    async skid(){
        this.setSpeed(100,100,100,100)
        await sleep(3000)
        this.setSpeed(50,50,100,100)
        await sleep(2000)
        this.setSpeed(50,25,100,100)
        await sleep(2000)
        this.setSpeed(50,25,100,100)
        await sleep(2000)
        this.setSpeed(100,100,100,100)
        await sleep(3000)
        this.setSpeed(0,0,0,0)
    }
    stopSkid(){
        this.skidding = false;
    }

	stopShell(){
		this.shell.end(function (err,code,signal) {
			if (err) throw err;
			console.log('The exit code was: ' + code);
			console.log('The exit signal was: ' + signal);
			console.log('finished');
		  });
	}
    
}
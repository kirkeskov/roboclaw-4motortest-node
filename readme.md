# Roboclaw motor test

## Prerequisites

- node
- npm/yarn
- python3

## Setup

### Step 1

Install the package by running

```npm install```

Use the RoboClaw software – "Basismicro Motion Studio" – to test the motors, find the corresponding COM ports and set either left or right to "reverse mode" (in order to sync the two). Make sure that a "FORWARD" action will make the wheels spin in the right direction. Remember to close the Motion Studio (disconnecting the motors is not enough, as the program itself keeps alive the COM-port connection)

Assign the COM Ports in ``python/clawSpeedStdIn.py:5``:

```
leftPort = "COM5"
rightPort = "COM4"
```

### Step 2

``npm start``  
Runs the motor at full speed (100 100 100 100)

``npm stop``  
Stops the motor (0 0 0 0)

``node index.js {LF} {LB} {RF} {RB}``  
Sets the motor speeds for each individual wheel.
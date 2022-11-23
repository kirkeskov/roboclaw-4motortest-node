#if using Python 3
from roboclaw_3 import Roboclaw
import sys

leftPort = "COM5"
rightPort = "COM4"

left = Roboclaw(leftPort, 38400)
right = Roboclaw(rightPort, 38400)

left.Open()
right.Open()

for line in sys.stdin:
    cmds = line.split(" ")
    left.ForwardM1(0x80, int(cmds[0]))
    left.ForwardM2(0x80, int(cmds[1]))
    right.ForwardM1(0x80, int(cmds[2]))
    right.ForwardM2(0x80, int(cmds[3]))
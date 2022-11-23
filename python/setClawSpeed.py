#if using Python 3
from roboclaw_3 import Roboclaw
import sys

leftPort = "COM5"
rightPort = "COM4"

left = Roboclaw(leftPort, 38400)
right = Roboclaw(rightPort, 38400)

left.Open()
right.Open()


print ("+++ Left current +++")
print( left.ReadEncM1(0x80) )
print( left.ReadEncM2(0x80) )

print ("+++ Right current +++")
print( right.ReadEncM1(0x80) )
print( right.ReadEncM2(0x80) )

left.ForwardM1(0x80, int(sys.argv[1]))
left.ForwardM2(0x80, int(sys.argv[2]))
right.ForwardM1(0x80, int(sys.argv[3]))
right.ForwardM2(0x80, int(sys.argv[4]))
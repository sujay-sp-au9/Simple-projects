import random
import re
import math
available = [1, 2, 3, 4, 5, 6, 7, 8, 9]
operators = ["+", "-", ""]
total = 0
expression = ""
answer = set()


def evaluate(x):
    numbers = re.split("\D", x)
    operations = re.split("\d", x)
    operations[:] = (value for value in operations if value != "")
    temp = numbers[0]
    for i in range(1, len(operations)+1):
        temp = str(temp)+operations[i-1]+str(numbers[i])
        temp = eval(temp)
    return temp


"""
Brute force
number of operands to the power of number of spaces between 1-9
and multiplied by 3 because of the random function used on the operators list of 3
"""
iterations = math.pow(3, len(available)-1)*3
while(iterations > -1):
    iterations -= 1
    expression = ""
    for i in range(len(available)-1):
        expression += (str(available[i])+random.choice(operators))
    expression += str(available[len(available)-1])
    total = evaluate(expression)
    if(total == 100):
        answer.add(expression)
for x in answer:
    print(x)

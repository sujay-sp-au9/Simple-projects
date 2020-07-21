import math
import sys
import random

n = int(input())
minNumberOfEvens = math.ceil(n/2)
p = list(map(float, input().split(" ")))
if(len(p) != n):
    sys.exit("Incorrect input")


def checkAndAdd(temp):
    check = 0
    for i in finalCombinationList:
        check = 0
        for g in range(len(i)):
            if(temp[g] == i[g]):
                check += 1
        if(check == n):
            break
    if(check < n):
        finalCombinationList.append(temp)
        calculateP(temp)


def calculateNCR(temp):
    totalC = 0
    for i in range(minNumberOfEvens, n+1):
        totalC += math.factorial(n)/(math.factorial(i)*math.factorial(n-i))
    return totalC


numberOfPossibleCombinations = calculateNCR(n)
finalCombinationList = []
finalTotalPs = []


def calculateP(temp):
    totalP = 1
    for i in range(len(temp)):
        if(temp[i] == "Even"):
            totalP *= p[i]
        else:
            totalP *= 1-p[i]
    finalTotalPs.append(totalP)


while(len(finalCombinationList) < numberOfPossibleCombinations):
    temp = []
    for i in range(n):
        temp.append(random.choice(["Even", "Odd"]))
    if(temp.count("Even") >= minNumberOfEvens):
        checkAndAdd(temp)
print(sum(finalTotalPs))

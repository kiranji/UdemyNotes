file = open("test.txt")
## print(file.read()) ##read method will read all lines of a file
##print(file.read(2))  ##read file with specified byte
##print(file.readline()) ##reads a line

##line = file.readline()
# while line != "":       #program to read line till end of FIle
#     print(line, end="")
#     line = file.readline()

for i in file.readlines():   #readLines will return list
    print(i,end="")

file.close()





with open("test.txt", "r") as reader:  #another way to Read and write file
    list = reader.readlines()
    print(list)
    # reverse=reversed(list)
    # for i in reverse:
    #     print(i,end=" ")



with open("test.txt", "w") as writer:
    for i in reversed(list):
        writer.write(i)


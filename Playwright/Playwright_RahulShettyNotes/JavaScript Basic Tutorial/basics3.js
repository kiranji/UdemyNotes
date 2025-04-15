var marks = Array(6)
var marks = new Array(20,40,35,12,37,100)

var marks =[20,40,35,12,37,100]
subMarks =marks.slice(2,5)  ;//slice() Returns a copy of a section of an array. For both start and end, a negative index can be used to indicate an offset from the end of the array. For example, -2 refers to the second to last element of the array.
console.log(subMarks)   //[35,12,37]
 
console.log(marks[2]) //35

marks[3] = 14
console.log(marks) //[20,40,35,14,37,100]
console.log(marks.length) //6

marks.push(65)
console.log(marks) //[20,40,35,14,37,100,65]
marks.pop()//[20,40,35,14,37,100]

marks.unshift(12)  //Unshift Inserts new elements at the start of an array, and returns the new length of the array.

console.log(marks) //[12,20,40,35,14,37,100]


console.log(marks.indexOf(100))  //indexOf returns the first index at which a given element can be found in the array, or -1 if it is not present.

//return 120 in the array
console.log(marks.includes(120)) //includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.

//FOr loop example and calculating the sum
var sum =0
for(let i =0;i<marks.length;i++)
{
    //console.log(marks[i])
    sum = sum + marks[i] //32+40
}
console.log(sum)


//reduce function
let total =marks.reduce((sum,mark)=>sum+mark,0)
console.log("Printing total " + total)

/*
https://www.w3schools.com/jsref/jsref_reduce.asp

reduce Method: marks.reduce((sum, mark) => sum + mark, 0)

Callback Function: (sum, mark) => sum + mark

sum: Accumulator that holds the accumulated result.
mark: Current element being processed in the array.
The function returns the sum of the accumulator and the current element.


Initial Value: 0

This is the initial value of the accumulator (sum).
*/


//Example of print even numbers from the array
var scores = [12,13,14,16]
//create new array with even numbers of scores and multiply each value
// with 3 and sum themarray [12,14,16]
var evenScores =[]
for(let i =0;i<scores.length;i++)
{
   
    if(scores[i] %2 == 0)
    {
        evenScores.push(scores[i])
    }
}
console.log(evenScores)

//Printing even number with filer
let newFilterEvenScores =scores.filter(score=>score%2==0)
console.log(newFilterEvenScores) //[ 12, 14, 16 ]=>[36,42,48]

//map
let mappedArray=newFilterEvenScores.map(score=>score*3)
console.log(mappedArray)


//reduce
let totalVal=mappedArray.reduce((sum,val)=>sum+val,0)
console.log(totalVal)


var scores1 = [12,13,14,16]
//chaining array function
let sumValue=scores1.filter(score=>score%2==0).map(score=>score*3).reduce((sum,val)=>sum+val,0)
console.log(sumValue)

//sorting of string 
let fruits =["banana","mango","pomegrante","apple"]

console.log(fruits.sort())
console.log(fruits.reverse())


// var scores1 = [12,003,19,16,14] //9
// console.log(scores1.sort())
// scores1.sort(function(a,b){
//     return a-b
// })

//soring of numbers in desc order

console.log(scores1.sort((a,b)=> b-a))

console.log(scores1.sort((a,b)=> a-b)) //this will sort in asc order



/*

Comparison Function (a, b) => b - a: This function is used to compare two elements, a and b, in the array.

If the result of b - a is positive, b is considered greater than a, and a will be placed after b.
If the result is negative, a is considered greater than b, and a will be placed before b.
If the result is zero, their order remains unchanged.



Descending Order: By subtracting a from b, the array is sorted in descending order because larger numbers will come before smaller numbers.
*/




























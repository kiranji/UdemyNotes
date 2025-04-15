//Program to demonstrate the Read and write operation in Excel using ExcelJS
//TO run this file you can use in terminal node <filename> 
const ExcelJS = require('exceljs');
const { Console } = require('node:console');

async function WriteExcel(SearchText,ReplaceText) {

    //we are creating this object to store the row and column number of the cell which has the value Matching the search value"
    
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("/Users/pkiranjikumar/Documents/playwrightAutomation/excelDemo1.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    const Result=await ReadExcel(worksheet,SearchText);
    //updating the sheet with new values
    const cellUpdate = worksheet.getCell(Result.rowNum,Result.colNum);
    cellUpdate.value = ReplaceText;
    await workbook.xlsx.writeFile("/Users/pkiranjikumar/Documents/playwrightAutomation/excelDemo1.xlsx");
}

async function ReadExcel(worksheet,SearchText) {

/*
    The reason why await is not suggested in below eachRow() is because the eachRow method is not an asynchronous function. The await keyword is used to wait for a Promise to resolve, and since eachRow does not return a Promise, using await with it does not make sense and can lead to unexpected behavior or errors in your code.
In JavaScript, await should only be used with functions that return a Promise. The eachRow method is designed to be a synchronous iterator over the rows in the worksheet, and it does not involve any asynchronous operations that would require waiting.
*/
   
Result ={rowNum:-1,colNum:-1};
worksheet.eachRow((row, rowNumber) => {

    row.eachCell((cell, cellNumber) => {

        if(cell.value === SearchText){
            Result.rowNum = rowNumber;
            Result.colNum = cellNumber;
        }
    });
    

});
return Result;
}


WriteExcel("Mango","Apple");
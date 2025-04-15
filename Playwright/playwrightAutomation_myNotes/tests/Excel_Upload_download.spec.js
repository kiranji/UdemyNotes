const ExcelJs = require('exceljs');
const { test } = require('@playwright/test')
const { expect } = require('@playwright/test');


async function writeExcelTest(searchText,replaceText,change,filePath)
{
    //The change variable is used to change the row and column values of the cell which has the value matching the search text
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output= await readExcel(worksheet,searchText);
 
  const cell = worksheet.getCell(output.row,output.column+change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
 
}
 
 
async function readExcel(worksheet,searchText)
{
    let output = {row:-1,column:-1};
    worksheet.eachRow((row,rowNumber) =>
    {
          row.eachCell((cell,colNumber) =>
          {
              if(cell.value === searchText)
              {
                  output.row=rowNumber;
                  output.column=colNumber;
              }
  
  
          }  )
    
    })
    return output;
}

test('excel Upload and download', async ({ page }) => {

//here we are changing the value of table with mango text price to 350
  const textSearch = 'Mango';
  const updateValue = '350';
  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
  //Here we are using wait for download event to get promised resolved
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button',{name:'Download'}).click();
  //after clicking on the button above the download will start and we are waiting for the download to complete
  //Note during hands-on the file didnot download in downloads section since the browser opened by playwright is storing the downloaded files in temp files section
  await downloadPromise;

  writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"/Users/pkiranjikumar/Downloads/download.xlsx");
  

//Notice to upload file we are using setInputFiles method
  await page.locator("#fileinput").setInputFiles("/Users/pkiranjikumar/Downloads/download.xlsx");

  //once the file is uploaded with updated values ,we are verifying the updated value displayed in UI table below
  const textlocator = page.getByText(textSearch);
  //here we are first filtering all the rows and getting the row which has the text locator
  const desiredRow = await page.getByRole('row').filter({has :textlocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

})
const path = require("path");
const fs = require("fs");

//joining path of directory
const directoryPath = path.join(__dirname, "src");

const createFile = (fileContent) => {
  fs.writeFile("public/files.json", fileContent, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
};

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  console.log(files);
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    console.log(file);
  });
});

const fileContent = "dummy content";

createFile(fileContent);

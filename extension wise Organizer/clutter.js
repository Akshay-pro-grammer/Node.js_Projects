// You have to write a Node.js program to clear clutter inside of a directory and organize the contents of that directory into different folders

// for example, these files become:

// 1. name.jpg
// 2. name.png
// 3. this.pdf 
// 4. harry.zip
// 5. Rohan.zip
// 6. cat.jpg 
// 7. harry.pdf

// this: 
// jpg/name.jpg, jpg/cat.jpg 
// png/name.png 
// pdf/this.pdf pdf/harry.pdf
// zip/harry.zip zip/Rohan.zip
const fs = require('fs');
const path = require('path');

// Directory to organize
const directoryPath = path.join(__dirname, 'nigga');

// Read files from the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 

  files.forEach(file => {
    const ext = path.extname(file).substring(1); // Get file extension
    const folder = path.join(directoryPath, ext); // Folder for the file type

    // Create folder if it doesn't exist
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    // Move file to the respective folder
    const oldPath = path.join(directoryPath, file);
    const newPath = path.join(folder, file);

    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;
      console.log(`${file} moved to ${ext} folder`);
    });
  });
});

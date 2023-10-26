const fs = require("fs");

fs.writeFile("test.txt", "Hash Mapapap", "utf8", err => {
    if (err) throw err;
    console.log("File written");
});

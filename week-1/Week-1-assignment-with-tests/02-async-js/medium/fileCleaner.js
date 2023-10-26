const fs = require("fs");

fs.readFile("./test.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("Before: \n");
    console.log(data);
    console.log("\n\n");
    data = data.split(" ");
    let i = 0;
    while (i < data.length) {
        if (data[i] === "") data.splice(i, 1);
        else ++i;
    }
    data = data.join(" ");
    console.log("After: \n");
    console.log(data);
});

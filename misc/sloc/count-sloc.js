const fs = require("fs");
const slocjs = require("slocjs");

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const directories = [
  { name: "web", path: "../../web" },
  { name: "mobile", path: "../../mobile" },
  { name: "server", path: "../../server" },
  { name: "expo51", path: "../expo51" },
];

async function countLinesInDir(path) {
  try {
    const result = await slocjs.countLinesInDir(path);
    const slocCount = result.replace("SLOC: ", "");
    return parseInt(slocCount, 10);
  } catch (error) {
    console.error(`Error counting lines for ${path}:`, error);
    return 0;
  }
}

async function processDirectories() {
  const currentDate = getCurrentDate();
  const csvFileName = `sloc_results.csv`;

  if (!fs.existsSync(csvFileName)) {
    fs.writeFileSync(csvFileName, "Date,Directory,SLOC\n", "utf8");
  }

  for (const dirInfo of directories) {
    const slocCount = await countLinesInDir(dirInfo.path);
    const csvLine = `${currentDate},${dirInfo.name},${slocCount}\n`;

    fs.appendFile(csvFileName, csvLine, "utf8", (err) => {
      if (err) {
        console.error(
          `Error appending data for ${dirInfo.name} to CSV file:`,
          err
        );
      }
    });
  }

  console.log(`SLOC data appended to '${csvFileName}' successfully.`);
}

processDirectories();

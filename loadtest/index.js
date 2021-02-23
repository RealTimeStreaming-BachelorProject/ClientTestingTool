const glob = require("glob");
const path = require("path");
const inquirer = require("inquirer");
const { execSync } = require("child_process");
const { NOTIMP } = require("dns");

glob(path.resolve(__dirname, "tests/**/*.loadtest.yml"), (err, files) => {
  inquirer
    .prompt([
      {
        name: "testToRun",
        type: "list",
        message: "Which test do you want to run?",
        choices: files.map((file) => ({
          name: path.basename(file),
          value: path.relative(__dirname, file),
        })),
      },
    ])
    .then((answer) => {
      const { testToRun } = answer;
      execSync("npm run test  -- " + testToRun, {stdio:[0,1,2]});
    });
});

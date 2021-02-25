const glob = require("glob");
const path = require("path");
const inquirer = require("inquirer");
const { execSync } = require("child_process");

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
      let manualTarget;
      const arguments = process.argv.slice(2);
      if (arguments[0]) {
        manualTarget = arguments[0]
      }
      runTest(testToRun, manualTarget);
    });
});

const runTest = (testToRun, manualTarget) => {
  if (manualTarget) {
    execSync("npm run test  -- " + testToRun + " --target " + manualTarget, {
      stdio: [0, 1, 2],
    });
  } else {
    execSync("npm run test  -- " + testToRun, { stdio: [0, 1, 2] });
  }
};

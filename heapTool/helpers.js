const chalk = require("chalk");
const v8 = require("v8");

function printSpaceComparison(before, after) {
    const diff = {}
    Object.keys(before).forEach(key => {
        diff[key] = Math.floor(after[key] - before[key]);
    })
    delete before['space_name']
    delete after ['space_name']
    delete diff['space_name']
    console.table({before, after, diff})
}

function getSpaceDetails(spaces) {
  const memoryKeys = [
    "space_size",
    "space_used_size",
    "space_available_size",
    "physical_space_size",
  ];
  return v8
    .getHeapSpaceStatistics()
    .filter((q) => spaces.includes(q.space_name))
    .map((q) => {
      memoryKeys.forEach((key) => q[key] = bytesToMB(q[key]));
      return q;
    });
}

function printAvailableHeap() {
  const {
    total_available_size,
    used_heap_size,
    heap_size_limit,
  } = v8.getHeapStatistics();
  console.log(chalk.yellow(`HEAP STATUS`));
  console.log(
    chalk.yellow(
      `${bytesToMB(used_heap_size)} MB out of ${bytesToMB(
        heap_size_limit
      )} MB used. ${bytesToMB(total_available_size)} MB still available.`
    )
  );
}

function bytesToGB(bytes) {
  return Number((bytes / 1024 / 1024 / 1024).toFixed(2));
}

function bytesToMB(bytes) {
  return Number((bytes / 1024 / 1024).toFixed(2));
}

module.exports = {
    printSpaceComparison,
  getSpaceDetails,
  printAvailableHeap,
  bytesToGB,
  bytesToMB,
};

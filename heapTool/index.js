const chalk = require("chalk");
const v8 = require("v8");
const data = [];
const loopSize = process.argv[2];
const helpers = require("./helpers")
const heapSize = helpers.bytesToMB(v8.getHeapStatistics().heap_size_limit);
console.log(`⭐️ Running heap testing tool with ${heapSize}MB assigned\n`);
console.log(`Initating test with ${loopSize} loops\n`);

v8.writeHeapSnapshot("before.heapsnapshot");
const before = {
    old_space: helpers.getSpaceDetails(["old_space"])[0],
    new_space: helpers.getSpaceDetails(["new_space"])[0]
}
/* ACTUAL TEST */
for (var i = 0; i < loopSize; i++) {
  data.push({
    id: i,
    time: new Date(),
  });
}
const after = {
    old_space: helpers.getSpaceDetails(["old_space"])[0],
    new_space: helpers.getSpaceDetails(["new_space"])[0]
}


console.log(chalk.green(`New Space stats (in MB):`))
helpers.printSpaceComparison(before.new_space, after.new_space)

console.log(chalk.green(`Old Space stats (in MB):`))
helpers.printSpaceComparison(before.old_space, after.old_space)


v8.writeHeapSnapshot("after.heapsnapshot")
helpers.printAvailableHeap()
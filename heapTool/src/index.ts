import chalk from 'chalk'
const v8 = require("v8");
const data = [];
const loopSize = Number(process.argv[2]) || 10;
import * as helpers from './helpers'
const heapSize = helpers.bytesToMB(v8.getHeapStatistics().heap_size_limit);
console.log(`⭐️ Running heap testing tool with ${heapSize}MB assigned\n`);
console.log(`Initating test with ${loopSize} loops\n`);

v8.writeHeapSnapshot("../snapshots/before.heapsnapshot");
const before = {
    old_space: helpers.getSpaceDetails(["old_space"])[0],
    new_space: helpers.getSpaceDetails(["new_space"])[0]
}

/* ACTUAL TEST START */
for (var i = 0; i < loopSize; i++) {
  data.push({
    id: i,
    time: new Date(),
  });
}
/* ACTUAL TEST END */

const after = {
    old_space: helpers.getSpaceDetails(["old_space"])[0],
    new_space: helpers.getSpaceDetails(["new_space"])[0]
}


console.log(chalk.green(`New Space stats (in MB):`))
helpers.printSpaceComparison(before.new_space, after.new_space)

console.log(chalk.green(`Old Space stats (in MB):`))
helpers.printSpaceComparison(before.old_space, after.old_space)


v8.writeHeapSnapshot("../snapshots/after.heapsnapshot")
helpers.printAvailableHeap()
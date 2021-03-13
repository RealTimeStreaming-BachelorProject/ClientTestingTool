var asciichart = require("asciichart");
const cpuPercentages = [10, 33.5, 70, 50, 40, 50, 60, 50, 50];

console.log(
  asciichart.plot(cpuPercentages, { height: 10, colors: [asciichart.lightcyan] })
);

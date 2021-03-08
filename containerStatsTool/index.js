const { Docker } = require("node-docker-api");

const docker = new Docker({ socketPath: "/var/run/docker.sock" });
class ContainerStat {
  constructor(dockercontainer) {
    this.dockercontainer = dockercontainer;
    this.cpuPercentages = [];
    this.memPercentages = [];
    dockercontainer.stats({ stream: false }).then((stats) => {
      stats.on("data", (stat) => {
        this.name = JSON.parse(stat.toString()).name.slice(1);
      });
    });
  }

  collectStats() {
    this.dockercontainer.stats({ stream: false }).then((stats) => {
      stats.on("data", (stat) => {
        const stats = JSON.parse(stat.toString());
        const numOfCPUs = stats.cpu_stats.online_cpus;
        const currentCPU = stats.cpu_stats.cpu_usage.total_usage;
        const previousCPU = stats.precpu_stats.cpu_usage.total_usage;
        const currentSystemCPU = stats.cpu_stats.system_cpu_usage;
        const previousSystemCPU = stats.precpu_stats.system_cpu_usage;
        this.insertCpuPercentage(
          numOfCPUs,
          currentCPU,
          previousCPU,
          currentSystemCPU,
          previousSystemCPU
        );
        const memoryUsage = stats.memory_stats.usage;
        const maxMemoryUsage = stats.memory_stats.limit;
        this.insertMemPercentage(memoryUsage, maxMemoryUsage);
      });
    });
  }

  insertCpuPercentage(
    numOfCPUs,
    currentCPU,
    previousCPU,
    currentSystemCPU,
    previousSystemCPU
  ) {
    const cpuDelta = currentCPU - previousCPU;
    const cpuSystemDelta = currentSystemCPU - previousSystemCPU;
    const cpuPercentage = (cpuDelta / cpuSystemDelta) * numOfCPUs * 100;
    this.cpuPercentages.push(cpuPercentage);
  }

  insertMemPercentage(memoryUsage, memoryLimit) {
    const memoryPercentage = (memoryUsage / memoryLimit) * 100;
    this.memPercentages.push(memoryPercentage);
  }
}

const containers = [];

(async () => {
  const dockerContainers = await docker.container.list();
  for (const container of dockerContainers) {
    containers.push(new ContainerStat(container));
  }
  while (true) {
    for (const container of containers) {
      container.collectStats();
    }
    await sleep(1000);
  }
})().catch((e) => {
  console.log(e);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

process.on("SIGINT", async (code) => {
  console.log("\n");
  if (containers.length !== 0) {
    for (const container of containers) {
      // Container stats
      if (container.cpuPercentages.length !== 0) {
        const cpuAverage =
          container.cpuPercentages.reduce((prev, curr) => prev + curr) /
          container.cpuPercentages.length;
        console.log(
          `Average CPU usage for container '${
            container.name
          }'     : ${Math.round(cpuAverage)}%`
        );
        const memAverage =
          container.memPercentages.reduce((prev, curr) => prev + curr) /
          container.memPercentages.length;
        console.log(
          `Average MEMORY usage for container '${
            container.name
          }'  : ${Math.round(memAverage)}%`
        );
      }
      // Stopping & removing containers
      await container.dockercontainer
        .delete({ force: true })
        .then(() => {
          console.log("Cleaned up containers");
        })
        .catch((err) =>
          console.log(`Could not delete container ${container.name}`)
        );
      // Pruning volumes
      await docker.volume.prune({ force: true }).then(() => {
        console.log("Cleaned up volumes");
      });
    }
  }

  process.exit(code);
});

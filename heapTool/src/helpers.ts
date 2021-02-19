import chalk from "chalk";
import v8, { HeapSpaceInfo } from 'v8'

export function printSpaceComparison(before: HeapSpaceInfo, after: HeapSpaceInfo) {
  const diff: HeapSpaceInfo = {
    physical_space_size: Math.floor(after.physical_space_size - before.physical_space_size),
    space_available_size: Math.floor(after.space_available_size - before.space_available_size),
    space_name: before.space_name,
    space_size: Math.floor(after.space_size - before.space_size),
    space_used_size: Math.floor(after.space_used_size - before.space_used_size)
  };
  console.table({ before, after, diff });
}

export function getSpaceDetails(spaces: string[]) {
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
      memoryKeys.forEach(key => {
        (q as any)[key] = bytesToMB((q as any)[key])
      })
      return q;
    });
}

export function printAvailableHeap() {
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

export function bytesToGB(bytes: number) {
  return Number((bytes / 1024 / 1024 / 1024).toFixed(2));
}

export function bytesToMB(bytes: number) {
  return Number((bytes / 1024 / 1024).toFixed(2));
}


interface Benchmark {
  name: string;
  datapoints: Array<BenchDatapoint>;
}

interface BenchDatapoint {
  date: Date;
  score: number;
  commit: Commit;
}

interface Commit {
  authorName: string;
  date: Date;
  title: string;
}

function randomString(len: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let str = '';
  for (let i = 0; i < len; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    str += chars[idx];
  }
  return str;
}


function getMockBenchmarks(benchCount: number, datapointCount: number): Array<Benchmark> {
  let benchmarks: Array<Benchmark> = [];
  const startDate = new Date(2023, 1, 1)
  for (let benchIdx = 0; benchIdx < benchCount; benchIdx++) {
    let datapoints: Array<BenchDatapoint> = [];
    for (let datapointIdx = 0; datapointIdx < datapointCount; datapointIdx++) {
      const currDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + datapointIdx
      );
      datapoints.push({
        date: currDate,
        score: Math.random(),
        commit: {
          authorName: randomString(10),
          date: currDate,
          title: randomString(20)
        }
      })
    }
    benchmarks.push({
      name: `benchmark-${benchIdx}`,
      datapoints: datapoints
    })
  }
  return benchmarks;
}

// export getMockBenchmarks function
export { getMockBenchmarks };
export type { Benchmark, Commit, BenchDatapoint };

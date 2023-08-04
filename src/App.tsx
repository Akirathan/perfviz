import React from 'react';
import './App.css';
import TopBar from "./components/TopBar";
import {getMockBenchmarks} from "./data";
import BenchmarkGraph from "./components/BenchmarkGraph";

function App() {
  const benchCount = 1;
  const datapointCount = 4;
  const benchmarks = getMockBenchmarks(benchCount, datapointCount)
  const benchNames = benchmarks.map(bench => bench.name)
  const benchSet = new Set(benchNames)
  console.assert(benchSet.size === benchCount, "Benchmarks must have unique names")
  let benchComponents = benchmarks.map((benchmark) =>
    <BenchmarkGraph key={benchmark.name} name={benchmark.name} datapoints={benchmark.datapoints}/>
  )
  return (
    <div className="AppName">
      <TopBar></TopBar>
      {benchComponents}
    </div>
  );
}

export default App;

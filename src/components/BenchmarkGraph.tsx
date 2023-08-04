import {BenchDatapoint, Benchmark} from "../data";
import {Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts"
import {Toolbar} from "@mui/material";
import SelectionDetails from "./SelectionDetails";
import React, {useState} from "react";
import {CategoricalChartState} from "recharts/types/chart/generateCategoricalChart";
import {Table} from "react-bootstrap";


export default function BenchmarkGraph(benchmark: Benchmark) {
  console.assert(benchmark.datapoints.length > 0, "Benchmarks must have at least one datapoint");

  const [selectedDatapoint, setSelectedDatapoint] =
      useState<BenchDatapoint>(benchmark.datapoints[0]);

  function handleClick(event: CategoricalChartState) {
    console.assert(event.activePayload !== undefined)
    if (event.activePayload !== undefined) {
      let dataPoint = (event.activePayload[0]["payload"] as BenchDatapoint)
      setSelectedDatapoint(dataPoint)
    }
  }

  return (
    <div>
      <h2>Graph for {benchmark.name}</h2>
      <LineChart
          width={400}
          height={400}
          data={benchmark.datapoints}
          onClick={handleClick}
      >
        <XAxis dataKey={"date"} label="Date" type="category"/>
        <YAxis type={"number"} />
        <Line
          type={"monotone"}
          dataKey={"score"}
          stroke={"#8884d8"}
        />
        <Tooltip/>
        <Legend/>
      </LineChart>
      <h2>Selection details</h2>
      <div>
        <dl>
          <dt>Date</dt>
          <dd>{selectedDatapoint.date.toString()}</dd>
          <dt>Score</dt>
          <dd>{selectedDatapoint.score}</dd>
          <dt>Commit</dt>
          <dd>{JSON.stringify(selectedDatapoint.commit)}</dd>
        </dl>
      </div>
    </div>
  )
}


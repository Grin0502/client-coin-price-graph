import './App.css';
import React, { useState, useEffect } from 'react';
import { AgCharts } from "ag-charts-react";

import { getData } from "./config/utils";

const ChartExample = () => {
  const [symbol, setSymbol] = useState("OMUSDT");
  const [options, setOptions] = useState({
    title: {
      text: "Annual Fuel Expenditure",
    },
    data: [],
    series: [
      {
        type: "line",
        xKey: "date",
        yKey: "price",
        yName: "Price",
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const newData = await getData(symbol);
      setOptions({...options, data: newData });
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  
  return <AgCharts options={options} />;
};

function App() {
  return (
    <div>
      <ChartExample />
    </div>
  );
}

export default App;

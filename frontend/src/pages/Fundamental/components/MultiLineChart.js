import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import api from '../../../api';
import styled from 'styled-components';

const ChartName = styled.div`
display:flex;
align-items:center;
margin-top:50px;`;

const RedColor = styled.div`
margin:5px;
background-color:red;
width:10px;
height:10px;`;

const BlueColor = styled.div`
margin:5px;
background-color:blue;
width:10px;
height:10px;`;

const MultiLineChart = (prop) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const stockNumber = prop.stockNumber;
    const response1 = await api.getStockData(stockNumber);
    const responseJson1 = await response1.json();
    const response2 = await api.getStockData(9999);
    const responseJson2 = await response2.json();
    const ARList1 = Object.values(responseJson1.AR);
    const ARList2 = Object.values(responseJson2.AR);
    const dateList = Object.values(responseJson1.Date);
    const parseTime = d3.timeParse('%Y/%m/%d');
    const newdateList = dateList.map(date => parseTime(date));
    const dataList = newdateList.map((element, index) => (
      { date: element, AR1: ARList1[index], AR2: ARList2[index] }
    ));
    setData(dataList);
  };
  useEffect(() => {
    if (data.length === 0) {
      fetchData();
    } else {
      draw();
    }
  }, [data]);

  const draw = () => {
    const margin = { top: 10, right: 60, bottom: 30, left: 60 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    // create svg
    const svg = d3
      .select('#timeSeriesMultiple')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    // create scale for the x-axis
    const xscale = d3.scaleTime().domain(d3.extent(data, (d) => { return d.date; }))
      .range([0, width]);

    svg.append('g').attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xscale));
    // create scale for the y-axis
    const yscale = d3.scaleLinear().domain([d3.min(data, (d) => { return Math.min(d.AR1, d.AR2); }), d3.max(data, (d) => { return Math.max(d.AR1, d.AR2); })])
      .range([height, 0]);

    svg.append('g').call(d3.axisLeft(yscale));
    // draw line1 on the chart
    const line1 = d3.line().x(function (d) { return xscale(d.date); })
      .y(function (d) { return yscale(d.AR1); });

    svg.append('path').datum(data).attr('fill', 'none')
      .attr('stroke', 'steelblue').attr('stroke-width', 2.5)
      .attr('d', line1);
    // draw line2 on the chart
    const line2 = d3.line().x(function (d) { return xscale(d.date); })
      .y(function (d) { return yscale(d.AR2); });

    svg.append('path').datum(data).attr('fill', 'none')
      .attr('stroke', 'red').attr('stroke-width', 2.5)
      .attr('d', line2);
  };

  return (
    <>
      <ChartName>
        <div>Stock Accumulative Return(%) </div> <BlueColor/>
        <div> vs TAIEX Accumulative Return(%)</div> <RedColor/>
      </ChartName>
      <div id="timeSeriesMultiple"></div>
    </>
  );
};

export default MultiLineChart;

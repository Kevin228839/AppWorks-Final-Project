import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import api from '../../../api';
import styled from 'styled-components';

const ChartName = styled.div`
margin-top:50px;`;

const PriceChart = (stock) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (data.length === 0) {
      fetchData();
    } else {
      draw();
    }
  }, [data]);

  const fetchData = async () => {
    const stockNumber = stock.stockNumber;
    const response = await api.getStockData(stockNumber);
    const responseJson = await response.json();
    const priceList = Object.values(responseJson.Close);
    const dateList = Object.values(responseJson.Date);
    const parseTime = d3.timeParse('%Y/%m/%d');
    const newdateList = dateList.map(date => parseTime(date));
    const dataList = newdateList.map((element, index) => (
      { date: element, price: priceList[index] }
    ));
    setData(dataList);
  };

  const draw = () => {
    const margin = { top: 10, right: 60, bottom: 30, left: 60 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // create svg
    const svg = d3
      .select('#timeSeriesPrice')
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
    const yscale = d3.scaleLinear().domain([0, d3.max(data, (d) => { return d.price; })])
      .range([height, 0]);

    svg.append('g').call(d3.axisLeft(yscale));

    // draw line on the chart
    const line = d3.line().x(function (d) { return xscale(d.date); })
      .y(function (d) { return yscale(d.price); });

    svg.append('path').datum(data).attr('fill', 'none')
      .attr('stroke', 'steelblue').attr('stroke-width', 2.5)
      .attr('d', line);
  };

  return (
    <>
      <ChartName>Price</ChartName>
      <div id="timeSeriesPrice"></div>
    </>
  );
};

export default PriceChart;

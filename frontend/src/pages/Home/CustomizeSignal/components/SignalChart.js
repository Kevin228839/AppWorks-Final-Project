import * as d3 from 'd3';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import api from '../../../../api';

const Chart = styled.div`
position:relative;`;

const Signal = styled.div`
position:absolute;
top:${(props) => props.top};
left:${(props) => props.left};
width:5px;
height:5px;
background-color:${(props) => props.color};`;

const SignalChart = (props) => {
  const [StockData, setStockData] = useState([]);
  const [signalMeta, setSignalMeta] = useState([]);
  const signalList = props.signal;
  useEffect(() => {
    if (StockData.length === 0) {
      fetchData();
    } else {
      draw();
    }
  }, [StockData]);
  const fetchData = async () => {
    const response = await api.getStockData(9999);
    const responseJson = await response.json();
    const priceList = Object.values(responseJson.Close);
    const dateList = Object.values(responseJson.Date);
    const parseTime = d3.timeParse('%Y/%m/%d');
    const newdateList = dateList.map(date => parseTime(date));
    const dataList = newdateList.map((element, index) => (
      { date: element, price: priceList[index] }
    ));
    setStockData(dataList);
    // get & set data for signal drawing
    const maxPrice = Math.max(...priceList);
    const dataLength = priceList.length;
    const margin = { top: 10, right: 60, bottom: 30, left: 60 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const shift = 8;
    setSignalMeta({ maxPrice, dataLength, priceList, margin, width, height, shift });
  };
  const draw = () => {
    const margin = { top: 10, right: 60, bottom: 30, left: 60 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    // create svg
    const svg = d3
      .select('#customizeStrategy')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    // create scale for the x-axis
    const xscale = d3.scaleTime().domain(d3.extent(StockData, (d) => { return d.date; }))
      .range([0, width]);

    svg.append('g').attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xscale));

    // create scale for the y-axis
    const yscale = d3.scaleLinear().domain([0, d3.max(StockData, (d) => { return d.price; })])
      .range([height, 0]);

    svg.append('g').call(d3.axisLeft(yscale));
    // draw line on the chart
    const line = d3.line().x(function (d) { return xscale(d.date); })
      .y(function (d) { return yscale(d.price); });
    svg.append('path').datum(StockData).attr('fill', 'none')
      .attr('stroke', 'black').attr('stroke-width', 2.5)
      .attr('d', line);
  };
  return (
    <>
      <Chart id="customizeStrategy">
      {(signalList === null)
        ? <div></div>
        : signalList.map((sign, index) => {
          if (sign > 0) {
            return <Signal key={index} color='red'
          left={signalMeta.width * (index / signalMeta.dataLength) + signalMeta.margin.left + 'px'}
          top={signalMeta.height * (signalMeta.maxPrice - signalMeta.priceList[index]) / signalMeta.maxPrice + signalMeta.margin.top + signalMeta.shift + 'px'}>
          </Signal>;
          }
          if (sign < 0) {
            return <Signal key={index} color='blue'
          left={signalMeta.width * (index / signalMeta.dataLength) + signalMeta.margin.left + 'px'}
          top={signalMeta.height * (signalMeta.maxPrice - signalMeta.priceList[index]) / signalMeta.maxPrice + signalMeta.margin.top - signalMeta.shift + 'px'}>
          </Signal>;
          }
          return <div key={index}></div>;
        })}
      </Chart>
    </>
  );
};

export default SignalChart;

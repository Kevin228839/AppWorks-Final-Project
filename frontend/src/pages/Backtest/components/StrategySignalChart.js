import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import api from '../../../api';
import styled from 'styled-components';
import Load from '../../Globals/Loading';

const ChartName = styled.div`
margin-top:50px;`;

const Chart = styled.div`
position:relative;`;

const Signal = styled.div`
position:absolute;
top:${(props) => props.top};
left:${(props) => props.left};
width:5px;
height:5px;
background-color:${(props) => props.color};`;

const StrategySignalChart = (prop) => {
  const [data, setData] = useState([]);
  const [signaldata, setSigaldata] = useState([]);
  useEffect(() => {
    if (data.length === 0) {
      fetchData();
    } else {
      draw();
    }
  }, [data]);
  const fetchData = async () => {
    // get & set data for svg drawing
    const stockNumber = prop.stockNumber;
    const response = await api.getBacktest(stockNumber, 'volume');
    const responseJson = await response.json();
    const priceList = Object.values(responseJson.Close);
    const dateList = Object.values(responseJson.Date);
    const parseTime = d3.timeParse('%Y/%m/%d');
    const newdateList = dateList.map(date => parseTime(date));
    const dataList = newdateList.map((element, index) => (
      { date: element, price: priceList[index] }
    ));
    setData(dataList);
    // get & set data for signal drawing
    const maxPrice = Math.max(...priceList);
    const signList = Object.values(responseJson.sign);
    const dataLength = signList.length;
    const margin = { top: 10, right: 60, bottom: 30, left: 60 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const shift = 5;
    setSigaldata({ maxPrice, dataLength, priceList, signList, margin, width, height, shift });
  };
  console.log(signaldata);

  const draw = () => {
    const margin = { top: 10, right: 60, bottom: 30, left: 60 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // create svg
    const svg = d3
      .select('#strategy')
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
      .attr('stroke', 'black').attr('stroke-width', 2.5)
      .attr('d', line);
  };
  if (data.length === 0) {
    return <Load />;
  }
  return (
    <>
      <ChartName>Strategy</ChartName>
      <Chart id="strategy">
      {signaldata.signList.map((sign, index) => {
        if (sign === 1) {
          return <Signal key={index} color='red'
          left={signaldata.width * (index / signaldata.dataLength) + signaldata.margin.left + 'px'}
          top={signaldata.height * (signaldata.maxPrice - signaldata.priceList[index]) / signaldata.maxPrice + signaldata.margin.top + signaldata.shift + 'px'}
          ></Signal>;
        }
        if (sign === -1) {
          return <Signal key={index} color='blue'
          left={signaldata.width * (index / signaldata.dataLength) + signaldata.margin.left + 'px'}
          top={signaldata.height * (signaldata.maxPrice - signaldata.priceList[index]) / signaldata.maxPrice + signaldata.margin.top - signaldata.shift + 'px'}>
          </Signal>;
        }
        return <></>;
      })}
      </Chart>
    </>
  );
};

export default StrategySignalChart;

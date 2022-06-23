import styled from 'styled-components';
import { useEffect, useState } from 'react';
import api from '../../../api';
import Load from '../../Globals/Loading';

const Circle = styled.div`
display:flex;
align-items:center;
justify-content:center;
border-radius:50%;
border: 3px solid black;
height:200px;
width:200px;
margin-left:80px;
margin-right:80px;
margin-top:30px;`;

const Caption = styled.div`
font-size: 20px;
margin:10px;`;

const Number = styled.div`
font-size: 20px;`;

const Fundamental = (stock) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const stockNumber = stock.stockNumber;
    const response = await api.getFundamental(stockNumber);
    const responseJson = await response.json();
    setData(responseJson);
  };
  if (data === null) {
    return <Load />;
  }

  return (
    <>
    <Circle>
      <Caption>Min:</Caption>
      <Number>{Math.round(data.min)}</Number>
    </Circle>
    <Circle>
    <Caption>Mean:</Caption>
      <Number>{Math.round(data.mean)}</Number>
    </Circle>
    <Circle>
      <Caption>Max:</Caption>
      <Number>{Math.round(data.max)}</Number>
    </Circle>
    </>
  );
};

export default Fundamental;

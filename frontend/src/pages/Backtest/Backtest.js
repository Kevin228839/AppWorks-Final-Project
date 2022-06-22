import PriceChart from './components/PriceChart';
import MultiLineChart from './components/MultiLineChart';
import VolumeChart from './components/VolumeChart';
import Load from '../Globals/Loading';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const SearchCaption = styled.div`
font-size:20px;`;

const SearchInput = styled.input.attrs(
  { type: 'text' }
)`
width:100px;
height:20px;
margin-left:10px;
margin-right:10px;`;

const SearchButton = styled.button`
border: 1px solid #BEBEBE;
border-radius:5px;`;

const FlexRow = styled.div`
display:flex;
justify-content:left;
align-items:center;
margin:20px;`;

const FlexColumn = styled.div`
display:flex;
flex-direction:column;
align-items:center;`;

const Backtest = () => {
  const [stock, setStock] = useState(null);
  useEffect(() => {
    const stockNumber = localStorage.getItem('StockBacktest') ? JSON.parse(localStorage.getItem('StockBacktest')) : '2330';
    setStock(stockNumber);
  }, []);
  const handleChange = () => {
    const stockNumber = document.getElementById('input').value;
    localStorage.setItem('StockBacktest', JSON.stringify(stockNumber));
    window.location.href = '/backtest';
  };
  console.log(stock);
  if (stock === null) {
    return <Load />;
  }
  return (
    <>
    <FlexRow>
      <SearchCaption>股票代號:</SearchCaption>
      <SearchInput id="input"/>
      <SearchButton onClick={() => { handleChange(); }}>送出</SearchButton>
    </FlexRow>
    <FlexColumn>
      <PriceChart stockNumber={stock}/>
      <VolumeChart stockNumber={stock}/>
      <MultiLineChart stockNumber={stock}/>
    </FlexColumn>
    </>
  );
};

export default Backtest;

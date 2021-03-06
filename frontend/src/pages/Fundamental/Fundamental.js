import PriceChart from './components/PriceChart';
import MultiLineChart from './components/MultiLineChart';
import VolumeChart from './components/VolumeChart';
import Load from '../Globals/Loading';
import FundamentalInfo from './components/FundamentalInfo';
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

const FlexRowAlignLeft = styled.div`
display:flex;
justify-content:left;
align-items:center;
margin:20px;`;

const FlexRowAlignCenter = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin:20px;`;

const FlexColumn = styled.div`
display:flex;
flex-direction:column;
align-items:center;`;

const Fundamental = () => {
  const [stock, setStock] = useState(null);
  useEffect(() => {
    const stockNumber = localStorage.getItem('StockBacktest') ? JSON.parse(localStorage.getItem('StockBacktest')) : '2330';
    setStock(stockNumber);
  }, []);
  const handleChange = () => {
    const stockNumber = document.getElementById('input').value;
    if (stockNumber === '9999' || stockNumber === '2330' || stockNumber === '2303' || stockNumber === '2609') {
      localStorage.setItem('StockBacktest', JSON.stringify(stockNumber));
      window.location.href = '/fundamental';
      console.log(stockNumber);
    } else {
      alert('wrong input');
    }
  };
  if (stock === null) {
    return <Load />;
  }
  return (
    <>
    <FlexRowAlignLeft>
      <SearchCaption>股票代號:</SearchCaption>
      <SearchInput id="input"/>
      <SearchButton onClick={() => { handleChange(); }}>送出</SearchButton>
    </FlexRowAlignLeft>
    <FlexRowAlignCenter>
      <FundamentalInfo stockNumber={stock}/>
    </FlexRowAlignCenter>
    <FlexColumn>
      <PriceChart stockNumber={stock}/>
      <VolumeChart stockNumber={stock}/>
      <MultiLineChart stockNumber={stock}/>
    </FlexColumn>
    </>
  );
};

export default Fundamental;

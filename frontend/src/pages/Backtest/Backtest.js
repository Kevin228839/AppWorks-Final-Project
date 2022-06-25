import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Load from '../Globals/Loading';
import StrategySignalChart from './Components/StrategySignalChart';
import BacktestInfo from './Components/BacktestInfo';
import StrategyArgs from './Components/StrategyArgs';

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

const Backtest = () => {
  const [stock, setStock] = useState(null);
  const [strategy, setStrategy] = useState(null);
  const [strategyArgs, setStrategyArgs] = useState(null);

  useEffect(() => {
    const stockNumber = localStorage.getItem('StockBacktest') ? JSON.parse(localStorage.getItem('StockBacktest')) : '2330';
    setStock(stockNumber);
    const strategyKind = localStorage.getItem('StrategyBacktest') ? JSON.parse(localStorage.getItem('StrategyBacktest')) : 'ma';
    setStrategy(strategyKind);
    const strategyKindArgs = localStorage.getItem('StrategyArgsBacktest') ? JSON.parse(localStorage.getItem('StrategyArgsBacktest')) : null;
    setStrategyArgs(strategyKindArgs);
  }, []);
  const handleStockChange = () => {
    const stockNumber = document.getElementById('stockinput').value;
    localStorage.setItem('StockBacktest', JSON.stringify(stockNumber));
    window.location.href = '/backtest';
  };
  const handleStrategyChange = () => {
    const stockNumber = document.getElementById('strategyinput').value;
    localStorage.setItem('StrategyBacktest', JSON.stringify(stockNumber));
    localStorage.removeItem('StrategyArgsBacktest');
    window.location.href = '/backtest';
  };
  if (stock === null || strategy === null) {
    return <Load />;
  }
  return (
    <>
    <FlexRowAlignLeft>
      <SearchCaption>股票:</SearchCaption>
      <SearchInput id="stockinput"/>
      <SearchButton onClick={() => { handleStockChange(); }}>送出</SearchButton>
    </FlexRowAlignLeft>
    <FlexRowAlignLeft>
      <SearchCaption>策略:</SearchCaption>
      <SearchInput id="strategyinput"/>
      <SearchButton onClick={() => { handleStrategyChange(); }}>送出</SearchButton>
    </FlexRowAlignLeft>
    <StrategyArgs strategy={strategy} strategyArgs={strategyArgs}/>
    <FlexRowAlignCenter>
      <BacktestInfo stockNumber={stock} strategy={strategy}/>
    </FlexRowAlignCenter>
    <FlexColumn>
      <StrategySignalChart stockNumber={stock} strategy={strategy} strategyArgs={strategyArgs}/>
    </FlexColumn>
    </>
  );
};

export default Backtest;

import React from 'react';
import styled from 'styled-components';

const StrategyDiv = styled.div`
border: 2px solid #0072E3;
border-radius:15px;
display:flex;
justify-content:center;
align-items:center;
width:400px;
height:60px;
margin:10px;
background-color:#0080FF;
font-size:45px;`;

const StrategyInBoard = ({ strategy }) => {
  console.log(strategy);
  const strategyName = strategy.strategy_name;
  return (
    <StrategyDiv>{strategyName}</StrategyDiv>
  );
};

export default StrategyInBoard;

import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

const StrategyDiv = styled.div`
cursor:pointer;
border: 2px solid #456A91;
border-radius:15px;
display:flex;
justify-content:center;
align-items:center;
width:400px;
height:60px;
margin:10px;
background-color:#456A91;
font-size:45px;
`;

const Strategy = ({ strategy, boardStrategy }) => {
  const strategyName = strategy.strategy_name;
  const kind = strategy.kind;
  const strategyArgs = strategy.strategy_args;
  const [, drag] = useDrag(() => ({
    type: 'strategy',
    item: { strategyName, strategyArgs, kind }
  }));
  return (
    <StrategyDiv ref={drag}>{strategyName}</StrategyDiv>
  );
};

export default Strategy;

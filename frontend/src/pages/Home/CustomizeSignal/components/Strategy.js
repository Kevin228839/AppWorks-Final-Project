import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

const StrategyDiv = styled.div`
border: 2px solid black;
border-radius:15px;
display:flex;
justify-content:center;
align-items:center;
width:400px;
height:60px;
margin:10px;
background-color:grey;
font-size:45px;`;

const Strategy = ({ strategyName }) => {
  const [, drag] = useDrag(() => ({
    type: 'strategy',
    item: { strategyName }
  }));
  return (
    <StrategyDiv ref={drag}>{strategyName}</StrategyDiv>
  );
};

export default Strategy;

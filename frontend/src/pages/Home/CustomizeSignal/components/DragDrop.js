import React, { useState } from 'react';
import styled from 'styled-components';
import Strategy from './Strategy';
import Mask from './Mask';
import { useDrop } from 'react-dnd';

const StrategyBlock = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin:20px;
height:300px;
width:500px;
border: solid 2px black;
border-radius:25px;`;

const MaskBlock = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin:20px;
height:300px;
width:500px;
border: solid 2px red;
border-radius:25px;`;

const Board = styled.div`
margin:20px;
height:500px;
width:200px;
border: solid 1px black;`;

const DragDrop = ({ StrategyList, MaskList }) => {
  const [board, setBoard] = useState([]);

  const [, drop] = useDrop(() => ({
    accept: 'strategy',
    drop: (item) => addStrategyToBoard(item.strategyName)
  }));
  const addStrategyToBoard = (name) => {
    console.log(StrategyList);
    console.log(name);
    const addResult = StrategyList.filter((strategy) => strategy.strategy_name === name);
    console.log(addResult);
    setBoard((board) => [...board, addResult[0].strategy_name]);
  };

  return (
    <>
      <StrategyBlock>
        {StrategyList.map((strategy, index) => {
          return <Strategy key={index} strategyName={strategy.strategy_name}/>;
        })}
      </StrategyBlock>
      <MaskBlock>
        {MaskList.map((mask, index) => {
          return <Mask key={index} maskName={mask.mask_name}/>;
        })}
      </MaskBlock>
      <Board className='Board' ref={drop}>
      {board.map((strategy, index) => {
        return <Strategy key={index} strategyName={strategy}/>;
      })}
      </Board>
    </>
  );
};

export default DragDrop;

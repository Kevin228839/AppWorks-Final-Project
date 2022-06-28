import React, { useState } from 'react';
import styled from 'styled-components';
import Strategy from './Strategy';
import Mask from './Mask';
import StrategyInBoard from './StrategyInBoard';
import MaskInBoard from './MaskInBoard';
import { useDrop } from 'react-dnd';

const FlexHorizontal = styled.div`
display:flex;`;

const Wrap = styled.div`
display:flex;
flex-direction:column;
align-items:center;
width:50%;`;

const StrategyBlock = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin:20px;
height:300px;
width:500px;
border: solid 2px #2828FF;
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
display:flex;
flex-direction:column;
align-items:center;
margin:20px;
height:500px;
width:500px;
border-radius:25px;
border: solid 2px black;`;

const DragDrop = ({ StrategyList, MaskList }) => {
  const [boardStrategy, setBoardStrategy] = useState([]);
  const [boardMask, setBoardMask] = useState([]);

  const [, drop] = useDrop(() => ({
    accept: ['strategy', 'mask'],
    drop: (item) => addToBoard(item)
  }));
  const addToBoard = (item) => {
    if (item.kind === 'strategy') {
      const addResult = StrategyList.filter((strategy) => strategy.strategy_name === item.strategyName);
      setBoardStrategy((board) => [...board, addResult[0]]);
    } else {
      const addResult = MaskList.filter((mask) => mask.mask_name === item.maskName);
      setBoardMask((board) => [...board, addResult[0]]);
    }
  };

  return (
    <>
    <FlexHorizontal>
      <Wrap>
        <StrategyBlock>
          {StrategyList.map((strategy, index) => {
            return <Strategy key={index} strategy={strategy}/>;
          })}
        </StrategyBlock>
        <MaskBlock>
          {MaskList.map((mask, index) => {
            return <Mask key={index} mask={mask}/>;
          })}
        </MaskBlock>
      </Wrap>
      <Wrap>
        <Board ref={drop}>
          {boardStrategy.map((strategy, index) => {
            return <StrategyInBoard key={index} strategy={strategy}/>;
          })}
          {boardMask.map((mask, index) => {
            return <MaskInBoard key={index} mask={mask}/>;
          })}
        </Board>
      </Wrap>
      </FlexHorizontal>
    </>
  );
};

export default DragDrop;

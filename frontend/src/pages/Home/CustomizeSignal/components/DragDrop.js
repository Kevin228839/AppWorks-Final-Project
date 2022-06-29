import React, { useState } from 'react';
import styled from 'styled-components';
import Strategy from './Strategy';
import Mask from './Mask';
import Box from './Box';

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

const DragDrop = ({ StrategyList, MaskList }) => {
  const [boardStrategy, setBoardStrategy] = useState([[], []]);
  const [boardMask, setBoardMask] = useState([[], []]);
  console.log(boardStrategy);
  return (
    <>
    <FlexHorizontal>
      <Wrap>
        <StrategyBlock>
          {StrategyList.map((strategy, index) => {
            return <Strategy key={index} strategy={strategy} boardStrategy={boardStrategy}/>;
          })}
        </StrategyBlock>
        <MaskBlock>
          {MaskList.map((mask, index) => {
            return <Mask key={index} mask={mask}/>;
          })}
        </MaskBlock>
      </Wrap>
      <Wrap>
        {boardStrategy.map((item, index) => {
          return <Box key={index} StrategyList={StrategyList} MaskList={MaskList}
          boardStrategy={boardStrategy} setBoardStrategy={setBoardStrategy}
          boardMask={boardMask} setBoardMask={setBoardMask} blockId={index}
          />;
        })}
      </Wrap>
      </FlexHorizontal>
    </>
  );
};

export default DragDrop;

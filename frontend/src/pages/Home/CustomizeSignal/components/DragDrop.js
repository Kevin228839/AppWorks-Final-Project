import React, { useState } from 'react';
import styled from 'styled-components';
import Strategy from './Strategy';
import Mask from './Mask';
import Box from './Box';
import api from '../../../../api';

const FlexHorizontal = styled.div`
display:flex;
flex-direction:column;
justify-contenr:center;
align-items:center;`;

const Wrap = styled.div`
display:flex;
justify-content:center;
align-items:center;`;

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

const GetResultButton = styled.button`
width:100px;
height:100px;
background-color:black;
color:white;`;

const DragDrop = ({ StrategyList, MaskList }) => {
  const [boardStrategy, setBoardStrategy] = useState([[], []]);
  const [boardMask, setBoardMask] = useState([[], []]);
  const handleGetStrategyResult = async () => {
    // get each strategy's signal
    const blockStrategyResultCombine = [];
    for (let i = 0; i < boardStrategy.length; i++) {
      const blockStrategyResult = [];
      for (let j = 0; j < boardStrategy[i].length; j++) {
        const strategyName = boardStrategy[i][j].strategy_name;
        const strategyArgsName = boardStrategy[i][j].strategy_args;
        const strategyArgsInput = boardStrategy[i][j].args_input;
        const strategyArgsObject = {};
        strategyArgsName.map((argName, index) => {
          return (
            strategyArgsObject[argName] = strategyArgsInput[index]
          );
        });
        const stockNumber = 9999;
        const response = await api.getBacktest(stockNumber, strategyName, strategyArgsObject);
        const responseJson = await response.json();
        blockStrategyResult.push(Object.values(responseJson.sign));
      }
      blockStrategyResultCombine.push(blockStrategyResult);
    }
    // get final strategy's signal for each block
    const allBlockFinalSignalStrategy = [];
    for (let i = 0; i < blockStrategyResultCombine.length; i++) {
      if (blockStrategyResultCombine[i].length === 0) {
        const blockFinalSignal = [];
        allBlockFinalSignalStrategy.push(blockFinalSignal);
      } else {
        const blockFinalSignal = [];
        for (let k = 0; k < blockStrategyResultCombine[i][0].length; k++) {
          const strategySameDaySignals = [];
          for (let j = 0; j < blockStrategyResultCombine[i].length; j++) {
            strategySameDaySignals.push(blockStrategyResultCombine[i][j][k]);
          }
          if (strategySameDaySignals.every(signal => (signal === strategySameDaySignals[0]))) {
            blockFinalSignal.push(strategySameDaySignals[0]);
          } else {
            blockFinalSignal.push(0);
          }
        }
        allBlockFinalSignalStrategy.push(blockFinalSignal);
      }
    }
    console.log('allBlockFinalSignalStrategy', allBlockFinalSignalStrategy);
    // get each mask's signal
    const blockMaskResultCombine = [];
    for (let i = 0; i < boardMask.length; i++) {
      const blockMaskResult = [];
      for (let j = 0; j < boardMask[i].length; j++) {
        const stockNo = 9999;
        const maskName = boardMask[i][j].mask_name;
        const argsInput = boardMask[i][j].args_input;
        const situation = argsInput[0];
        const threshold = argsInput[1];
        const response = await api.getMaskResult(stockNo, maskName, situation, threshold);
        const responseJson = await response.json();
        blockMaskResult.push(Object.values(responseJson.Mask));
      }
      blockMaskResultCombine.push(blockMaskResult);
    }
    // get final mask's signal for each block
    const allBlockFinalSignalMask = [];
    for (let i = 0; i < blockMaskResultCombine.length; i++) {
      if (blockMaskResultCombine[i].length === 0) {
        const maskFinalSignal = [];
        allBlockFinalSignalMask.push(maskFinalSignal);
      } else {
        const maskFinalSignal = [];
        for (let k = 0; k < blockMaskResultCombine[i][0].length; k++) {
          const maskSameDaySignals = [];
          for (let j = 0; j < blockMaskResultCombine[i].length; j++) {
            maskSameDaySignals.push(blockMaskResultCombine[i][j][k]);
          }
          if (maskSameDaySignals.every(signal => signal === 1)) {
            maskFinalSignal.push(1);
          } else {
            maskFinalSignal.push(0);
          }
        }
        allBlockFinalSignalMask.push(maskFinalSignal);
      }
    }
    console.log('allBlockFinalSignalMask', allBlockFinalSignalMask);
    // calculate (mask + strategy) result for each box
    const allBlockFinalSignalMaskPlusStrategy = [];
    for (let i = 0; i < allBlockFinalSignalMask.length; i++) {
      if (allBlockFinalSignalMask[i].length === 0) {
        allBlockFinalSignalMaskPlusStrategy.push(allBlockFinalSignalStrategy[i]);
      } else {
        if (allBlockFinalSignalStrategy[i].length === 0) {
          allBlockFinalSignalMaskPlusStrategy.push(allBlockFinalSignalStrategy[i]);
        } else {
          const maskPlusStrategyFinalSignal = [];
          for (let j = 0; j < allBlockFinalSignalMask[i].length; j++) {
            if (allBlockFinalSignalMask[i][j] === 0) {
              maskPlusStrategyFinalSignal.push(0);
            } else {
              maskPlusStrategyFinalSignal.push(allBlockFinalSignalStrategy[i][j]);
            }
          }
          allBlockFinalSignalMaskPlusStrategy.push(maskPlusStrategyFinalSignal);
        }
      }
    }
    console.log('allBlockFinalSignalMaskPlusStrategy', allBlockFinalSignalMaskPlusStrategy);
    // remove empty item from allBlockFinalSignalMaskPlusStrategy
    const removeEmpty = [];
    for (let i = 0; i < allBlockFinalSignalMaskPlusStrategy.length; i++) {
      if (allBlockFinalSignalMaskPlusStrategy[i].length !== 0) {
        removeEmpty.push(allBlockFinalSignalMaskPlusStrategy[i]);
      }
    }
    console.log('removeEmpty', removeEmpty);
    // calculate final signal for drawing
    if (removeEmpty.length === 0) {
      alert('No Strategy found');
      return;
    }
    const finalSignalForDrawing = [];
    for (let j = 0; j < removeEmpty[0].length; j++) {
      let aggregateSignal = 0;
      for (let i = 0; i < removeEmpty.length; i++) {
        aggregateSignal = aggregateSignal + removeEmpty[i][j];
      }
      finalSignalForDrawing.push(aggregateSignal);
    }
    console.log('finalSignalForDrawing', finalSignalForDrawing);
  };
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
          return (
            <>
          <Box key={index} StrategyList={StrategyList} MaskList={MaskList}
          boardStrategy={boardStrategy} setBoardStrategy={setBoardStrategy}
          boardMask={boardMask} setBoardMask={setBoardMask} blockId={index}
          /> <div>+</div>
          </>);
        })}
      </Wrap>
      <Wrap>
        <GetResultButton onClick={() => { handleGetStrategyResult(); }}>submit</GetResultButton>
      </Wrap>
      </FlexHorizontal>
    </>
  );
};

export default DragDrop;

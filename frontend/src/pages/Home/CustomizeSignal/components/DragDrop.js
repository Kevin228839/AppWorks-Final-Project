import React, { useState } from 'react';
import styled from 'styled-components';
import Strategy from './Strategy';
import Mask from './Mask';
import Box from './Box';
import api from '../../../../api';
import _ from 'lodash';
import plus from '../../../../images/plus-between-blocks.svg';
import plusButton from '../../../../images/plus-button.png';
import shiftLeft from '../../../../images/shift-left.svg';
import shiftRight from '../../../../images/shift-right.svg';

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
background-color:#ACC8E5;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin:20px;
height:300px;
width:500px;
border: solid 2px #ACC8E5;
border-radius:25px;`;

const MaskBlock = styled.div`
background-color:#F7AFAF;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin:20px;
height:300px;
width:500px;
border: solid 2px #E77373;
border-radius:25px;`;

const GetResultButton = styled.button`
width:100px;
height:100px;
background-color:black;
color:white;`;

const Img = styled.img`
user-drag: none;
-webkit-user-drag: none;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
width:30px;
height:30px;`;

const PlusButton = styled.div`
height:40px;
width:40px;
cursor:pointer;`;

const ImgAddBlockButton = styled.img`
user-drag: none;
-webkit-user-drag: none;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
width:40px;
height:40px;`;

const ImgShiftBlock = styled.img`
cursor:pointer;
user-drag: none;
-webkit-user-drag: none;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
height:30px;
width:30px;
margin:20px;`;

const DragDrop = ({ StrategyList, MaskList, setSignal }) => {
  const [boardStrategy, setBoardStrategy] = useState([[]]);
  const [boardMask, setBoardMask] = useState([[]]);
  console.log(boardStrategy);
  console.log(boardMask);
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
    setSignal(finalSignalForDrawing);
  };
  const AddBlockToBeginning = () => {
    if (boardStrategy.length === 3 || boardMask.length === 3) {
      alert('upgrade to premium for more strategy blocks!');
      return;
    }
    const newBoardStrategy = _.cloneDeep(boardStrategy);
    const newBoardMask = _.cloneDeep(boardMask);
    newBoardStrategy.unshift([]);
    newBoardMask.unshift([]);
    setBoardStrategy(newBoardStrategy);
    setBoardMask(newBoardMask);
  };

  const AddBlockToEnd = () => {
    if (boardStrategy.length === 3 || boardMask.length === 3) {
      alert('upgrade to premium for more strategy blocks!');
      return;
    }
    const newBoardStrategy = _.cloneDeep(boardStrategy);
    const newBoardMask = _.cloneDeep(boardMask);
    newBoardStrategy.push([]);
    newBoardMask.push([]);
    setBoardStrategy(newBoardStrategy);
    setBoardMask(newBoardMask);
  };

  const shiftBlocksLeft = () => {
    if (boardStrategy.length === 1 || boardMask.length === 1) {
      return;
    }
    const newBoardStrategy = _.cloneDeep(boardStrategy);
    const newBoardMask = _.cloneDeep(boardMask);
    const firstBlockStrategy = newBoardStrategy.shift();
    newBoardStrategy.push(firstBlockStrategy);
    const firstBlockMask = newBoardMask.shift();
    newBoardMask.push(firstBlockMask);
    setBoardStrategy(newBoardStrategy);
    setBoardMask(newBoardMask);
  };

  const shiftBlocksRight = () => {
    if (boardStrategy.length === 1 || boardMask.length === 1) {
      return;
    }
    const newBoardStrategy = _.cloneDeep(boardStrategy);
    const newBoardMask = _.cloneDeep(boardMask);
    const lastBlockStrategy = newBoardStrategy.pop();
    newBoardStrategy.unshift(lastBlockStrategy);
    const lastBlockMask = newBoardMask.pop();
    newBoardMask.unshift(lastBlockMask);
    setBoardStrategy(newBoardStrategy);
    setBoardMask(newBoardMask);
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
        <PlusButton>
          <ImgAddBlockButton src={plusButton} onClick={() => { AddBlockToBeginning(); }}/>
        </PlusButton>
        {boardStrategy.map((item, index) => {
          return (
            (index !== 0)
              ? <Wrap key={index}>
            <Img src={plus} />
            <Box StrategyList={StrategyList} MaskList={MaskList}
            boardStrategy={boardStrategy} setBoardStrategy={setBoardStrategy}
            boardMask={boardMask} setBoardMask={setBoardMask} blockId={index}
            />
          </Wrap>
              : <Wrap key={index}>
          <Box StrategyList={StrategyList} MaskList={MaskList}
          boardStrategy={boardStrategy} setBoardStrategy={setBoardStrategy}
          boardMask={boardMask} setBoardMask={setBoardMask} blockId={index}
          />
        </Wrap>);
        })}
        <PlusButton>
          <ImgAddBlockButton src={plusButton} onClick={() => { AddBlockToEnd(); }}/>
        </PlusButton>
      </Wrap>
      <Wrap>
        <ImgShiftBlock src={shiftLeft} onClick={() => { shiftBlocksLeft(); }}/>
        <ImgShiftBlock src={shiftRight} onClick={() => { shiftBlocksRight(); }}/>
      </Wrap>
      <Wrap>
        <GetResultButton onClick={() => { handleGetStrategyResult(); }}>submit</GetResultButton>
      </Wrap>
      </FlexHorizontal>
    </>
  );
};

export default DragDrop;

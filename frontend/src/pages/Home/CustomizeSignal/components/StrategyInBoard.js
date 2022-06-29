import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const StrategyDiv = styled.div`
border: 2px solid #0072E3;
border-radius:15px;
display:flex;
justify-content:space-between;
align-items:center;
width:500px;
height:60px;
margin:10px;
background-color:#0080FF;`;

const StrategyName = styled.div`
display:flex;
justify-content:center;
align-items:center;
height:60px;
width:100px;
font-size:35px;`;

const Trashbin = styled.div`
width:20px;
height:20px;
border:1px solid black`;

const ArgsName = styled.label`
border: 1px solid #FFB5B5;
border-radius: 15px;
font-size:25px;`;

const ArgSettingButton = styled.div`
width:20px;
height:20px;
border:1px solid red;`;

const ArgsInputDiv = styled.div`
display:none;
justify-content:center;
align-items:center;
background-color:#0080FF;
width:200px;
height:50px;`;

const StyledInput = styled.input.attrs({
  type: 'text'
})`
text-align:center;
border-radius:5px;
border:2px solid #003D79;
height:30px;
width:60px;
margin:10px;
background-color:#46A3FF;`;

const StyledSetConfirm = styled.div`
color:blue;
display:none;
width:20px;
height:20px;
border:1px solid blue;`;

const StrategyInBoard = ({ strategy, id, blockId, boardStrategy, setBoardStrategy }) => {
  const strategyName = strategy.strategy_name;
  const strategyArgsName = strategy.strategy_args;

  const handleArgsSettingStart = () => {
    for (let i = 0; i < strategyArgsName.length; i++) {
      const argName = document.getElementById(`strategy${strategyArgsName[i]}Label${blockId}${id}`);
      argName.style.display = 'none';
    }
    const argsSettingButton = document.getElementById(`strategyArgSettingButton${blockId}${id}`);
    const setConfirm = document.getElementById(`strategySetConfirm${blockId}${id}`);
    const argsInputBox = document.getElementById(`strategyArgsInputDiv${blockId}${id}`);
    argsSettingButton.style.display = 'none';
    setConfirm.style.display = 'block';
    argsInputBox.style.display = 'flex';
  };

  const handleArgsSettingEnd = () => {
    // get args input
    const strategyArgsInput = [];
    for (let i = 0; i < strategyArgsName.length; i++) {
      const argsValue = document.getElementById(`strategy${strategyArgsName[i]}Input${blockId}${id}`).value;
      strategyArgsInput.push(argsValue);
    }
    // save args input to boardStrategy
    const newBoardStrategy = _.cloneDeep(boardStrategy);
    for (let i = 0; i < newBoardStrategy.length; i++) {
      if (i === blockId) {
        for (let j = 0; j < newBoardStrategy[i].length; j++) {
          if (j === id) {
            newBoardStrategy[i][j].args_input = strategyArgsInput;
          }
        }
      }
    }
    setBoardStrategy(newBoardStrategy);
    // 畫面切換
    for (let i = 0; i < strategyArgsName.length; i++) {
      const argName = document.getElementById(`strategy${strategyArgsName[i]}Label${blockId}${id}`);
      argName.style.display = 'block';
    }
    const argsSettingButton = document.getElementById(`strategyArgSettingButton${blockId}${id}`);
    argsSettingButton.style.display = 'block';
    const setConfirm = document.getElementById(`strategySetConfirm${blockId}${id}`);
    setConfirm.style.display = 'none';
    for (let i = 0; i < strategyArgsName.length; i++) {
      const argsInput = document.getElementById(`strategy${strategyArgsName[i]}Input${blockId}${id}`);
      argsInput.style.display = 'none';
    }
  };

  const handleDelete = () => {
    const newBoardStrategy = boardStrategy.map((item, index) => {
      if (index === blockId) {
        const arr = [];
        for (let i = 0; i < item.length; i++) {
          if (i !== id) {
            arr.push(item[i]);
          }
        }
        return arr;
      }
      return item;
    });
    setBoardStrategy(newBoardStrategy);
  };

  return (
    <StrategyDiv>
      <StrategyName>
        {strategyName}
      </StrategyName>
      {strategyArgsName.map((argName, index) => {
        return (
          (strategy.args_input === undefined)
            ? <div key={index}>
            <ArgsName id={'strategy' + argName + 'Label' + blockId + id} >
              {argName}
            </ArgsName>
        </div>
            : <div key={index}>
            <ArgsName id={'strategy' + argName + 'Label' + blockId + id} >
              {strategy.args_input[index]}
            </ArgsName>
          </div>
        );
      })}
      <ArgsInputDiv id={'strategyArgsInputDiv' + blockId + id}>
        {strategyArgsName.map((argName, index) => {
          return (
            <div key={index}>
              <StyledInput id={'strategy' + argName + 'Input' + blockId + id} placeholder={argName}/>
            </div>
          );
        })}
      </ArgsInputDiv>
      <StyledSetConfirm id={'strategySetConfirm' + blockId + id} onClick={() => { handleArgsSettingEnd(); }}>
        V
      </StyledSetConfirm>
      <ArgSettingButton onClick={() => { handleArgsSettingStart(); }} id={'strategyArgSettingButton' + blockId + id}>
      </ArgSettingButton >
      <Trashbin onClick={() => { handleDelete(); }}>
        X
      </Trashbin>
    </StrategyDiv>
  );
};

export default StrategyInBoard;

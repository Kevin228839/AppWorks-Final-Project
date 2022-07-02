import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import trashbin from '../../../../images/trashbin.svg';
import setting from '../../../../images/setting.svg';
import check from '../../../../images/check.svg';

const StrategyDiv = styled.div`
border: 2px solid #ACC8E5;
border-radius:15px;
display:flex;
align-items:center;
width:550px;
height:60px;
margin:10px;
background-color:#ACC8E5;`;

const StrategyName = styled.div`
margin-left:20px;
display:flex;
justify-content:left;
align-items:center;
height:60px;
width:160px;
font-size:35px;`;

const ArgsNameDiv = styled.div`
display:flex;
justify-content:left;
align-items:center;
width:300px;
height:60px;`;

const ArgsName = styled.div`
width:100px;
font-size:20px;`;

const ArgSettingButton = styled.img`
cursor:pointer;
width:20px;
height:20px;
margin-right:20px;`;

const ArgsInputDiv = styled.div`
display:none;
justify-content:left;
align-items:center;
width:300px;
height:60px;`;

const StyledInput = styled.input.attrs({
  type: 'text'
})`
text-align:center;
border-radius:5px;
border:2px solid #456A91;
height:30px;
width:85px;
margin-right:5px;
background-color:#456A91;
&:focus{
  outline:none;
}
::placeholder{
  color:#3C3C3C;
}`;

const StyledSetConfirm = styled.img`
cursor:pointer;
display:none;
width:20px;
height:20px;
margin-right:20px;`;

const Trashbin = styled.img`
cursor:pointer;
width:20px;
height:20px;`;

const StrategyInBoard = ({ strategy, id, blockId, boardStrategy, setBoardStrategy }) => {
  const strategyName = strategy.strategy_name;
  const strategyArgsName = strategy.strategy_args;

  const handleArgsSettingStart = () => {
    const argsNameDiv = document.getElementById(`strategyArgsNameDiv${blockId}${id}`);
    argsNameDiv.style.display = 'none';
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
    const argsInputBox = document.getElementById(`strategyArgsInputDiv${blockId}${id}`);
    argsInputBox.style.display = 'none';
    const argsNameDiv = document.getElementById(`strategyArgsNameDiv${blockId}${id}`);
    argsNameDiv.style.display = 'flex';
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
      <ArgsNameDiv id={'strategyArgsNameDiv' + blockId + id}>
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
      </ArgsNameDiv>
      <ArgsInputDiv id={'strategyArgsInputDiv' + blockId + id}>
        {strategyArgsName.map((argName, index) => {
          return (
            <div key={index}>
              <StyledInput id={'strategy' + argName + 'Input' + blockId + id} placeholder={argName}/>
            </div>
          );
        })}
      </ArgsInputDiv>
      <StyledSetConfirm src={check} id={'strategySetConfirm' + blockId + id} onClick={() => { handleArgsSettingEnd(); }} />
      <ArgSettingButton src={setting} onClick={() => { handleArgsSettingStart(); }} id={'strategyArgSettingButton' + blockId + id}>
      </ArgSettingButton >
      <Trashbin src={trashbin} onClick={() => { handleDelete(); }} />
    </StrategyDiv>
  );
};

export default StrategyInBoard;

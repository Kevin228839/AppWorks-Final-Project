import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const MaskDiv = styled.div`
border: 2px solid #FF5151;
border-radius:15px;
display:flex;
justify-content:space-around;
align-items:center;
width:500px;
height:60px;
margin:10px;
background-color:#FF7575;`;

const MaskName = styled.div`
display:flex;
justify-content:center;
align-items:center;
height:60px;
width:180px;
font-size:35px;`;

const Trashbin = styled.div`
width:20px;
height:20px;
border:1px solid black;`;

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
background-color:#FF7575;
width:200px;
height:50px;`;

const StyledSelect = styled.select`
margin:10px;
background-color:#FF5151;
border:2px; solid #FF5151;
border-radius:5px;
width:120px;
height:30px;`;

const StyledInput = styled.input.attrs({
  type: 'text'
})`
text-align:center;
border-radius:5px;
border:2px solid #FF5151;
height:30px;
width:80px;
background-color:#FF5151`;

const StyledSetConfirm = styled.div`
color:red;
display:none;
width:20px;
height:20px;
border:1px solid red;`;

const MaskInBoard = ({ mask, id, blockId, boardMask, setBoardMask }) => {
  const maskName = mask.mask_name;
  const maskArgsName = mask.mask_args;

  const handleArgsSettingStart = () => {
    const situationLabel = document.getElementById(`masksituationLabel${blockId}${id}`);
    const thresholdLabel = document.getElementById(`maskthresholdLabel${blockId}${id}`);
    const argsSettingButton = document.getElementById(`maskArgSettingButton${blockId}${id}`);
    const argsInputBox = document.getElementById(`maskArgsInputDiv${blockId}${id}`);
    const setConfirm = document.getElementById(`maskSetConfirm${blockId}${id}`);
    situationLabel.style.display = 'none';
    thresholdLabel.style.display = 'none';
    argsSettingButton.style.display = 'none';
    argsInputBox.style.display = 'flex';
    setConfirm.style.display = 'block';
  };

  const handleArgsSettingEnd = () => {
    // get args input
    const maskArgsInput = [];
    const situationValue = document.getElementById(`maskSituationSelect${blockId}${id}`).value;
    const thresholdValue = document.getElementById(`maskThresholdInput${blockId}${id}`).value;
    maskArgsInput.push(situationValue);
    maskArgsInput.push(thresholdValue);
    // save args input to boardMask
    const newBoardMask = _.cloneDeep(boardMask);
    for (let i = 0; i < newBoardMask.length; i++) {
      if (i === blockId) {
        for (let j = 0; j < newBoardMask[i].length; j++) {
          if (j === id) {
            newBoardMask[i][j].args_input = maskArgsInput;
          }
        }
      }
    }
    setBoardMask(newBoardMask);
    // 畫面切換
    const situationLabel = document.getElementById(`masksituationLabel${blockId}${id}`);
    const thresholdLabel = document.getElementById(`maskthresholdLabel${blockId}${id}`);
    const argsSettingButton = document.getElementById(`maskArgSettingButton${blockId}${id}`);
    const argsInputBox = document.getElementById(`maskArgsInputDiv${blockId}${id}`);
    const setConfrim = document.getElementById(`maskSetConfirm${blockId}${id}`);
    situationLabel.style.display = 'block';
    thresholdLabel.style.display = 'block';
    argsSettingButton.style.display = 'block';
    argsInputBox.style.display = 'none';
    setConfrim.style.display = 'none';
  };
  const handleDelete = () => {
    const newBoardMask = boardMask.map((item, index) => {
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
    setBoardMask(newBoardMask);
  };

  return (
    <MaskDiv id={'MaskDiv' + blockId + id}>
      <MaskName>
        {maskName}
      </MaskName>
      {maskArgsName.map((argName, index) => {
        return (
          (mask.args_input === undefined)
            ? <div key={index}>
            <ArgsName id={'mask' + argName + 'Label' + blockId + id} >
              {argName}
            </ArgsName>
        </div>
            : <div key={index}>
            <ArgsName id={'mask' + argName + 'Label' + blockId + id} >
              {mask.args_input[index]}
            </ArgsName>
          </div>
        );
      })}
      <ArgsInputDiv id={'maskArgsInputDiv' + blockId + id}>
        <StyledSelect id={'maskSituationSelect' + blockId + id}>
          <option value="less than">less than </option>
          <option value="greater than">greater than</option>
        </StyledSelect>
        <StyledInput id={'maskThresholdInput' + blockId + id} placeholder={maskName}/>
      </ArgsInputDiv>
      <StyledSetConfirm id={'maskSetConfirm' + blockId + id} onClick={() => { handleArgsSettingEnd(); }}>
        V
      </StyledSetConfirm>
      <ArgSettingButton onClick={() => { handleArgsSettingStart(); }} id={'maskArgSettingButton' + blockId + id}>
      </ArgSettingButton >
      <Trashbin onClick={() => { handleDelete(); }}>
        X
      </Trashbin>
    </MaskDiv>
  );
};

export default MaskInBoard;

import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import trashbin from '../../../../images/trashbin.svg';
import setting from '../../../../images/setting.svg';
import check from '../../../../images/check.svg';

const MaskDiv = styled.div`
border: 2px solid #F7AFAF;
border-radius:15px;
display:flex;
align-items:center;
width:550px;
height:60px;
margin:10px;
background-color:#F7AFAF;`;

const MaskName = styled.div`
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
display:${props => props.display};
justify-content:left;
align-items:center;
width:300px;
height:60px;`;

const StyledSelect = styled.select`
margin-right:10px;
background-color:#DD5252;
border:2px; solid #DD5252;
border-radius:5px;
width:90px;
height:30px;
&:focus{
  outline:none;
}`;

const StyledInput = styled.input.attrs({
  type: 'text'
})`
text-align:center;
border-radius:5px;
border:2px solid #DD5252;
height:30px;
width:85px;
background-color:#DD5252;
&:focus{
  outline:none;
}
::placeholder{
  color:#3C3C3C;
}`;

const StyledInputDate = styled.input.attrs({
  type: 'date'
})`
text-align:center;
border-radius:5px;
border:2px solid #DD5252;
height:30px;
width:85px;
background-color:#DD5252;
&:focus{
  outline:none;
}
::placeholder{
  color:#3C3C3C;
}`;

const StyledSetConfirm = styled.img`
cursor:pointer;
display:${props => props.display};
width:20px;
height:20px;
margin-right:20px;`;

const Trashbin = styled.img`
cursor:pointer;
width:20px;
height:20px;`;

const MaskInBoard = ({ mask, id, blockId, boardMask, setBoardMask }) => {
  const maskName = mask.mask_name;
  const maskArgsName = mask.mask_args;

  const handleArgsSettingStart = () => {
    const argsNameDiv = document.getElementById(`maskArgsNameDiv${blockId}${id}`);
    const situationLabel = document.getElementById(`masksituationLabel${blockId}${id}`);
    const thresholdLabel = document.getElementById(`maskthresholdLabel${blockId}${id}`);
    const argsSettingButton = document.getElementById(`maskArgSettingButton${blockId}${id}`);
    const argsInputBox = document.getElementById(`maskArgsInputDiv${blockId}${id}`);
    const setConfirm = document.getElementById(`maskSetConfirm${blockId}${id}`);
    argsNameDiv.style.display = 'none';
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
    let thresholdValue = document.getElementById(`maskThresholdInput${blockId}${id}`).value;
    if (mask.mask_name === 'date') {
      if (thresholdValue === '') {
        alert('條件參數格式錯誤:日期尚未選擇');
        return;
      }
      thresholdValue = thresholdValue.replaceAll('-', '/');
    } else {
      if (!thresholdValue.match(/^-?\d+\.?\d*$/)) {
        alert('條件參數格式錯誤');
        return;
      }
      thresholdValue = parseFloat(thresholdValue).toString();
    }
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
    if (document.getElementById(`maskArgsNameDiv${blockId}${id}`) === null) {
      const argsInputBox = document.getElementById(`maskArgsInputDiv${blockId}${id}`);
      const setConfrim = document.getElementById(`maskSetConfirm${blockId}${id}`);
      argsInputBox.style.display = 'none';
      setConfrim.style.display = 'none';
    } else {
      const situationLabel = document.getElementById(`masksituationLabel${blockId}${id}`);
      const thresholdLabel = document.getElementById(`maskthresholdLabel${blockId}${id}`);
      const argsSettingButton = document.getElementById(`maskArgSettingButton${blockId}${id}`);
      const argsInputBox = document.getElementById(`maskArgsInputDiv${blockId}${id}`);
      const setConfrim = document.getElementById(`maskSetConfirm${blockId}${id}`);
      const argsNameDiv = document.getElementById(`maskArgsNameDiv${blockId}${id}`);
      situationLabel.style.display = 'block';
      thresholdLabel.style.display = 'block';
      argsSettingButton.style.display = 'block';
      argsInputBox.style.display = 'none';
      setConfrim.style.display = 'none';
      argsNameDiv.style.display = 'flex';
    }
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

  if (mask.args_input === undefined) {
    return (
      <MaskDiv id={'MaskDiv' + blockId + id}>
        <MaskName>
          {maskName}
        </MaskName>
        <ArgsInputDiv id={'maskArgsInputDiv' + blockId + id} display={'flex'}>
          <StyledSelect id={'maskSituationSelect' + blockId + id}>
            <option value="less than">less than </option>
            <option value="greater than">greater than</option>
          </StyledSelect>
          {(mask.mask_name === 'date')
            ? <StyledInputDate id={'maskThresholdInput' + blockId + id} placeholder={maskName}/>
            : <StyledInput id={'maskThresholdInput' + blockId + id} placeholder={maskName}/>
          }
        </ArgsInputDiv>
        <StyledSetConfirm src={check} id={'maskSetConfirm' + blockId + id} onClick={() => { handleArgsSettingEnd(); }} display={'block'}/>
        <Trashbin src={trashbin} onClick={() => { handleDelete(); }}/>
      </MaskDiv>
    );
  } else {
    return (
      <MaskDiv id={'MaskDiv' + blockId + id}>
        <MaskName>
          {maskName}
        </MaskName>
        <ArgsNameDiv id={'maskArgsNameDiv' + blockId + id}>
          {maskArgsName.map((argName, index) => {
            return (
              <div key={index}>
                <ArgsName id={'mask' + argName + 'Label' + blockId + id} >
                  {mask.args_input[index]}
                </ArgsName>
              </div>
            );
          })}
        </ArgsNameDiv>
        <ArgsInputDiv id={'maskArgsInputDiv' + blockId + id} display={'none'}>
          <StyledSelect id={'maskSituationSelect' + blockId + id}>
            <option value="less than">less than </option>
            <option value="greater than">greater than</option>
          </StyledSelect>
          {(mask.mask_name === 'date')
            ? <StyledInputDate id={'maskThresholdInput' + blockId + id} placeholder={maskName}/>
            : <StyledInput id={'maskThresholdInput' + blockId + id} placeholder={maskName}/>
          }
        </ArgsInputDiv>
        <StyledSetConfirm src={check} id={'maskSetConfirm' + blockId + id} onClick={() => { handleArgsSettingEnd(); }} display={'none'}/>
        <ArgSettingButton src={setting} onClick={() => { handleArgsSettingStart(); }} id={'maskArgSettingButton' + blockId + id}>
        </ArgSettingButton >
        <Trashbin src={trashbin} onClick={() => { handleDelete(); }}/>
      </MaskDiv>
    );
  }
};

export default MaskInBoard;

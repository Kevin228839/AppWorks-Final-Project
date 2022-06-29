import { useDrop } from 'react-dnd';
import StrategyInBoard from './StrategyInBoard';
import MaskInBoard from './MaskInBoard';
import styled from 'styled-components';
import _ from 'lodash';

const Board = styled.div`
display:flex;
flex-direction:column;
align-items:center;
margin:20px;
height:500px;
width:600px;
border-radius:25px;
border: solid 2px black;`;

const Box = (props) => {
  const StrategyList = props.StrategyList;
  const MaskList = props.MaskList;
  const boardStrategy = props.boardStrategy;
  const setBoardStrategy = props.setBoardStrategy;
  const boardMask = props.boardMask;
  const setBoardMask = props.setBoardMask;
  const blockId = props.blockId;

  const [, drop] = useDrop(() => ({
    accept: ['strategy', 'mask'],
    drop: (item) => {
      addToBoard(item);
    }
  }), [boardStrategy, boardMask]);
  const addToBoard = (item) => {
    if (item.kind === 'strategy') {
      const addResult = StrategyList.filter((strategy) => strategy.strategy_name === item.strategyName);
      const newBoardStrategy = _.cloneDeep(boardStrategy);
      newBoardStrategy[blockId] = newBoardStrategy[blockId].concat(addResult[0]);
      setBoardStrategy(newBoardStrategy);
      return {};
    } else {
      const addResult = MaskList.filter((mask) => mask.mask_name === item.maskName);
      const newBoardMask = _.cloneDeep(boardMask);
      newBoardMask[blockId] = newBoardMask[blockId].concat(addResult[0]);
      setBoardMask(newBoardMask);
      return {};
    }
  };

  return (
    <Board ref={drop}>
      {boardStrategy[blockId].map((strategy, index) => {
        return <StrategyInBoard key={index} strategy={strategy} id={index} blockId={blockId} boardStrategy={boardStrategy} setBoardStrategy={setBoardStrategy}/>;
      })}
      {boardMask[blockId].map((mask, index) => {
        return <MaskInBoard key={index} mask={mask} id={index} blockId={blockId} boardMask={boardMask} setBoardMask={setBoardMask}/>;
      })}
    </Board>
  );
};

export default Box;

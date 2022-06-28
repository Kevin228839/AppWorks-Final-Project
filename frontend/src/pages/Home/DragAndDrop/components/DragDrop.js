import React, { useState } from 'react';
import Number from './Number';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

const Board = styled.div`
margin:20px;
height:500px;
width:200px;
border: solid 1px black;`;

const NumList = [{ id: 1, num: 1 }, { id: 2, num: 10 }];

const DragDrop = () => {
  const [board, setBoard] = useState([]);
  const [, drop] = useDrop(() => ({
    accept: 'number',
    drop: (item) => addNumberToBoard(item.id)
  }));

  const addNumberToBoard = (id) => {
    const numberList = NumList.filter((number) => id === number.id);
    console.log(numberList);
    setBoard((board) => [...board, numberList[0].num]);
  };

  return (
    <>
      <div className='Number'>
        {NumList.map((number, index) => {
          return <Number number={number.num} id={number.id} key={index}/>;
        })}</div>
      <Board className='Board' ref={drop}>
        {board.map((number, index) => {
          return <Number number={number} key={index}/>;
        })}
      </Board>
    </>
  );
};

export default DragDrop;

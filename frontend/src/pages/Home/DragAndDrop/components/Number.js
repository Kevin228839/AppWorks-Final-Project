import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

const NumberDiv = styled.div`
width:100px;
height:100px;
background-color:skyblue;
margin:20px;`;

const Number = ({ number, id }) => {
  const [, drag] = useDrag(() => ({
    type: 'number',
    item: { id }
  }));
  return (
    <NumberDiv ref={drag}>{number}</NumberDiv>
  );
};

export default Number;

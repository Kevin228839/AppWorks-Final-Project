import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

const MaskDiv = styled.div`
border: 2px solid black;
border-radius:15px;
display:flex;
justify-content:center;
align-items:center;
width:400px;
height:60px;
margin:10px;
background-color:grey;
font-size:45px;`;

const Mask = ({ maskName }) => {
  const [, drag] = useDrag(() => ({
    type: 'mask',
    item: { maskName }
  }));
  return (
    <MaskDiv ref={drag}>{maskName}</MaskDiv>
  );
};

export default Mask;

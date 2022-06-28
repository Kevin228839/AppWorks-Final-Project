import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

const MaskDiv = styled.div`
border: 2px solid #FF5151;
border-radius:15px;
display:flex;
justify-content:center;
align-items:center;
width:400px;
height:60px;
margin:10px;
background-color:#FF7575;
font-size:45px;`;

const Mask = ({ mask }) => {
  const maskName = mask.mask_name;
  const kind = mask.kind;
  const [, drag] = useDrag(() => ({
    type: 'mask',
    item: { maskName, kind }
  }));
  return (
    <MaskDiv ref={drag}>{maskName}</MaskDiv>
  );
};

export default Mask;

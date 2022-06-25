import styled from 'styled-components';

const Circle = styled.div`
display:flex;
align-items:center;
justify-content:center;
border-radius:50%;
border: 3px solid black;
height:200px;
width:200px;
margin-left:80px;
margin-right:80px;
margin-top:30px;`;

const Caption = styled.div`
font-size: 20px;
margin:10px;`;

const Number = styled.div`
font-size: 20px;`;

const BacktestInfo = (prop) => {
  const stockNumber = prop.stockNumber;
  const srtategy = prop.strategy;
  return (
    <>
    <Circle>
      <Caption>Stock:</Caption>
      <Number>{stockNumber}</Number>
    </Circle>
    <Circle>
      <Caption>Strategy:</Caption>
      <Number>{srtategy}</Number>
    </Circle>
    </>
  );
};

export default BacktestInfo;

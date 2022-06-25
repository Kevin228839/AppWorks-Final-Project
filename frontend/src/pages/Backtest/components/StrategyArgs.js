import { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../../api';

const SearchCaption = styled.div`
font-size:20px;`;

const SearchInput = styled.input.attrs(
  { type: 'text' }
)`
width:100px;
height:20px;
margin-left:10px;
margin-right:10px;`;

const SearchButton = styled.button`
border: 1px solid #BEBEBE;
border-radius:5px;`;

const FlexRowAlignLeft = styled.div`
display:flex;
justify-content:left;
align-items:center;
margin:20px;`;

const Flex = styled.div`
display:flex;`;

const StrategyArgs = (prop) => {
  const [argName, setArgName] = useState(null);
  const strategy = prop.strategy;
  useEffect(() => {
    fetchArgs(strategy);
  }, []);
  const fetchArgs = async (strategy) => {
    api.getStrategyArgs(strategy)
      .then(async (response) => {
        const responseJson = await response.json();
        setArgName(responseJson.response);
        // console.log(responseJson);
      });
  };
  const handleStrategyArgsChange = () => {
    const arg = {};
    for (let i = 0; i < argName.length; i++) {
      arg[argName[i]] = document.getElementById(argName[i]).value;
    }
    localStorage.setItem('StrategyArgsBacktest', JSON.stringify(arg));
    console.log(arg);
    window.location.href = '/backtest';
  };
  if (argName === null) {
    return;
  }
  return (
    <>
    <FlexRowAlignLeft>
      {argName.map((arg, index) => {
        return (
          <Flex key={index}>
            <SearchCaption >{arg}</SearchCaption>
            <SearchInput id={arg}/>
          </Flex>
        );
      }
      )}
      <SearchButton onClick={() => { handleStrategyArgsChange(); }}>送出</SearchButton>
    </FlexRowAlignLeft>
    </>
  );
};

export default StrategyArgs;

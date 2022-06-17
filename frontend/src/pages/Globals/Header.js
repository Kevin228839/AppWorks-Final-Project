import styled from 'styled-components';
import { Link } from 'react-router-dom';
import member from '../../images/member.png';
// Below are styled components
const Container = styled.div`
height:70px;
display:flex;
justify-content:space-between;
align-items:center;
border-bottom: solid 1px #E0E0E0`;

const Title = styled.div`
font-size:50px;
font-style:oblique;`;

const Img = styled.img`
width:50px;
height:50px;`;

const StyledLink = styled(Link)`
margin-left:30px;
margin-right:30px;
text-decoration:none;
color:black;
`;

const Main = styled.div`
margin-left:auto;
margin-right:auto;
display:flex;
justify-content:center;
align-items:center;`;

const Item = styled.div`
display:flex;
justify-content:center;
align-items:center;
border-radius:5px;
border:black solid;
width:80px;
height:40px;`;

// Header Component
const Header = () => {
  return (
  <>
  <Container>
      <StyledLink to="/">
        <Title>哥9菜</Title>
      </StyledLink>
      <Main>
        <StyledLink to="/discussion">
          <Item>討論串</Item>
        </StyledLink>
        <Item>市場行情</Item>
        <Item>回測</Item>
        <Item>我的收藏</Item>
      </Main>
      <StyledLink to="/member">
        <Img src={member}/>
      </StyledLink>
  </Container>
  </>);
};

export default Header;

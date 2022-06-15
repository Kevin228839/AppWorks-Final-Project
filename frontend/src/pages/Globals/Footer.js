import styled from 'styled-components';
import line from '../../images/line.png';
import twitter from '../../images/twitter.png';
import facebook from '../../images/facebook.png';

// Below are styled components
const Container = styled.div`
background-color:black;
position: fixed;
bottom: 0;
display:flex;
justify-content:space-around;
width:100%;
height:80px;`;

const Wrapper = styled.div`
display:flex;
justify-content:center;`;

const Item = styled.a`
color:white;
text-decoration:none;
margin-top:30px;
margin-left:15px;
margin-right:15px;
align-items:center;`;

const Bar = styled.span`
color:white;
margin-top:33px;
font-size:1em;
justify-content:center;`;

const Img = styled.img`
width:30px;
height:30px;`;

// Footer Component
const Footer = () => {
  return <Container>
    <Wrapper>
        <Item>關於割韭菜</Item>
        <Bar>|</Bar>
        <Item>服務條款</Item>
        <Bar>|</Bar>
        <Item>隱私政策</Item>
        <Bar>|</Bar>
        <Item>聯絡我們</Item>
        <Bar>|</Bar>
        <Item>FAQ</Item>
    </Wrapper>
    <Wrapper>
        <Item>
            <Img src={line} />
        </Item>
        <Item>
            <Img src={twitter} />
        </Item>
        <Item>
            <Img src={facebook} />
        </Item>
    </Wrapper>
  </Container>;
};

export default Footer;

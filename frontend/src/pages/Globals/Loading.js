import styled from 'styled-components';
import loading from '../../images/loading.gif';

// Below are styled components
const Container = styled.div`
width:100%;
display:flex;
justify-content:center;
align-items:center`;

const Img = styled.img`
width:50px;
height:50px;
display: block;
margin-left: auto;
margin-right: auto;`;

// Load Component
const Load = () => {
  return (
    <Container>
       <Img src={loading}/>
    </Container>

  );
};

export default Load;

import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Container = styled.div`
width:500px;
margin-top:50px;
margin-left:auto;
margin-right:auto;
border:black 5px solid;
border-radius: 5px;;`;

const SignupTitle = styled.div`
font-size:50px;`;

const FlexBox = styled.div`
display:flex;
justify-content:center;
margin:20px;`;

const Caption = styled.label`
font-size:30px;
width:100px;
height:40px;
margin-right:20px`;

const AccountInput = styled.input.attrs({
  type: 'email'
})`
width:300px;
height:40px;
`;

const PasswordInput = styled.input.attrs({
  type: 'password'
})`
width:300px;
height:40px;
`;

const Submit = styled.button`
width:80px;
height:30px;`;

// Sign in and set jwt token to localstorage
const Signin = () => {
  // const navigate = useNavigate();

  function handleChange () {
    const email = document.getElementById('account').value;
    const password = document.getElementById('password').value;
    if (email === '' || password === '') {
      alert('Complete your input!');
      return;
    }
    api.signin(email, password).then(async (response) => {
      const res = await response.json();
      if (res.message === -1) {
        alert('login fail');
        window.location.href = '/signin';
        return;
      }
      window.localStorage.setItem('jwtToken', res.message);
      window.location.href = '/';
    });
  };

  return (
    <>
    <Container>
      <FlexBox>
      <SignupTitle>Signin</SignupTitle>
      </FlexBox>
      <FlexBox>
        <Caption>Email</Caption>
        <AccountInput id="account"/>
      </FlexBox>
      <FlexBox>
        <Caption>Password</Caption>
        <PasswordInput id="password"/>
      </FlexBox>
      <FlexBox>
        <Submit onClick={() => { handleChange(); }}>Submit</Submit>
      </FlexBox>
    </Container>
    </>
  );
};

export default Signin;

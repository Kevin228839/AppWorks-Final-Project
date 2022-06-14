import styled from 'styled-components';
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
margin:10px;`;

const Caption = styled.label`
font-size:30px;
width:100px;
height:40px;
margin-right:20px`;

const NameInput = styled.input.attrs({
  type: 'text'
})`
width:300px;
height:40px;
`;

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

const Signup = () => {
  function handleChange () {
    const email = document.getElementById('account').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    // check each input has value
    if (email === '' || password === '' || name === '') {
      alert('Complete your input!');
      return;
    }
    // check email regex
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      alert('Wrong email format!');
      window.location.href = '/signup';
      return;
    }
    api.signup(name, email, password).then(async (response) => {
      const res = await response.json();
      if (res.message === 1) {
        alert('Sign up successfully');
        window.location.href = '/signin';
      } else if (res.message === -1) {
        alert('The email has been used');
        window.location.href = '/signup';
      } else {
        alert('db crash');
        window.location.href = '/signup';
      }
    });
  };

  return (
    <>
    <Container>
      <FlexBox>
      <SignupTitle>Signup</SignupTitle>
      </FlexBox>
      <FlexBox>
        <Caption>Name</Caption>
        <NameInput id="name"/>
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
        <Submit onClick={(e) => { handleChange(); }}>Submit</Submit>
      </FlexBox>
    </Container>
    </>
  );
};

export default Signup;

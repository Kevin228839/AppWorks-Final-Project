import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Load from '../Globals/Loading';
import { useState, useEffect } from 'react';
import api from '../../api';

const Container = styled.div`
margin-left:auto;
margin-right:auto;
margin-top:100px;
width:500px;
height:300px;
display:flex;
border:black 2px solid;
border-radius: 5px;
justify-content:center`;

const StyledLink = styled(Link)`
width:100px;
height:80px;
background-color:white;
border:black 5px solid;
border-radius: 5px;
color:black;
text-decoration:none;
display:flex;
justify-content:center;
align-items:center;
font-size:30px;
margin:30px;`;

const ProfileContainer = styled.div`
display:flex;
flex-direction:column;
margin-left:auto;
margin-right:auto;
margin-top:100px;
width:500px;
height:300px;
border:black 2px solid;
border-radius: 5px;`;

const ProfileRow = styled.div`
margin-top:20px;
height:100px;
font-size:30px;
margin-left:auto;
margin-right:auto;`;

const Logout = styled.button`
height:100px;
width:150px;
font-size:30px;
margin-left:auto;
margin-right:auto;`;

const Member = () => {
  const Jwt = localStorage.getItem('jwtToken');
  const [data, setData] = useState(null);
  if (!Jwt) {
    return (
      <>
      <Container>
        <StyledLink to="/signup">註冊</StyledLink>
        <StyledLink to="/signin">登入</StyledLink>
      </Container>
      </>
    );
  }
  useEffect(() => {
    api.getProfile(Jwt).then(async (response) => {
      const res = await response.json();
      setData(res);
    }).catch(error => { console.log(error); });
  }, []);
  function handleChange () {
    localStorage.removeItem('jwtToken');
    window.location.href = '/member';
  }
  // return loading if data is null
  if (data === null) {
    return <Load />;
  }
  return (
    <>
      <ProfileContainer>
        <ProfileRow>{data.message[0]}</ProfileRow>
        <ProfileRow>{data.message[1]}</ProfileRow>
        <Logout onClick={() => { handleChange(); }}>登出</Logout>
      </ProfileContainer>
    </>
  );
};

export default Member;

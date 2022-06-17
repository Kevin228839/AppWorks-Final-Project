import styled from 'styled-components';
import api from '../../api';
import Load from '../Globals/Loading';
import { useState, useEffect } from 'react';

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
width:100%;
padding-top:30px;`;

const PostCard = styled.div`
margin:20px;
border-radius:5px;
width:700px;
height:250px;
background-color:#BEBEBE;
position:relative;`;

const PostCardCaption = styled.div`
position:absolute;
top:10px;
left:50px;
font-size:20px;`;

const StyledTextarea = styled.textarea`
position:absolute;
top:40px;
left:50px;
border-radius:5px;
font-size:20px;
width:600px;
height:150px;`;

const StyledButton = styled.button`
position:absolute;
bottom:10px;
right:50px;
height:30px;
width:60px;`;

const Card = styled.div`
margin:20px;
border-radius:5px;
border:#BEBEBE solid;
width:700px;
height:250px;
position:relative;`;

const CardAuthor = styled.div`
font-size:30px;
margin:10px;`;

const CardContent = styled.div`
font-size:25px;
margin:10px;
white-space:normal;
word-wrap: break-word`;

const Discussion = () => {
  const [data, setData] = useState([]);
  // const [page, setPage] = useState(0);
  let page = 0;
  let nextPage;

  const fetchData = async () => {
    console.log('current page:', page);
    const response = await api.getDiscussionContent(page);
    const responseJson = await response.json();
    const cardData = responseJson.response.data;
    nextPage = responseJson.response.nextPage;
    setData(oldcardData => [...oldcardData, ...cardData]);
    // setPage(page + 1);
    page += 1;
    console.log('nextPage:', nextPage);
  };

  const handleScroll = (e) => {
    if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight && nextPage !== null) {
      console.log('bottom');
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleChange = () => {
    const Jwt = localStorage.getItem('jwtToken');
    if (!Jwt) {
      alert('Please login');
      window.location.href = '/member';
    }
    const context = document.getElementById('text').value;
    if (context === '' || context === ' ' || context === '  ') {
      alert('寫點東西吧～!');
      return;
    }
    api.postDiscussionContent(Jwt, context)
      .then((response) => {
        if (response.status === 200) {
          alert('發布成功!');
          window.location.href = '/discussion';
        }
      });
  };
  if (data === null) {
    return <Load />;
  }
  return (
    <>
    <Container>
      <PostCard>
        <PostCardCaption>在想些什麼呢~</PostCardCaption>
        <StyledTextarea id="text"></StyledTextarea>
        <StyledButton onClick={() => { handleChange(); }}>發布</StyledButton>
      </PostCard>
      {data.map((item, index) => {
        return (
          <Card key={index}>
            <CardAuthor>
              {item.name}
            </CardAuthor>
            <hr/>
            <CardContent>
              {item.context}
            </CardContent>
          </Card>
        );
      })}
    </Container>
    </>
  );
};
export default Discussion;

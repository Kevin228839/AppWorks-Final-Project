import { Routes, Route } from 'react-router-dom';
import Header from '../pages/Globals/Header';
import Signup from '../pages/Signup/Signup';
import Signin from '../pages/Signin/Signin';
import Member from './Globals/Member';
import Home from '../pages/Home/Home';
import Discussion from '../pages/Discussion/Discussion';

const App = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/member" element={<Member />} />
      <Route path="/discussion" element={<Discussion />} />
    </Routes>
    </>
  );
};

export default App;

import { Routes, Route } from 'react-router-dom';
import Header from '../pages/Globals/Header';
import Footer from '../pages/Globals/Footer';
import Signup from '../pages/Signup/Signup';
import Signin from '../pages/Signin/Signin';
import Home from '../pages/Home/Home';

const App = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
    <Footer />
    </>
  );
};

export default App;

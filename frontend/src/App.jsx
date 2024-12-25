import { Routes , Route } from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Home from './pages/Home';
import UserProtectWrapper from './components/UserProtectWrapper';
import CaptainProtectWrapper from './components/captainProtectWrapper';
import CaptainHome from './pages/CaptainHome';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/user-login" element={<UserLogin/>} />
        <Route path="/user-signup" element={<UserSignup/>} />
        <Route path="/captain-login" element={<CaptainLogin/>} />
        <Route path="/captain-signup" element={<CaptainSignup/>} />
        {/* <Route path="/home" element={<Home/>} /> */}
        <Route path='/home' element={<UserProtectWrapper><Home /></UserProtectWrapper>} />
        <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
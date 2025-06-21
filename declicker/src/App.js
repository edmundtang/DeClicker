import './App.css';
import { Route, Routes} from 'react-router-dom';
import HomePage from './pages/Homepage';
import NavMenu from './components/NavMenu';
import UserSession from './pages/UserSession';
import Footer from './components/Footer';
import HostSession from './pages/HostSession';

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <NavMenu />
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/:sessionCode/session" element={<UserSession />} />
        <Route path="/:sessionCode/host" element={<HostSession />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;

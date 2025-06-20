import './App.css';
import { Route, Routes} from 'react-router-dom';
import HomePage from './pages/Homepage';
import NavMenu from './components/NavMenu';
import UserSession from './pages/UserSession';

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <NavMenu />
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/:sessionCode/session" element={<UserSession />} />
    </Routes>
    </div>
  );
}

export default App;

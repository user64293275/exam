import './App.css';
import Main from './Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Paris from './Paris';
import Munchen from './Munchen';
import London from './London';
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Main />} />
          <Route path='/London' element={<London />} />
          <Route path='/Paris' element={<Paris />} />
          <Route path='/Munchen' element={<Munchen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

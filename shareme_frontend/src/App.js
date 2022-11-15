import React, { useEffect } from 'react';

// Router
import { Routes, Route, useNavigate } from 'react-router-dom';
import { fetchUser, checkTheme } from './utils/fetchUser';

// Components
import Login from './components/Login';
import Home from './container/Home';

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
      checkTheme();
      const user = fetchUser();
      if (!user) {
        navigate('/login');
      }
    }, []);
    
    return (<Routes>
        <Route path='login' element={<Login /> } />
        <Route path='/*' element={<Home /> } />
    </Routes>);
};
export default App;

import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cpanel from '../screens/Cpanel';
import Home from '../screens/Home';
import Viewerpdf from '../screens/Viewerpdf';



const Main = () => {
  return (
    <Router>
    <div>
        
          <Routes>
            
            <Route path="/" element={<Home/>} />
            <Route path="/cpanel" element={<Cpanel />} />
            <Route path="/viewerpdf/:id/:course" element={<Viewerpdf/>} />
            
          </Routes>
        
      
    </div>
    </Router>
  
  )
  

};

export default Main;

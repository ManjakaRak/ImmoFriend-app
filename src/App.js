import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from './components/About';
import { Home } from './components/Home';
import { PropertyDetail } from './components/PropertyDetail';
import './App.css';

const App = () => {
  const [title, setTitle] = useState('');
  useEffect(() => {
    document.title = title;
  }, [title])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home handleSetTitle={setTitle} />}/>
        <Route path="/about" element={<About handleSetTitle={setTitle} />}/>
        <Route path="/property">
          <Route path=":id" element={<PropertyDetail />}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

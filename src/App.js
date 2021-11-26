import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from './components/About';
import { Home } from './components/Home';
import { PropertyDetail } from './components/PropertyDetail';
import './App.css';
import { AddPropertyForClient } from './components/AddPropertyForClient';
import { AddClient } from './components/AddClient';

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
          <Route path="add-client" element={<AddClient  handleSetTitle={setTitle} />}/>
          <Route path="add-property" element={<AddPropertyForClient  handleSetTitle={setTitle} />}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

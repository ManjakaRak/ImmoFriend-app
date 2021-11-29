import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from './components/About';
import { Home } from './components/Home';
import { PropertyDetail } from './components/PropertyDetail';
import './App.css';
import { AddPropertyForClient } from './components/AddPropertyForClient';
import { AddClient } from './components/AddClient';
import { FetchSecretId } from './components/FetchSecretId';
import {PageNotFound} from "./components/errors/PageNotFound";

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
        <Route exact path="add-client" element={<AddClient  handleSetTitle={setTitle} />}/>
        <Route exact path="add-property/:token" element={<AddPropertyForClient  handleSetTitle={setTitle} />}/>
        <Route exact path="add-check-id/:token" element={<FetchSecretId  handleSetTitle={setTitle} />}/>
        <Route path="/property">
          <Route exact path=":id" element={<PropertyDetail handleTitle={setTitle} />}/>
        </Route>
        <Route path="*" element={ <PageNotFound /> }/>
      </Routes>
    </Router>
  );
};

export default App;

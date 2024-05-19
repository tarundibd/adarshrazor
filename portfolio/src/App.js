import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Experience from './components/pages/Experience';
import Home from './components/pages/Home';
import Projects from './components/pages/Projects';
import NonTech from './components/pages/NonTech';
import Footer from './components/Footer';
import BucketList from './components/pages/bucketlist';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Header /> {/* Include the Navbar component */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Add a Home route (optional) */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/nontech" element={<NonTech />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/bucketlist" element={<BucketList />} />
        </Routes>
      <Footer/>
      </BrowserRouter>
      </>
  );
}

export default App;
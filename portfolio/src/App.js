import React from 'react';
import './App.css';
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Experience from './components/pages/Experience';
import Home from './components/pages/Home';
import Projects from './components/pages/Projects';
import NonTech from './components/pages/NonTech';
import Footer from './components/Footer';
import BucketList from './components/pages/bucketlist';
import Misc from './components/pages/misc';
import Error404 from './components/pages/error404';
import Blog from './components/pages/Blog/Main';
import About from './components/pages/Blog/About';

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}



function Content() {
  const location = useLocation();
  
  //const HeaderFooter404 = location.pathname !== '/misc';
  const HeaderFooter404 = location.pathname !== '/404';
  const HeaderFooterBlog = location.pathname !== '/blog';
  const HeaderFooterAbout = location.pathname !== '/about';

  if (!location) {
    return <div>Error: Location is null</div>;
  }


  return (
    <>
      {HeaderFooter404 && HeaderFooterAbout && HeaderFooterBlog && <Header />} {/* Conditionally render the Navbar */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Add a Home route (optional) */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/nontech" element={<NonTech />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/bucketlist" element={<BucketList />} />
        <Route path="/misc" element={<Misc />} />
        {/*<Route path="*" element={<Error404 />} />  Add a 404 route (optional) */}
        <Route path="/404" element={<Error404 />} />
        <Route path="/about" element={<About/>} /> 
      </Routes>
      {HeaderFooter404 && HeaderFooterAbout &&  HeaderFooterBlog && <Footer />} {/* Conditionally render the Footer */}
    </>
  );
}

export default App;

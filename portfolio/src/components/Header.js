import {useState} from 'react';

import { Outlet, Link, NavLink } from 'react-router-dom';
import './styles/Header.css'

const Header = () => {
  
    const [menuOpen, setmenuOpen] = useState(false)
        return (
          <>
            <nav sticky="top">
              <Link to="/" className="navbar-brand">Adarsh Anand</Link>
              <div className='menu' onClick={()=>{
                setmenuOpen(!menuOpen)
              }}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <ul className={menuOpen? 'open':''}>
                <li>
                  <NavLink to="/experience">Experience</NavLink>
                </li>
                <li>
                  <NavLink to="/projects">Projects</NavLink>
                </li>
                <li>
                  <NavLink to="/nontech">Not so Tech</NavLink>
                </li>
                <li>
                  <NavLink to="/bucketlist">Bucket List</NavLink>
                </li>
                <li>
                  <a href="https://drive.google.com/file/d/1HTeWRbZU8sduoOczPrKNB_iv5SXrlPpY/view?usp=sharing" target="_blank" rel="noreferrer">Resume</a>
                </li>
              </ul>
          </nav>
          <Outlet/>
          </>
        );
}

export default Header;
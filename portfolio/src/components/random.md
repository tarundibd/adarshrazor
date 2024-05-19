import React from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import Experience from './pages/Experience';
import Home from './pages/Home';
import Projects from './pages/Projects';
import NonTech from './pages/NonTech';
import BucketList from './pages/bucketlist';

class Body extends React.Component {
    render() {
        return (
            <Routes>
                <Route path='/' component={Home} />
                <Route path='/experience' component={Experience} />
                <Route path='/projects' component={Projects} />
                <Route path='/nontech' component={NonTech} />
                <Route path='/bucketlist' component={BucketList} />
                {/* <Redirect from='#' to='/404' /> */}
            </Routes>
        )
    }
}

export default Body;
import {Component} from 'react';
import '../styles/Home.css'
import Avatar from '../static/avatar.jpg'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactTyped } from "react-typed";


class Home extends Component {
    render() {
        return (
            <Container className='home-container'>
            <Row className='align-items-center home-row'>
                <Col md={6} className='image-section'>
                <Image src={Avatar} alt="Adarsh Anand Image" className="Hero-Image" roundedCircle fluid />
                </Col>
                <Col md={6} className='text-section'>
                <p className='name-tag'>Hi, Adarsh here !</p>
                <p>
                I am <ReactTyped className="sub-name-tag" strings={["coder 📜","developer 🖥️","content-creator 🎥"]} typeSpeed={80} backSpeed={40} loop/>
                </p>
                </Col>
            </Row>
            <Row className='align-items-center home-row-bio'>
                <p className='text-section-bio'>
                    <span className='home-row-bio-capitalized'>I</span> am a <a href="https://en.wikipedia.org/wiki/Hacker" target="_black">hacker</a> 👋🏻. Deeply curious about technology and social-engineering, I graduated from <a href="https://www.reva.edu.in/" target="_blank">Reva University</a> as an Engineer with a Bachelor's in computer science.
                    <br /><br />
                    I started developing websites at an early age for various startups, became a webmaster for various universities, IEEE, and IISc Bangalore events, and also wrote a research paper on <a href="http://www.testmagzine.biz/index.php/testmagzine/article/view/8343/6317" target='_blank'>Virtual Assitants based on User Preferences</a>
                    <br /><br />
                    I started my <i>career</i> as a frontend developer, but the latter of my curiosities learned about cloud technologies. Currently, I am seeking job oppurtunities as a full stack developer.
                    <br /><br />
                    When I am not in front of screen, I probably go to put my life on track and be the best version. I like cafes, music, wanderlust and creative. I will be sharing what I experience <Link to="/nontech">here</Link>
                    <br /><br />
                    Stay in touch! ✨<br /><br />
                </p>
            </Row>
            </Container>
        );
    }
}

export default Home;
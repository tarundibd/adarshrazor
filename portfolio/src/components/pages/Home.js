import {Component} from 'react';
import '../styles/Home.css'
import Avatar from '../static/avatar.jpg'
import { Container, Row, Col, Image } from 'react-bootstrap';
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
            </Container>
        );
    }
}

export default Home;
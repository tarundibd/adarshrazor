import '../styles/Home.css'
import Avatar from '../static/avatar.jpg'
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {ReactTyped} from 'react-typed';
import { useCallback } from 'react';
import Particles from 'react-particles';
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`
import projectData from '../static/homepage.json'

const Home = () => {

    const projects = projectData['homepage-project'];

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <>
            <Container className='home-container'>
                <Row className='align-items-center home-row'>
                    <Particles
                        id="tsparticles"
                        init={particlesInit}
                        loaded={particlesLoaded}
                        options={{
                            background: {
                                opacity: 0,
                            },
                            fpsLimit: 520,
                            interactivity: {
                                events: {
                                    onClick: {
                                        enable: true,
                                        mode: "push",
                                    },
                                    onHover: {
                                        enable: true,
                                        mode: "repulse",
                                    },
                                    resize: true,
                                },
                                modes: {
                                    push: {
                                        quantity: 4,
                                    },
                                    repulse: {
                                        distance: 150,
                                        duration: 0.4,
                                    },
                                },
                            },
                            particles: {
                                color: {
                                    value: ["#0000FF","#008000","#FF0000"],
                                },
                                links: {
                                    color: "#000000",
                                    distance: 150,
                                    enable: true,
                                    opacity: 0.3,
                                    width: 1,
                                },
                                move: {
                                    direction: "none",
                                    enable: true,
                                    outModes: {
                                        default: "bounce",
                                    },
                                    random: false,
                                    speed: 1,
                                    straight: false,
                                },
                                number: {
                                    density: {
                                        enable: true,
                                        area: 800,
                                    },
                                    value: 80,
                                },
                                opacity: {
                                    value: 0.5,
                                },
                                shape: {
                                    type: "circle",
                                },
                                size: {
                                    value: { min: 1, max: 3 },
                                },
                            },
                            detectRetina: true,
                        }}
                    />
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
                        <span className='home-row-bio-capitalized'>I</span> am a <a href="https://en.wikipedia.org/wiki/Hacker" target="_black" rel="noopener noreferrer">hacker</a> 👋🏻. Deeply curious about technology and social-engineering, I graduated from <a href="https://www.reva.edu.in/" target="_blank" rel="noopener noreferrer">Reva University</a> as an Engineer with a Bachelor's in computer science.
                        <br /><br />
                        I started developing websites at an early age for various startups, became a webmaster for various universities, IEEE, and IISc Bangalore events, and also wrote a research paper on <a href="http://www.testmagzine.biz/index.php/testmagzine/article/view/8343/6317" target='_blank' rel="noopener noreferrer">Virtual Assistants based on User Preferences</a>
                        <br /><br />
                        I started my <i>career</i> as a frontend developer, but the latter of my curiosities learned about cloud technologies. Currently, I am seeking job opportunities as a full-stack developer.
                        <br /><br />
                        When I am not in front of the screen, I probably go to put my life on track and be the best version. I like cafes, music, wanderlust and creative. I will be sharing what I experienced <Link to="/nontech">here</Link>
                        <br /><br />
                        Stay in touch! ✨<br /><br />
                    </p>
                </Row>
            </Container>
            <Container className='align-items-center showcase'>
            <h1 className='text-center my-5'>Showcase</h1>
            <Row className='justify-content-center'>
                {projects.map((project, index) => (
                    <Col key={index} md={3} className='d-flex justify-content-center mb-4 mx-5'>
                        <Card className='text-center grayscale' style={{ width: '25rem', border: 'none'}}>
                            <Card.Img variant="top" src={project.img} />
                            <Card.Body>
                                <Card.Title style={{fontWeight: 600}}>{project.title}</Card.Title>
                                <Card.Text className='text-muted'>{project.desc}</Card.Text>
                                <Button href={project.link} target="_blank">Checkout 🚀</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            </Container>
        </>
    );
}

export default Home;

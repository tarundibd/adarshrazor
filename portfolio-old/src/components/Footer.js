import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './styles/Footer.css'; // Make sure to create this CSS file

const Footer = () => {
    useEffect(() => {
        console.log('🚀 Bhashini Translation Plugin: Initialization started...');
        
        // Check if script already exists to prevent duplicate loading
        const existingScript = document.querySelector('script[src*="bhashini.co.in"]');
        if (existingScript) {
            console.log('⚠️ Bhashini Translation Plugin: Script already loaded, skipping...');
            return;
        }

        try {
            const script = document.createElement("script");
            script.src = "https://translation-plugin.bhashini.co.in/v3/website_translation_utility.js";
            script.async = true;
            
            // Add success handler
            script.onload = () => {
                console.log('✅ Bhashini Translation Plugin: Successfully loaded and ready!');
                console.log('🌐 Translation features now available for the website');
                
                // Optional: Check if Bhashini object is available
                if (window.Bhashini) {
                    console.log('🔧 Bhashini API object detected:', window.Bhashini);
                } else {
                    console.log('⏳ Bhashini API object not immediately available, may load asynchronously');
                }
            };
            
            // Add error handler
            script.onerror = (error) => {
                console.error('❌ Bhashini Translation Plugin: Failed to load!', error);
                console.log('🔍 Please check internet connection and Bhashini service status');
            };
            
            // Append script to document body
            document.body.appendChild(script);
            console.log('📦 Bhashini Translation Plugin: Script injection completed');
            
        } catch (error) {
            console.error('💥 Bhashini Translation Plugin: Critical error during setup:', error);
        }

        // Cleanup function to remove script when component unmounts
        return () => {
            const scriptToRemove = document.querySelector('script[src*="bhashini.co.in"]');
            if (scriptToRemove) {
                document.body.removeChild(scriptToRemove);
                console.log('🧹 Bhashini Translation Plugin: Cleaned up on component unmount');
            }
        };
    }, []); // Empty dependency array ensures this runs only once when component mounts

    return (
        <Container fluid className="footer-container mb-3">
            <Row className="justify-content-center">
                <p>Find me on:</p>
            </Row>
            <Row className="justify-content-center social-row mt-2">
                <Col md={3} xs={6} className="social-column">
                    <FaEnvelope className="social-icon" />
                    <a href="mailto:adarshanshu7@gmail.com" target="_blank" rel="noreferrer">
                        {" "}Adarsh Anand
                    </a>
                </Col>
                <Col md={3} xs={6} className="social-column">
                    <FaGithub className="social-icon" />
                    <a href="https://github.com/AdarshRazor" target="_blank" rel="noreferrer">
                        {" "}AdarshRazor
                    </a>
                </Col>
                <Col md={3} xs={6} className="social-column">
                    <FaYoutube className="social-icon" />
                    <a href="https://www.youtube.com/@RazorCloak" target="_blank" rel="noreferrer">
                        {" "}RazorCloak
                    </a>
                </Col>
                <Col md={3} xs={6} className="social-column">
                    <FaLinkedin className="social-icon" />
                    <a href="https://www.linkedin.com/in/adarsh007/" target="_blank" rel="noreferrer">
                        {" "}adarsh007
                    </a>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;

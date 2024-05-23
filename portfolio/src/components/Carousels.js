import Carousel from 'react-bootstrap/Carousel';
import cara1 from './static/cara1.jpg'
import cara2 from './static/cara2.jpg'
import cara3 from './static/cara3.jpg'
import cara4 from './static/cara4.jpg'
import cara5 from './static/cara5.jpg'
import Image from 'react-bootstrap/Image';
import './styles/Carousels.css'
import {Container} from 'react-bootstrap';

function Carousels() {
  return (
    <Container fluid className='cara-container'>
    <Carousel fade>
      <Carousel.Item>
        <Image src={cara1} style={{ width: '100%', borderRadius: '10px', maxHeight: '450px'}} fluid text="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={cara2} style={{ width: '100%', borderRadius: '10px', maxHeight: '450px' }} fluid text="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={cara3} style={{ width: '100%', borderRadius: '10px', maxHeight: '450px' }} fluid text="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={cara4} style={{ width: '100%', borderRadius: '10px', maxHeight: '450px' }} fluid text="fourth slide" />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={cara5} style={{ width: '100%', borderRadius: '10px', maxHeight: '450px' }} fluid text="fifth slide" />
      </Carousel.Item>
    </Carousel>
    </Container>
  );
}

export default Carousels;
import { Component} from 'react'
import Avatar from '../static/404.png'
import { Image } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Misc extends Component {
    render() {
        return (
            <div className='text-center'>
                <Image src={Avatar} alt="404 Image" className='m-2' roundedCircle fluid style={{ width: '100%', maxWidth: '300px', height: '350px', borderRadius: '10px', alignContent: 'center' }}  /> 
                <h2 className='m-1'>You have a lot of curiosity. You don't have persmission yet to access this page.</h2>
                <h3>Play around some more !</h3>
                <div className='mx-5 my-4'>
                    <p style={{color:'red'}}>Loading ...</p>
                    <ProgressBar striped variant="danger" now={80} />
                </div>
            </div>
        )
    }
}

export default Misc;
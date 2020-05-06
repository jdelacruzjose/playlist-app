import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render(){
        return(
            <nav className= 'navbar navbar-dark bg-dark navbar-expand-lg'>
                <Link to= '/' className= 'navbar-brand'>Feed/Home</Link>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='navbar-item'>
                            <Link to= '/' className='nav-link'>Favorite Playlist</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to= '/add' className='nav-link'>Create Playlist</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/user' className='nav-link'>Login/Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
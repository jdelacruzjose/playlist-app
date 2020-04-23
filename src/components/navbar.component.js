import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render(){
        return(
            <nav className = 'navbar navbar-dark bg-dark navbar-expand-lg'>
                <Link to= '/' className= 'navbar-brand'>Playlist App</Link>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='navbar-item'>
                            <Link to= '/' className='nav-link'>My Playlist</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to= '/add' className='nav-link'>Add Playlist</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/user' className='nav-link'>Edit User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
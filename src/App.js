import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';
import PlaylistList from './components/playlist-list.component';
import EditPlaylist from './components/edit-playlist.component';
import AddPlaylist from './components/add-playlist.component';
import CreateUser from './components/create-user.component';
import Footer from './components/footer.component';


function App() {
  return (
    <Router>
      <div className= 'container'>
        <Navbar />
        <br />
        <Route path= '/' exact component ={PlaylistList} />
        <Route path= '/edit/:id' component ={EditPlaylist} />
        <Route path= '/add' component ={AddPlaylist} />
        <Route path= '/user' component ={CreateUser} />
        <br />
        <Footer />
      </div>
    </Router> 
  );
}

export default App;
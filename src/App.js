import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';
// import PlaylistList from './components/playlist-list.component';
// import EditPlaylist from './components/edit-playlist.component';
// import CreatePlaylist from './components/create-playlist.component';
// import CreateUser from './components/create-user.component';


function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      {/* <Route path= '/' exact component ={PlaylistList} />
      <Route path= '/edit/:id' component ={EditPlaylist} />
      <Route path= '/create' component ={CreatePlaylist} />
      <Route path= '/user' component ={CreateUser} /> */}
    </Router> 
  );
}

export default App;
import React, { Component } from 'react';
import axios from 'axios';

export default class AddPlaylist extends Component {
    constructor(props) {
        super(props);

        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onChangePlaylistName = this.onChangePlaylistName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            url: '',
            playlistName: '',
            description: '',
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/')
        .then(response => {
             if (response.data.length > 0){
                this.setState({
                    user: response.data.map(user => user.username),
                    username: response.data[0].username
                })    
             }
        })
    }

    onChangeUrl(e){
        this.setState({
            url: e.target.value
        });
    } 
    onChangePlaylistName(e){
        this.setState({
            playlistName: e.target.value
        });
    } 

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    } 

    onSubmit(e){
        e.preventDefault();

        const playlist = {
            url: this.state.url,
            playlistName: this.state.playlistName,
            description: this.state.description
        }

        console.log(playlist);

        axios.post('http://localhost:5000/playlist/add', playlist)
            .then(res => console.log(res.data));

        window.location = '/';
    }

render() {
        return (
        <div>
            <h3>Test Playlist</h3>
            <form onSubmit ={this.onSubmit}>
                <div className= 'form-group'>
                    <label>Playlist Name: </label>
                    <input 
                    className= 'form-control'
                    value= {this.state.playlistName}
                    onChange= {this.onChangePlaylistName} />
                </div>
                <div className= 'form-group'>
                    <label>Description: </label>
                    <input type= 'text'
                    required
                    className= 'form-control'
                    value= {this.state.description}
                    onChange= {this.onChangeDescription} />
                </div>
                <div className= 'form-group'>
                    <label>Playlist URL: </label>
                    <input type= 'text'
                    required
                    className= 'form-control'
                    value= {this.state.url}
                    onChange= {this.onChangeUrl} />
                </div>

                <div>
                    <input type= 'submit' 
                    value='Submit' 
                    className= 'btn btn-primary' />
                </div>   
            </form>   
        </div>
        )       
     }
 }
import React, { Component } from 'react';

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
        this.setState({
            users: ['test user'],
            username: 'test user'    
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

        const exercise = {
            url: this.state.url,
            playlistName: this.state.playlistName,
            description: this.state.description
        }

        console.log(exercise);
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
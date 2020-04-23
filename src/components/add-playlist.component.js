import React, { Component } from 'react';

export default class AddPlaylist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            playlistName: '',
            description: '',
            users: []
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    } 

    render(){
        return(
            <div>
                <p>Add Playlist Component</p>
            </div>
        )
    }
}
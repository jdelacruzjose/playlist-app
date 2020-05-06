import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }


    onSubmit(e){
        e.preventDefault();
        
        const user = {
            username: this.state.username,
            email: this.state.email,
            password:  this.state.password
        }

        console.log(user);
        
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: '',
            email: '',
            password: ''
        })
    }

    render(){
        return(
            <div>   
                <h3>Create New User</h3>
                <form onSubmit= {this.onSubmit}>
                <div>
                    <label>Username: </label>
                    <input type='text'
                        className='form-control'
                        value= {this.state.username}
                        onChange= {this.onChangeUsername}
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input type='text'
                        className='form-control'
                        value= {this.state.email}
                        onChange= {this.onChangeEmail}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input type='text'
                        className='form-control'
                        value= {this.state.password}
                        onChange= {this.onChangePassword}
                    />
                </div>
                <div>
                    <input type= 'submit' value= 'Create User' className= 'btn btn-primary'/>
                </div>
                </form>
            </div>
        )
    }
}
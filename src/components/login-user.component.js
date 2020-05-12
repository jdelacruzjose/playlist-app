import React, { Component } from 'react';
import AuthService from "./auth-service.component";

export default class LoginUser extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            username: '',
            password: ''
        };
        this.service = new AuthService();
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        this.service
            .login(user)
            .then(response => {
                this.setState({
                    username:'',
                    password:''
                });
                this.props.getUser(response);
                window.location = '/add'
            })
            .catch(error => console.log(error));
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({ [name]: value });
    };

    render(){
        return(
            <div>
            <div>  
              <div>
                <form onSubmit={this.onSubmit}>
                  <p>Username:</p>
                  <input
                    type= "text"
                    name= "username"
                    placeholder= "Enter Username"
                    value= {this.state.username}
                    onChange= {e => this.handleChange(e)}
                  />
                  <p>Password:</p>
                  <input 
                    type= "password"
                    name= "password"
                    placeholder= "Enter Password"
                    value= {this.state.password}
                    onChange= {e => this.handleChange(e)}
                  />
                  <br />
                  <button 
                  type="submit">Log In</button>
    
                </form>
              </div>
            </div>
                <p>
                  Don't have account?
                </p>
          </div>
        )
    }
}
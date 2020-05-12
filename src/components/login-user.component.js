import React, { Component } from 'react';

export default class LoginUser extends Component {
    render(){
        return(
            <div>
            <div>  
              <div>
                <form >
                  <p>Username:</p>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                  />
                  <p>Password:</p>
                  <input 
                    type="password"
                    name="password"
                    placeholder="Enter Password"
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
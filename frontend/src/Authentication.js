import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Component } from 'react';
import axios from 'axios';
import './Authentication.css'

class Authentication extends Component {

    state = {
        username:"",
        password:""
    };

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    async Usernamebtn(){
        let response =await axios.post('obtain-token/',{username:this.state.username, password:this.state.password})
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return (
            <div >
                <h2>Login</h2>
                <div className="Login">
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="username" >Username</label>
                            <input type="text" name="username" value={this.state.username} onChange={(event)=>this.setState({username:event.target.value})}/>
                            <label htmlFor="password" >Password</label>
                            <input type="password" name="password" value={this.state.password} onChange={(event)=>this.setState({password:event.target.value})}/>
                            <button disabled={!this.validateForm()} onClick={()=>this.Usernamebtn()}>Login</button>
                            <button>Register</button>
                    </form>
                </div>
            </div >
            )
    }
}
export default Authentication;

import React from 'react';
import { Component } from 'react';
import authService from './services/authService'
import './Authentication.css'

class Authentication extends Component {

    state = {
        username: "",
        email: "",
        password1: "",
        password2: "",
        register: false
    };

    validateLoginForm() {
        return this.state.username.length > 0 && this.state.password1.length > 0;
    }
    validateRegisterForm() {
        return this.state.username.length > 0 && this.state.email.length > 0 && this.state.password1.length > 0 && this.state.password2.length > 0;
    }
    handleSubmit(event) {
        event.preventDefault();
    }

    renderView() {
        if(!this.state.register)
        {
            return (
                <div >
                    <h2>Login</h2>
                    <div className="Login">
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="username" >Username</label>
                            <input type="text" name="username" value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
                            <label htmlFor="password" >Password</label>
                            <input type="password" name="password" value={this.state.password1} onChange={(event) => this.setState({ password1: event.target.value })} />
                            <button disabled={!this.validateLoginForm()} onClick={() => authService.loginToken(this.state)}>Login</button>
                            <button onClick={(event) => this.setState({ register: true })}>Register</button>
                        </form>
                    </div>
                </div >
            )
        }else
        {
            return (
                <div >
                    <h2>Register!</h2>
                    <div className="Login">
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="username" >Username</label>
                            <input type="text" name="username" value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
                            <label htmlFor="email" >Email</label>
                            <input type="text" name="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                            <label htmlFor="password" >Password</label>
                            <input type="password" name="password1" value={this.state.password1} onChange={(event) => this.setState({ password1: event.target.value })} />
                            <label htmlFor="Repeat password" >Repeat Password</label>
                            <input type="password" name="password2" value={this.state.password2} onChange={(event) => this.setState({ password2: event.target.value })} />
                            <button disabled={!this.validateRegisterForm()} onClick={() => authService.registerToken(this.state)}>Register</button>
                            <button onClick={(event) => this.setState({ register: false })}>Return</button>
                        </form>
                    </div>
                </div >
            )
        }
        
    }

    render() {
        return (
            <div>
                {this.renderView()}
            </div>
        )
    }
}
export default Authentication;

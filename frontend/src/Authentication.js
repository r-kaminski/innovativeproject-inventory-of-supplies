import React from 'react';
import { Component } from 'react';
import authService from './services/authService'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import Fade from '@material-ui/core/Fade';
import './Authentication.css'

class Authentication extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            email: "",
            password1: "",
            password2: "",
            register: false,
            fade: false,
            size: this.sizes.login
        };
    }

    fadeTimeout = {
        enter: 500,
        exit: 300
    }

    sizes = {
        login: 350,
        register: 450
    }

    validateLoginForm() {
        return this.state.username.length > 0 && this.state.password1.length > 0;
    }
    validateRegisterForm() {
        return this.state.username.length > 0 && this.state.email.length > 0 && this.state.password1.length > 0 && this.state.password2.length > 0;
    }

    changeScreen() {
        this.setState({
            username: "",
            email: "",
            password1: "",
            password2: "",
            fade: true
        });
        let newSize = this.state.register ? this.sizes.login : this.sizes.register;
        this.setState({ size: newSize });

        setTimeout(() => {
            this.setState({ fade: false, register: !this.state.register });
        }, this.fadeTimeout.exit);
    }

    renderForm() {
        if (!this.state.register) {
            return (
                <form>
                    <FormControl className="fields" fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input className="Input" placeholder="Username" type="text" name="username" value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
                    </FormControl>
                    <FormControl className="fields" fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input placeholder="Password" type="password" name="password" value={this.state.password1} onChange={(event) => this.setState({ password1: event.target.value })} />
                    </FormControl>

                    <Button type="submit" variant="contained" className="buttons" fullWidth color="primary" disabled={!this.validateLoginForm()} onClick={() => authService.loginToken(this.state)}>Log in</Button>

                    <Grid className="bottomFields" container item direction="row" justify="center" alignItems="center" alignContent="center" spacing={16}>
                        <Grid item className="bottomButtons" onClick={(event) => this.changeScreen()}>I'm new here</Grid>
                        <Grid item className="separator">|</Grid>
                        <Grid item className="bottomButtons">Forgot password</Grid>
                    </Grid>
                </form>
            )
        } else {
            return (
                <form>
                    <FormControl className="fields" fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input className="Input" placeholder="Username" type="text" name="username" value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
                    </FormControl>
                    <FormControl className="fields" fullWidth>
                        <InputLabel htmlFor="email">e-mail</InputLabel>
                        <Input placeholder="e-mail" type="email" name="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                    </FormControl>
                    <FormControl className="fields" fullWidth>
                        <InputLabel htmlFor="password1">Password</InputLabel>
                        <Input placeholder="Password" type="password" name="password2" value={this.state.password1} onChange={(event) => this.setState({ password1: event.target.value })} />
                    </FormControl>
                    <FormControl className="fields" fullWidth>
                        <InputLabel htmlFor="password2">Repeat password</InputLabel>
                        <Input placeholder="Repeat password" type="password" name="password1" value={this.state.password2} onChange={(event) => this.setState({ password2: event.target.value })} />
                    </FormControl>

                    <Button type="submit" variant="contained" className="buttons" fullWidth color="primary" disabled={!this.validateRegisterForm()} onClick={() => authService.registerToken(this.state)}>Register</Button>
                    <Grid className="bottomFields" container item direction="row" justify="center" alignItems="center" alignContent="center" spacing={16}>
                        <Grid item className="bottomButtons" onClick={(event) => this.changeScreen()}>Go back to login</Grid>
                    </Grid>
                </form>
            )
        }
    }

    render() {
        return (
            <div className="wrapper">
                {/* < Paper className="Login" style={{ height: this.state.size }} > */}
                < Paper className="Login" style={{ transition: `height ${this.fadeTimeout.exit}ms`, height: this.state.size }} >
                    <Grid container direction="column" justify="center" spacing={8}>
                        <Grid item xs={12}>
                            <div className="title">
                                STOCK
                                    <div className="subtitle">
                                    Inventory simplified
                                    </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Fade in={!this.state.fade} timeout={this.fadeTimeout}>
                        {this.renderForm()}
                    </Fade>
                </Paper>

            </div>
        )
    }
}
export default Authentication;

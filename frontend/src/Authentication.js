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
import { withSnackbar } from 'notistack';
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
            size: this.sizes.login,
            snackbar: { open: false },
            mode: 'login',
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

    pushNotification(message, type) {
        this.setState({ snackbar: { open: true, message: message, type: type } });
    }

    changeScreen(nextMode) {
        this.setState({
            username: "",
            email: "",
            password1: "",
            password2: "",
            fade: true,
        });
        let newSize;
        if (nextMode === 'register') {
            newSize = this.sizes.register;
        } else if (nextMode === 'login') {
            newSize = this.sizes.login;
        }
        this.setState({ size: newSize });

        setTimeout(() => {
            this.setState({ fade: false });
        }, this.fadeTimeout.exit);
        this.setState({ mode: nextMode });
    }

    async handleRegistration(event) {
        event.preventDefault();
        try {
            let response = await authService.registerToken({
                username: this.state.username,
                email: this.state.email,
                password1: this.state.password1,
                password2: this.state.password2
            });
            if (response.status === 201) {
                this.props.enqueueSnackbar('registered successfully', { variant: 'info' });
                this.changeScreen();
            }
        } catch (error) {
            for (let message of Object.values(error.response.data)) {
                this.props.enqueueSnackbar(message, { variant: 'error' });
            }
        }
    }

    async handleLogin(event) {
        event.preventDefault();
        try {
            await authService.loginToken({
                username: this.state.username,
                password: this.state.password1
            });
        } catch (error) {
            for (let message of Object.values(error.response.data)) {
                this.props.enqueueSnackbar(message, { variant: 'error' });
            }
        }
    }

    currentMode() {
        return this.state.mode;
    }

    renderForm() {
        if (this.currentMode() === 'login') {
            return (
                <form onSubmit={this.handleLogin.bind(this)}>
                    <FormControl className="fields" fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input className="Input" autoComplete="section-login username" placeholder="Username" type="text" name="username" value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
                    </FormControl>
                    <FormControl className="fields" fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input placeholder="Password" autoComplete="section-login current-password" type="password" name="password" value={this.state.password1} onChange={(event) => this.setState({ password1: event.target.value })} />
                    </FormControl>

                    <Button type="submit" variant="contained" className="buttons" fullWidth color="primary" disabled={!this.validateLoginForm()}>Log in</Button>

                    <Grid className="bottomFields" container item direction="row" justify="center" alignItems="center" alignContent="center" spacing={16}>
                        <Grid item className="bottomButtons" onClick={(event) => this.changeScreen('register')}>I'm new here</Grid>
                        <Grid item className="separator">|</Grid>
                        <Grid item className="bottomButtons">Forgot password</Grid>
                    </Grid>
                </form>
            )
        } else {
            return (
                <form autoComplete="off" onSubmit={this.handleRegistration.bind(this)}>
                    <FormControl className="fields" fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input className="Input" placeholder="Username" type="text" value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} />
                    </FormControl>
                    <FormControl className="fields" fullWidth>
                        <InputLabel htmlFor="email">e-mail</InputLabel>
                        <Input autoComplete="url" placeholder="e-mail" name="email" type="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                    </FormControl>
                    <FormControl className="fields" fullWidth>
                        <InputLabel>Password</InputLabel>
                        <Input autoComplete="new-password" placeholder="Password" type="password" value={this.state.password1} onChange={(event) => this.setState({ password1: event.target.value })} />
                    </FormControl>
                    <FormControl className="fields" fullWidth>
                        <InputLabel htmlFor="password2">Repeat password</InputLabel>
                        <Input autoComplete="new-password" placeholder="Repeat password" type="password" value={this.state.password2} onChange={(event) => this.setState({ password2: event.target.value })} />
                    </FormControl>

                    <Button type="submit" variant="contained" className="buttons" fullWidth color="primary" disabled={!this.validateRegisterForm()}>Register</Button>
                    <Grid className="bottomFields" container item direction="row" justify="center" alignItems="center" alignContent="center" spacing={16}>
                        <Grid item className="bottomButtons" onClick={(event) => this.changeScreen('login')}>Go back to login</Grid>
                    </Grid>
                </form>
            )
        }
    }

    render() {
        this.currentMode()
        return (
            <div className="wrapper">
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
export default withSnackbar(Authentication);

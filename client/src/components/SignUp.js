import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstname: '',
    lastname: '',
    redirectTo: null,
    error: null,
    emailValid: false,
    passwordValid: false,
    usernameValid: false,
    validMessage: []
};

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    handleSubmit = async event => {
        event.preventDefault();

        //Checks if all the input fields are valid
        //If not the validation messages are shown and no user is sent to sign up
        if (this.checkValidInput()) {
            const { username, email, password, firstname, lastname } = this.state;

            const dbResponse = await axios.post(`/api/newuser`, { username, email, firstname, lastname });

            if (dbResponse.status === 200) {
                return this.props.firebase
                    .doCreateUserWithEmailAndPassword(email, password)
                    .then(authUser => {
                        //The User has been successfully authenticated, clear this component state and redirect them to the home page
                        this.setState({ ...initialState });
                        this.props.history.push(Routes.home);
                    })
                    .catch(error => {
                        console.log(error)
                        this.setState({ error });
                    });
            };
        };
    };

    handleChange = event => {
        //Breaking this out due to the input validation
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [event.target.name]: event.target.value },
            () => this.validateForm(name, value));

    };

    checkValidInput = () => {
        let invalidInputs = 0;
        let invalidMessages = [];
        if (!this.state.emailValid) {
            invalidInputs++;
            invalidMessages.push(`Email entered is invalid`);
        };
        if (!this.state.usernameValid) {
            invalidInputs++;
            invalidMessages.push(`Please ensure username is at least 3 characters, no more than 16 and only contains letters, numbers, underscores and dashes`);
        };
        if (!this.state.passwordValid) {
            invalidInputs++;
            invalidMessages.push(`Password must be at least 6 characters in length and contain no spaces`)
        };
        if (invalidInputs > 0) {
            this.setState({ validMessage: invalidMessages });
            return false;
        } else {
            return true;
        };
    };

    validateForm = (fieldName, value) => {
        let validCheck;

        switch (fieldName) {
            case `email`:
                let checkEmail = value.match(/^(([^<>()\]\\.,;:\s@']+(\.[^<>()\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                validCheck = checkEmail ? true : false;
                this.setState({ emailValid: validCheck });
                break;
            case `password`:
                let checkPassword = value.length >= 6;
                let noSpacesInPassword = value.match(/^\S*$/);
                validCheck = checkPassword && noSpacesInPassword ? true : false;
                this.setState({ passwordValid: validCheck });
                break;
            case `username`:
                let checkUsername = value.match(/^([a-z0-9-_])+$/i);
                let usernameLength = value.length >= 3 && value.length <= 16;
                validCheck = checkUsername && usernameLength ? true : false;
                this.setState({ usernameValid: validCheck });
                break;
            default:
                break;
        };
    };

    render() {
        const { username, email, passwordOne, passwordTwo, firstname, lastname, error, validMessage } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            firstname === '' ||
            lastname === '' ||
            username.length < 3 ||
            passwordOne < 6;

        return (
            <div className='SignupForm'>
                <br />
                {/* If there's an error with signup then display the error */}
                {error && <p>{error.message}</p>}

                {/* This is for checking if any of the inputs were invalid */}
                {validMessage && validMessage.map((message, i) => <p key={i}>{message}</p>)}

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label style={labelStyle}>
                            Email
                        </Label>
                        <Input
                            style={inputStyle}
                            type='text'
                            id='email'
                            name='email'
                            placeholder='ex. janedoe@email.com'
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label style={labelStyle}>
                            Password
                                <br />
                        </Label>
                        <div style={labelDescription}>
                            <strong>
                                (Must be at least 6 characters with no spaces)
                            </strong>
                        </div>
                        <Input
                            style={inputStyle}
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label style={labelStyle}>
                            Confirm Password
                        </Label>
                        <Input
                            style={inputStyle}
                            placeholder='Confirm Password'
                            type='password'
                            name='confirmPassword'
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label style={labelStyle}>
                            Username
                            <br />
                        </Label>
                        <div style={labelDescription}>
                            <strong>
                                (Must be between 3 & 16 characters, no special characters & no spaces)
                            </strong>
                        </div>
                        <Input
                            style={inputStyle}
                            placeholder='ex. JaneDoe14'
                            type='username'
                            name='username'
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label style={labelStyle}>
                            First Name:
                        </Label>
                        <Input
                            style={inputStyle}
                            placeholder='ex. Jane'
                            type='firstname'
                            name='firstname'
                            value={this.state.firstname}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label style={labelStyle}>
                            Last Name:
                        </Label>
                        <Input
                            style={inputStyle}
                            placeholder='ex. Doe'
                            type='lastname'
                            name='lastname'
                            value={this.state.lastname}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Button
                            color='primary'
                            size='lg'
                            disabled={isInvalid}
                            type='submit'>
                            Sign Up
                        </Button>
                    </FormGroup>
                </Form>
            </div >
        )
    };
};

export default SignUp;
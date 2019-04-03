import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const initialState = {
    email: '',
    password: '',
    error: null
};

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = { ...initialState };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(async () => {
                this.setState({ ...initialState });
                this.props.history.push(Routes.home);
            })
            .catch(error => {
                this.setState({ error });
            });
    }
    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div >
                <br />
                {/* If there's an error with sign in then display the error */}
                {error && <p>{error.message}</p>}

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label style={labelStyle} >
                            Email:
                        </Label>
                        <Input
                            style={inputStyle}
                            type='text'
                            name='email'
                            placeholder='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={labelStyle}>
                            Password:
                        </Label>
                        <Input
                            style={inputStyle}
                            placeholder='password'
                            type='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color='primary'
                            size='lg'
                            disabled={isInvalid}
                            type='submit'>
                            Sign In
                        </Button>
                    </FormGroup>
                </Form>
            </div >
        );
    };
};

export default SignIn;
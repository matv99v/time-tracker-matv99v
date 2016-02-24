import React  from 'react';
import Input  from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Col    from 'react-bootstrap/lib/Col';
import ButtonGroup    from 'react-bootstrap/lib/ButtonGroup';

import {validateRegistrationData} from '../validators.js';

export default class Registration extends React.Component {
    handleSubmitButton = () => {
        const inputData = {};

        for (const field in this.refs) {
            const value = this.refs[field].getValue();

            if (field === 'birthday' &&  value) {
                const date = this.refs.birthday.refs.input.valueAsDate;
                inputData.day = date.getDate();
                inputData.month = date.getMonth();
                inputData.year = date.getFullYear();
            } else if (field === 'gender') {
                inputData.gender = this.refs.gender.getChecked() ? 'm' : 'f';
            } else inputData[field] = this.refs[field].getValue();

        }

        const errors = validateRegistrationData(inputData);
        const newState = {errMsg: {}, bsStyle: {}};

        for (const field in this.state.errMsg) {
            newState.errMsg[field] = errors[field] || '';
            newState.bsStyle[field] = newState.errMsg[field] ? 'error' : 'success';
        }

        this.setState( newState );

    };

    state = {
        errMsg:
        {
            name       : null,
            email      : null,
            username   : null,
            password   : null,
            repassword : null,
            birthday   : null,
            phone      : null
        },
        bsStyle:
        {
            name       : null,
            email      : null,
            username   : null,
            password   : null,
            repassword : null,
            birthday   : null,
            phone      : null
        }
    };

    render() {
        return (
            <form >
                <Input type     = 'text'
                        help    = {this.state.errMsg.name}
                        bsStyle = {this.state.bsStyle.name}
                        label   = 'Name'
                        ref     = 'name'
                        hasFeedback
                        required />

                <Input type     = 'email'
                        help    = {this.state.errMsg.email}
                        bsStyle = {this.state.bsStyle.email}
                        label   = 'Email'
                        ref     = 'email'
                        hasFeedback
                        required />

                <Input type     = 'text'
                        help    = {this.state.errMsg.username}
                        bsStyle = {this.state.bsStyle.username}
                        label   = 'Username'
                        ref     = 'username'
                        hasFeedback
                        required />

                <Input type     = 'password'
                        help    = {this.state.errMsg.password}
                        bsStyle = {this.state.bsStyle.password}
                        label   = 'Password'
                        ref     = 'password'
                        hasFeedback
                        required />

                <Input type     = 'password'
                        help    = {this.state.errMsg.repassword}
                        bsStyle = {this.state.bsStyle.repassword}
                        label   = 'Repassword'
                        ref     = 'repassword'
                        hasFeedback
                        required />

                <Input type     = 'date'
                        help    = {this.state.errMsg.birthday}
                        bsStyle = {this.state.bsStyle.birthday}
                        label   = 'Birthday'
                        ref     = 'birthday'
                        hasFeedback />

                <Input type     = 'tel'
                        help    = {this.state.errMsg.phone}
                        bsStyle = {this.state.bsStyle.phone}
                        label   = 'Phone'
                        ref     = 'phone'
                        hasFeedback />

                <Input type   = 'radio'
                        ref   = 'gender'
                        label = 'Male'
                        name  = 'sex'
                        defaultChecked />

                <Input type   = 'radio'
                        label = 'Female'
                        name  = 'sex' />

                <Col className = 'text-center'>
                    <Button bsStyle = 'success'
                            onClick = {this.handleSubmitButton} >
                        Submit
                    </Button>
                </Col>

            </form>
        );
    }
}

import React from 'react';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';

import validateRegistrationData from '../validators.js';

export default class Reg extends React.Component {
    submit = () => {
        const formData = Object.create(null);

        for (const field in this.refs) {
            formData[field] = this.refs[field].refs.input.value;
        }

        console.dir(formData.birthday);

        const errors = validateRegistrationData(formData);

        for (const field in errors) {
            this.refs[field].refs.input.value = '';
            this.refs[field].refs.input.placeholder = errors[field];
        }
    };

    render() {
        return (
            <form>
                <Input type="text" label="name" ref="name" />
                <Input type="email" label="email" ref="email" />
                <Input type="text" label="username" ref="username" />
                <Input type="password" label="password" ref="password" />
                <Input type="password" label="repassword" ref="repassword" />
                <Input type="date" label="birthday" ref="birthday" />
                <Input type="tel" label="phone" ref="phone" />
                <Button onClick={this.submit}>Submit</Button>
            </form>
        );
    }
}

import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import './CreateTask.less';


export default class CreateTask extends React.Component {

    handleNewTaskClick = () => {
        const newTaskName = this.refs.newTaskNameInput.refs.input.value;
        this.props.onSubmit(newTaskName);

    };

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col md={10} sm={10}>
                        <Input type="text" placeholder="New task" ref='newTaskNameInput'/>
                    </Col>
                    <Col md={2} sm={2} className="text-center">
                        <Button onClick={ this.handleNewTaskClick }
                                className='CreateTask__createButton'>Create</Button>
                    </Col>
                </Row>
            </Grid>

        );
    }
}

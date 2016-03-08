import React         from 'react';
import ListGroup     from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Grid          from 'react-bootstrap/lib/Grid';
import Row           from 'react-bootstrap/lib/Row';
import Col           from 'react-bootstrap/lib/Col';
import Button        from 'react-bootstrap/lib/Button';
import ButtonToolbar        from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup        from 'react-bootstrap/lib/ButtonGroup';

import './TasksList.less';

export default class TasksList extends React.Component {

    handleStartStopClikc = (task) => {
        if (task.isActive) {
            this.props.onStopTask(task.id);
        } else {
            this.props.onStartTask(task.id);
        }
    };

    formList = () => {
        return this.props.tasks.map( (task, ind) => {
            return (
                <ListGroupItem key={ind} className='TasksList__list-group-item' >
                    <Grid fluid>
                        <Row >

                            <Col xs={4} >{task.name}</Col>
                            <Col xs={4} >{ this.props.parseTimeString(task.spentTime) }</Col>

                            <Col xs={4} >
                                <ButtonToolbar>
                                    <ButtonGroup bsSize = 'xsmall'>
                                        <Button onClick   = {this.handleStartStopClikc.bind(this, task)}
                                                bsStyle   = {task.isActive ? 'info' : 'default' }>
                                            {task.isActive ? 'Stop' : 'Start' }
                                        </Button>

                                        <Button onClick   = {this.props.onClearTimer.bind(this, task.id)}>
                                            Clear
                                        </Button>

                                        <Button onClick   = {this.props.onDeleteTask.bind(this, task.id)}>
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </Col>

                        </Row>
                    </Grid>
                </ListGroupItem>
            );
        });
    };

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col  xs={12} xsOffset={0}
                          sm={10} smOffset={1}
                          md={10} mdOffset={1}>

                        <ListGroup>

                            {
                                this.props.tasks.length
                                    ?   <ListGroupItem >
                                            <Grid fluid>
                                                <Row>
                                                    <Col xs={4}>Task name</Col>
                                                    <Col xs={4}>Spent time</Col>
                                                    <Col xs={4}>Controls</Col>
                                                </Row>
                                            </Grid>
                                        </ListGroupItem>
                                    : null
                            }

                            {this.formList()}

                        </ListGroup>
                    </Col>
                    <Col  xs={0} sm={1} md={1}></Col>
                </Row>
            </Grid>
        );
    }
}

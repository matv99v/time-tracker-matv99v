import React         from 'react';
import ListGroup     from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button        from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup   from 'react-bootstrap/lib/ButtonGroup';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';


import moment        from 'moment';
import 'moment-duration-format';

import './TasksList.less';

export default class TasksList extends React.Component {

    handleStartStopClikc = (task) => {
        if (this.isTaskActive(task.id)) {
            this.props.onStopTask(task.id);
        } else {
            this.props.onStartTask(task.id);
        }
    };

    isTaskActive = (id) => {
        return this.props.activeTaskId === id;
    };

    formList = () => {
        return this.props.tasks.map( (task, ind) => {
            return (
                <ListGroupItem key={ind} className='TasksList__list-group-item' >
                    <Grid fluid>
                        <Row >

                            <Col xs={5}>{task.name}</Col>

                            <Col xs={3} >
                                {
                                    moment.duration(task.spentTime).format({
                                        template: 'HH:mm:ss',
                                        trim: false
                                    })
                                }
                            </Col>

                            <Col xs={3} >
                                <ButtonToolbar>
                                    <ButtonGroup bsSize = 'xsmall'>
                                        <Button onClick   = {this.handleStartStopClikc.bind(this, task)}
                                                bsStyle   = {this.isTaskActive(task.id) ? 'info' : 'default' }>
                                            {this.isTaskActive(task.id) ? 'Stop' : 'Start' }
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

            <ListGroup>
                {
                    this.props.tasks.length
                        ?   <ListGroupItem >
                                <Grid fluid>
                                    <Row>
                                        <Col xs={5}>Task name</Col>
                                        <Col xs={3}>Spent time</Col>
                                        <Col xs={3}>Controls</Col>
                                    </Row>
                                </Grid>
                            </ListGroupItem>
                        : null
                }

                {this.formList()}
            </ListGroup>
        );
    }
}

import React         from 'react';
import ListGroup     from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Grid          from 'react-bootstrap/lib/Grid';
import Row           from 'react-bootstrap/lib/Row';
import Col           from 'react-bootstrap/lib/Col';
import Button        from 'react-bootstrap/lib/Button';

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
                <ListGroupItem key={ind} >
                    <Grid>
                        <Row bStyle    = 'danger' >

                            <Col xs={5}>{task.name}</Col>
                            <Col xs={3}>{ this.props.parseTimeString(task.spentTime) }</Col>

                            <Col xs={4} className='text-right' >
                                <Button bsSize    = 'xsmall'
                                        className = 'TasksList__button'
                                        onClick   = {this.handleStartStopClikc.bind(this, task)}>
                                    {task.isActive ? 'Stop' : 'Start' }
                                </Button>

                                <Button bsSize    = 'xsmall'
                                        className = 'TasksList__button'
                                        onClick = {this.props.onClearTimer.bind(this, task.id)}>
                                    Clear
                                </Button>

                                <Button bsSize    = 'xsmall'
                                        className = 'TasksList__button'
                                        onClick = {this.props.onDeleteTask.bind(this, task.id)}>
                                    Delete
                                </Button>
                            </Col>

                        </Row>
                    </Grid>
                </ListGroupItem>
            );
        });
    };

    render() {
        return (
            <ListGroup >

                {
                    this.props.tasks.length
                        ?   <ListGroupItem >
                                <Grid>
                                    <Row>
                                        <Col xs={5}>Task name</Col>
                                        <Col xs={3}>Spent time</Col>
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

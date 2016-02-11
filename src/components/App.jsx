import React from 'react';

import Header from './Header.jsx';
import CurrentTask from './CurrentTask.jsx';
import TableTasks from './TableTasks.jsx';
import NewTask from './NewTask.jsx';

const activeTasks = [
    {
        name: 'Drink tea',
        spentTime: '5m',
        isActive: false
    },
    {
        name: 'Development',
        spentTime: '3h',
        isActive: true
    },
    {
        name: 'Read books',
        spentTime: '2h',
        isActive: false
    },
    {
        name: 'Learn React',
        spentTime: '3h',
        isActive: false
    },
    {
        name: 'Drinking coffee',
        spentTime: '15m',
        isActive: false
    }
];


export default props => (
    <div>
        <Header/>
        <NewTask/>
        <CurrentTask/>
        <TableTasks activeTasks={activeTasks}/>
    </div>
);

import React from 'react';

import Header from './Header.jsx';
import CurrentTask from './CurrentTask.jsx';
import StoredTasks from './StoredTasks.jsx';
import NewTask from './NewTask.jsx';



export default props => (
    <div>
        <Header/>
        <NewTask/>
        <CurrentTask/>
        <StoredTasks/>
    </div>
);

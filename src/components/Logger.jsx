import React       from 'react';

import Grid       from 'react-bootstrap/lib/Grid';
import Row        from 'react-bootstrap/lib/Row';
import Col        from 'react-bootstrap/lib/Col';

import utils              from '../utils.js';
import './Logger.less';


export default class Dev extends React.Component {
    render() {
        return (
            <div className='Logger__container'>
                <div className='Logger__header'>---===Logger===---</div>
                {
                    utils.getMessages().map((msg, i) => <div key={i}>{msg}</div>)
                }
            </div>
        );
    }
}

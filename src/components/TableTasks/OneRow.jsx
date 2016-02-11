import React from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Table from 'react-bootstrap/lib/Table';
import ButtonInput from 'react-bootstrap/lib/ButtonInput';

export default React.createClass({
    render() {

        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.spentTime}</td>
                <td>
                    {
                        this.props.isActive
                        ? <Glyphicon glyph='play'/>
                        : <Glyphicon glyph='pause' />
                    }
                </td>
                <td><ButtonInput value='Clear' className='btn-xs' bsStyle='warning' /></td>
                <td><ButtonInput value='Delete' className='btn-xs' bsStyle='danger' /></td>
           </tr>
       );
    }
});

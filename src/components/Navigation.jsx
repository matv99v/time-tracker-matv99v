import React      from 'react';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import { Link }   from 'react-router';




export default class AreYouHereModal extends React.Component {

    render() {
        const pages = ['Timer', 'Settings', 'Dev'];

        return (
            <div>
                {
                    pages.map( (page, ind) => {
                        return (
                            <Link
                                to={`/${page}`}
                                key={ind}
                            >
                                {page}/
                            </Link>
                        );
                    })
                }
            </div>
        );
    }
}

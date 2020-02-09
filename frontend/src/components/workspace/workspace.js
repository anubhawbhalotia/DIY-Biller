import React from 'react';
import './workspace.css';

import Nav from '../navbar/nav';

class workspace extends React.Component{
    render(){
        return(
            <div className="workspace">
                <Nav />
            </div>
        )
    }
}

export default workspace;
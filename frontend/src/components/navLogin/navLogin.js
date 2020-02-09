import React from 'react';
import './navLogin.css';

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <ul id="nav">
                    <li><img src="/download.png"></img></li>
                    <li style={{marginLeft: 15, marginTop: 12}}><a id="nav-heading" href="/"><h3>DIY Biller</h3></a></li>
                    <li className="toRight" onClick={this.props.login}>{this.props.children}</li>
                </ul>
            </div>
        );
    }
}

export default Navbar
import React from 'react';
import './nav.css';

class nav extends React.Component{
    render(){
        return(
            <div className="navbar-adjust">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Sales</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Bill-design</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Purchases</a>
                     </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active area Sales" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"></div>
                    <div className="tab-pane fade area Bill-design" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"></div>
                    <div class="tab-pane fade area Purchases" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"></div>
                    </div>
            </div>
        )
    }
}

export default nav;
import React, { Component } from 'react';
import Axios from 'axios';

class Biller extends Component {
    state={
        child: (<div></div>)
    }
    componentDidMount() {
        Axios.get('http://192.168.43.52:4000/user/billing_software')
            .then(response => {
                console.log(response.data)
                // let body = document.createElement('body')
                // body.innerHTML = response.data
                this.setState({
                    child: response.data
                })
            })
    }
    render() {
        return (
            <div dangerouslySetInnerHTML={{
                __html: this.state.child
            }}>
                
            </div>
        )
    }
}

export default Biller;
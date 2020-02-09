import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Modal from '../navLogin/Modal';
import Navbar from '../navLogin/navLogin';
import '../../App.css';
import '../navLogin/Modal.css';
import './Home.css';

class Home extends Component {
    state = { show: false, userSignedUp: true, loginChild: (<p>Login</p>),
            email: "",
            password: "",
            name: "",
            shopname: ""};

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    handleUser = () => {
        console.log('Check')
        this.setState({
            userSignedUp: false
        })
    };

    emailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    nameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    shopnameChange = (e) => {
        this.setState({
            shopname: e.target.value
        })
    }

    handleSignOut = () => {
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('shopname')
        localStorage.removeItem('key')
        axios.defaults.headers.common.key = '';
        axios.defaults.headers.common.email = '';
        window.location = "/";
    }

    signUp = (e) => {
        e.preventDefault()
        this.setState({userSignedUp: false});
        let user = { email: this.state.email, password: this.state.password, name: this.state.name, shop_name: this.state.shopname }
        // user = JSON.stringify(user)
        axios.post('http://192.168.43.52:4000/user/signup', {...user})
            .then(response => {
            console.log(response)
            axios.defaults.headers.common.key = response.data;
            axios.defaults.headers.common.email = this.state.email;
                localStorage.setItem('name', this.state.name)
                localStorage.setItem('shopname', this.state.shopname)
                localStorage.setItem('email', this.state.email)
                localStorage.setItem('key', axios.defaults.headers.common.key)
            this.setState({
                show: false,
                loginChild: (<div>{this.state.name}'s {this.state.shopname}<button className="sign-out" style={{marginLeft: 20}} onClick={this.handleSignOut}>Sign Out</button></div>)
            })
        })
    }

    login = (e) => {
        e.preventDefault()
        axios.post('http://192.168.43.52:4000/user/login', { email: this.state.email, password: this.state.password })
            .then(res => {
                this.setState({
                    show: false,
                    loginChild: (<p>{this.state.email}</p>)
                })
                axios.defaults.headers.common.key = res.data;
                axios.defaults.headers.common.email = this.state.email;
                axios.get('http://192.168.43.52:4000/user/profile').then((response, err) => {
                    console.log(response)
                    if(err) {
                        alert(err)
                    }
                    localStorage.setItem('name', response.data.name)
                    localStorage.setItem('shopname', response.data.shopname)
                    localStorage.setItem('email', this.state.email)
                    localStorage.setItem('key', axios.defaults.headers.common.key)
                    this.setState({
                        name: response.data.name,
                        shopname: response.data.shopname,
                        loginChild: (<div>{response.data.name}'s {response.data.shopname}<button className="sign-out" style={{ marginLeft: 20 }} onClick={this.handleSignOut}>Sign Out</button></div>)
                    })
                })
            })
    }

    componentDidMount () {
        let email = localStorage.getItem('email')
        console.log('Component did mount', email)
        axios.defaults.headers.common.key = localStorage.getItem('key');
        axios.defaults.headers.common.email = email;
        if(email) {
            let name = localStorage.getItem('name')
            let shopname = localStorage.getItem('shopname')
            this.setState({
                loginChild: (<div>{name}'s {shopname}<button className="sign-out" style={{ marginLeft: 20 }} onClick={this.handleSignOut}>Sign Out</button></div>)
            })
        }
    }

    render() {
        console.log(this.state.loginChild)
        return (
            <div className="flex-container">
                <Navbar login={this.showModal} >{this.state.loginChild}</Navbar> 
                <Modal show={this.state.show} signUp={this.state.userSignedUp} handleClose={this.hideModal}>
                    {this.state.userSignedUp ? (
                        <div className="modal-content">
                            <form><center>
                                <label>Email</label><br/>
                                <input className="user-input" onChange={this.emailChange} name="email" type="text" /><br/>
                                <label>Password</label><br/>
                                <input className="user-input" onChange={this.passwordChange} name="password" type="password" />
                                <p onClick={this.handleUser}><u>Not a User? Sign Up!</u></p>
                                <button className="modal-buttons" onClick={this.login}>Login</button></center>
                            </form>
                        </div>
                        ) : (
                        <div className="modal-content">
                        <center>
                            <form>
                                <label>Name</label><br/>
                                <input className="user-input" onChange={this.nameChange} name="name" type="text" /><br />
                                <label>Shop Name</label><br />
                                <input className="user-input" onChange={this.shopnameChange} name="shopname" type="text" /><br />
                                <label>Email</label><br />
                                <input className="user-input" onChange={this.emailChange} name="email" type="text" /><br />
                                <label>Password</label><br />
                                <input className="user-input" onChange={this.passwordChange} name="password" type="password" /><br />
                                <button className="modal-buttons" onClick={this.signUp}>Sign Up</button>
                            </form>
                        </center>
                    </div>
                    )}
                </Modal>
                {/* <div className="homePage"> */}
                    {/* <div className="wrap"> */}
                        <center>
                        <div className="heading">
                            <h1>Free from confusion</h1>
                            <h2>Free from the mess</h2>
                            <h2>Take charge, and build your own</h2>
                            <h1>Billing Software</h1>  
                        </div>  
                        <Link to="/bill"><button className="btn-0">Start Billing</button></Link>
                        <Link to="/build"><button className="btn-0">Build your own Software</button></Link>
                        </center>
                    {/* </div> */}
                {/* </div> */}
            </div>
        )
    }
}

export default Home;
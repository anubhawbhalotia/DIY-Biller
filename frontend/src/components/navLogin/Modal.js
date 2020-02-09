import React from 'react';

import './Modal.css';

const Modal = ({show, handleClose, children, signUp, handleUser}) => {
    // state={
    //     show: this.props.show,
    //     signUp: this.props.signUp,
    //     showHideClassName: this.props.show ? "modal display-block":"modal display-none"
    // }
    // componentDidMount () {
    //     this.setState({
    //         show: this.props.show,
    //         signUp: this.props.signUp
    //     })
    //     if(this.state.show) {
    //         this.setState({
    //             showHideClassName: 
    //         })
    //     }
    // }
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <button style={{alignContent: 'right'}} onClick={handleClose}>close</button>
            <section className="modal-main">
                {children}
            </section>
        </div>
    );
}

export default Modal;
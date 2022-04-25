import React, { useState } from "react";
import ReactDOM from "react-dom";
import './modal.module.css'

class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.el = document.createElement('div')

        this.state = {
            isBrowser: false
        }
    }

    componentDidMount() {
        this.setState({isBrowser: true});
        const modalRoot = document.getElementById('modal-root');
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        const modalRoot = document.getElementById('modal-root');
        modalRoot.removeChild(this.el);
    }

    render() {
        if (this.state.isBrowser) {
            return ReactDOM.createPortal(this.props.children, this.el)
        }
        return null
    }
}

export default Modal;
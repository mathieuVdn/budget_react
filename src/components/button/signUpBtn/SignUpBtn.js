import React from 'react';
import mc from './signUpBtn.module.scss';
import {NavLink} from "react-router-dom";

const SignUpBtn = (props) => {
    const {namebtn, number} = props

    return (<NavLink to={'/sign-up'} className={mc.signUpBtn} type="button">{namebtn} {number}</NavLink>);
};

export default SignUpBtn;
import React from 'react';
import mc from './signUpBtn.module.scss';

const SignUpBtn = (props) => {
    return (
        <button className={mc.signUpBtn} type="button" onClick={ () => console.log('salut')}>{props.name}</button>
    );
};

export default SignUpBtn;
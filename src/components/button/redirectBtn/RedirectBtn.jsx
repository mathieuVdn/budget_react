import React from 'react';
import mc from './redirectBtn.module.scss';


const RedirectBtn = (props) => {
    const {namebtn} = props

    return (<button className={mc.redirectBtn} type="submit">{namebtn}</button>);
};

export default RedirectBtn;
import React from 'react';
import mc from './cards.module.scss'
import RedirectBtn from "../button/redirectBtn/RedirectBtn";
import {NavLink} from "react-router-dom";

const Cards = (props) => {
    const {name} = props
    return (
        <div className={`${mc.cards} flex flex-column ai-center flex-wrap`}>
            <h3>{name}</h3>
            <div>
                <p> Objectifs réalisés : </p>
                <p> Montant prévu :</p>
                <p> Montant actuel :</p>
                <NavLink to={"/envelope"}>
                    <button className={`${mc.redirectBtn}`}>Voir Plus</button>
                </NavLink>
            </div>
        </div>
    );
};

export default Cards;
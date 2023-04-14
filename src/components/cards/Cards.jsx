import React from 'react';
import mc from './cards.module.scss'
import RedirectBtn from "../button/redirectBtn/RedirectBtn";

const Cards = (props) => {
    const {name} = props
    return (
        <div className={`${mc.cards} flex flex-column ai-center flex-wrap`}>
            <h3>{name}</h3>
            <div>
                <p> Objectifs réalisés : </p>
                <p> Montant prévu :</p>
                <p> Montant actuel :</p>
                <RedirectBtn namebtn="Voir plus"/>
            </div>
        </div>
    );
};

export default Cards;
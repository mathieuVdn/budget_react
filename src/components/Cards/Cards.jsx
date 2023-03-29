import React from 'react';
import mc from './cards.module.scss'

const Cards = (props) => {
    const {name} = props
    return (
        <div className={`${mc.cards} flexCol`}>
            <h3>{name}</h3>
            <div>
                <p> Objectifs réalisés : </p>
                <p> Montant prévu :</p>
                <p> Montant actuel :</p>
            </div>
        </div>
    );
};

export default Cards;
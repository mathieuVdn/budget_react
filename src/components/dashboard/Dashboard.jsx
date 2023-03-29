import React from 'react';
import mc from './dashboard.module.scss'
import Cards from '../Cards/Cards'

const Dashboard = () => {
    return (
        <main className={"container"}>
            <h1>Votre tableau de bord</h1>
            <section>
                <article className={mc.dashboard}>
                    <h2>Stats annuelles</h2>
                    <p>Objectifs remplis {`${'2'}/${'32'}`}</p>
                    <p>Montant épargné : {`${'2000 €'}`}</p>
                    <p>Dépenses : {`${'1000 €'}`}</p>
                    <p>Défis réalisés : {`${'3/10'}`}</p>
                </article>
                <article className={`flexAi`}>
                    <Cards name="Epargne"/>
                    <Cards name="Dépense"/>
                    <Cards name="Défi"/>
                </article>
            </section>
        </main>
    );
};

export default Dashboard;
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import "./envelope.module.scss";
import {NavLink} from "react-router-dom";
import mc from "./envelope.module.scss";
import {changeName, changeAmount, handleSelectEnvelope, changeNameSelectEnvelope, changeAmountSelectEnvelope} from "../../../redux/reducers/envelope.slice";
import {getEnvelopes, createEnvelope, deleteEnvelope, updateEnvelope} from "../../../redux/reducers/envelope.slice";
const Envelope = () => {

    const dispatch = useDispatch();
    const { persistUser} = useSelector((store) => store.persistedReducer)
    const {newEnvelope, savings, selectedEnvelope} = useSelector((store) => store.envelope)
    const [select, setSelect] = useState(null);

   useEffect(() => {
        dispatch(getEnvelopes(persistUser.id));
   }
    , [dispatch, persistUser.id])
    const handleName = (e, select) => {
        if (!!select) {
            dispatch(changeNameSelectEnvelope(e.target.value));
        } else {
            dispatch(changeName(e.target.value));
        }
    }
    const handleAmount = (e) => {
        if (!!select) {
            dispatch(changeAmountSelectEnvelope(e.target.value));
        } else {
            dispatch(changeAmount(e.target.value));
        }
    }
    const handleSubmit = (e, select) => {
        e.preventDefault();
        if (!!select) {
            dispatch(updateEnvelope(selectedEnvelope));
            setSelect(null)
            dispatch(changeName(''));
            dispatch(changeAmount(''));
        } else {
            dispatch(createEnvelope(newEnvelope));
            dispatch(changeName(''));
            dispatch(changeAmount(''));
        }
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteEnvelope(id));
        setSelect(null)
    }

    const selectEnvelope = (e,id, name, amount) => {
        if (id === select) {
            setSelect(null);
        } else {
            setSelect(id);
            dispatch(handleSelectEnvelope({id, name, amount}));
        }
    };

    return (
        <div className={`container flex ai-center jc-space-between ai-baseline`} >
        <main className={`${mc.envelope}`} >
        <h2>Mes Epargnes</h2>
           <div className={`${mc.envelopeList} flex ai-center flex-wrap jc-space-around`}>
              {savings.map((envelope) => {
                  return (
                      <div onClick={(e) =>
                          selectEnvelope(e, envelope.id, envelope.name, envelope.amount)} key={`${envelope.id}`}
                           className={`${select === envelope.id ? mc.selected : null} ${mc.envelopeItem}`}>
                      <span className={mc.deleteCross} onClick={(e)=>handleDelete(e, envelope.id)}>x</span>
                        <h3>{envelope.name}</h3>
                          <p>Objectif: {envelope.amount} €</p>
                          <button className={`${mc.buttonOperation}`}><NavLink> Voir toutes les opérations</NavLink>
                          </button>
                    </div>
                    )
                }
                )}
            </div>
            </main>
            <aside className={`${mc.aside}`}>
                {!!select ?
                    <h3>Modifier l'enveloppe</h3>
                    :
                    <h3>Ajoutez une nouvelle enveloppe</h3>}
                    <form onSubmit={(e)=>handleSubmit(e, select)}>
                        <div className={`${mc.labelBoxEnvelope}`}>
                            <input type="text" id="name" name="name" required value={!!select ? selectedEnvelope.name || "" : newEnvelope.name || ""} onChange={(e)=>handleName(e, select)}/>
                            <label htmlFor="name">Nom de l'enveloppe épargne</label>
                        </div>
                        <div className={`${mc.labelBoxEnvelope}`}>
                            <input type="number" id="amount" name="amount" required value={!!select ? selectedEnvelope.amount : newEnvelope.amount || ""} onChange={(e)=>handleAmount(e)}/>
                            <label htmlFor="amount">Montant de l'objectif d'épargne</label>
                        </div>
                        <button className={mc.submitButton} type="submit">Ajouter</button>
                    </form>
                {!!select ? <button className={mc.deleteButton} onClick={(e)=>handleDelete(e, select)}>Supprimer l'enveloppe</button> : null}
                {!!select ?
                    <>
                    <h3>Ajouter une opération</h3>
                    <form action="">
                        <div className={`${mc.labelBoxEnvelope}`}>
                            <input type="text" id="name" name="name" required value={newEnvelope.name || ""} onChange={(e)=>handleName(e)}/>
                            <label htmlFor="name">Nom de l'opération</label>
                        </div>
                        <div className={`${mc.labelBoxEnvelope}`}>
                            <input type="number" id="amount" name="amount" required value={newEnvelope.amount || ""} onChange={(e)=>handleAmount(e)}/>
                            <label htmlFor="amount">Montant de l'opération</label>
                        </div>
                        <button className={mc.submitButton} type="submit">Ajouter une opération</button>
                    </form>
                    </>
                : null}
            </aside>
        </div>
    );
};

export default Envelope;
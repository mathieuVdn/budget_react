import mc from './account.module.scss'
import React, {useEffect, useState} from "react";
import {getUser, updateUser} from "../../redux/reducers/user.slice";
import {useDispatch, useSelector} from "react-redux";
import {updateUserEmail, updateUserName, updateUserFirstName} from "../../redux/reducers/user.slice";
import {updatePersistUser} from "../../redux/reducers/login.slice";

const Account = () => {
    const dispatch = useDispatch()
    const [changePassword, setChangePassword] = useState(false)
    const {persistUser} = useSelector((store) => store.persistedReducer)
    const{user} = useSelector((store) => store.user)

    useEffect(() => {
        dispatch(getUser(persistUser.id))
    }, [dispatch, persistUser.id])
    const handleName = (e) => {
        dispatch(updateUserName(e.target.value))
    }
    const handleFirstName = (e) => {
        dispatch(updateUserFirstName(e.target.value))
    }
    const handleEmail = (e) => {
        dispatch(updateUserEmail(e.target.value));
    }
    const handleUpdateUser = async (e)   => {
        e.preventDefault()
        await dispatch(updateUser(user))
        await dispatch(getUser(persistUser.id))
        await dispatch(updatePersistUser(user))
    }

    return (
        <main>
            <h1>Mon compte</h1>
            <section className={mc.updateUser}>
                <article className={mc.updateUserForm}>
                    <h2>Informations personnelles</h2>
                    <form onSubmit={(e)=>handleUpdateUser(e)} >
                        {!changePassword ?
                            <>
                        <div className={`labelBox`}>
                            <input
                                type="text"
                                required
                                value={user.name ? (user.name).toUpperCase() : " "}
                                onChange={(e)=>handleName(e)}
                            />
                            <label htmlFor="name">Nom</label>
                        </div>
                        <div className={`labelBox`}>
                            <input
                                type="text"
                                required
                                value={user.firstname ? user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1) : " "}
                                onChange={(e)=>handleFirstName(e)}
                            />
                            <label htmlFor="name">Prénom</label>
                        </div>
                        <div className={`labelBox`}>
                            <input
                                type="text"
                                required
                                value={user.email ? user.email.toLowerCase() : " "}
                                onChange={(e)=>handleEmail(e)}
                            />
                            <label htmlFor="name">Email</label>
                        </div>
                                <input className={mc.update} type="submit" value={`Mettre à jour`}/>
                                <button className={mc.update} type="button" onClick={() => setChangePassword(!changePassword)}>Changer de mot de passe</button>
                            </>
                            :
                            <>
                                <div className={`labelBox`}>
                                    <input type="password" required value={""}/>
                                    <label htmlFor="name">Mot de passe</label>
                                </div>
                                <div className={`labelBox`}>
                                    <input type="password" required value={""}/>
                                    <label htmlFor="name">Confirmer le mot de passe</label>
                                </div>
                        <input className={mc.update} type="submit" value={`Mettre à jour`}></input>
                        <button className={mc.update} type="button" onClick={() => setChangePassword(!changePassword)}>Annuler les modifications</button>
                            </>}
                    </form>
                </article>
                <article className={mc.userPreference}>
                    <h2>Préférences</h2>
                </article>
            </section>
        </main>
    );
};

export default Account;
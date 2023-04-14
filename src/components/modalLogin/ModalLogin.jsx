import React from 'react';
import mc from './modalLogin.module.scss';
import SignUpBtn from '../../components/button/signUpBtn/SignUpBtn';
import LoginBtn from '../button/loginBtn/LoginBtn';
import {useDispatch, useSelector} from "react-redux";
import {toggleLoginModal} from "../../redux/reducers/loginModal.slice";
import {changeMail, changePassword} from "../../redux/reducers/login.slice";
import RedirectBtn from "../button/redirectBtn/RedirectBtn";

const ModalLogin = () => {

    const dispatch = useDispatch();
    const handleMail = (mail) => {
        dispatch(changeMail(mail))
    }
    const handlePassword = (password) => {
        dispatch(changePassword(password))
    }

    const {loading, finish, errorSignIn} = useSelector((store) => store.persistedReducer)
    const error = !!errorSignIn
    return (
        <div>
            <div className={mc.overlay} onClick={() => dispatch(toggleLoginModal())}></div>
            <div className={`${mc.modalLogin} flex flex-column ai-center jc-center`}>
                {loading ? (
                    <div className={'flex column'}>
                        <div className={`loader`}></div>
                        <p>Chargement en cours...</p>
                    </div>
                ) : (
                    <div className={`${mc.loginForm}=`}>
                        {finish ? (
                            <div className={`flex flex-column ai-center jc-center`}>
                                <h2>Vous etes connecté avec succès !</h2>
                                <RedirectBtn namebtn="C'est parti !"/>
                            </div>
                        ) : (
                            <div>
                                <h2>Se connecter</h2>
                                {!error ? <p className={mc.error}>Email ou mot de passe incorrect</p>  : null}
                                <form>
                                    <div className={`labelBox`}>
                                        <input type="text" required onChange={(e) => handleMail(e.target.value)}/>
                                        <label htmlFor="name">Votre Email</label>
                                    </div>
                                    <div className={`labelBox`}>
                                        <input type="password" required
                                               onChange={(e) => handlePassword(e.target.value)}/>
                                        <label htmlFor="name">Votre mot de passe</label>
                                    </div>
                                    {<LoginBtn namebtn="Se connecter"/>}
                                    {<SignUpBtn namebtn="Créer un compte"/>}
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default ModalLogin;
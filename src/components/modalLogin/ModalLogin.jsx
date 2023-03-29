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
    const {loading, finish, user} = useSelector((store) => store.login)

    return (
        <div>
            <div className={mc.overlay} onClick={() => dispatch(toggleLoginModal())}></div>
            <div className={mc.modalLogin}>
                {loading ? (
                    <div className={'flexCol'}>
                        <div className={`loader`}></div>
                        <p>Chargement en cours...</p>
                    </div>
                ) : (
                    <div className={mc.loginForm}>
                        {finish ? (
                            <div className={`flexCol`}>
                                <h2>Vous etes connecté avec succès !</h2>
                                <RedirectBtn namebtn="C'est parti !"/>
                            </div>
                        ) : (
                            <div>
                                <h2>Se connecter</h2>
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
import React from 'react';
import bannerDataAnalyze from './../../assets/img/bannerDataAnalyze.png'
import mc from './sign-up.module.scss';
import ModalLogin from "../modalLogin/ModalLogin";
import {useDispatch, useSelector} from "react-redux";
import RedirectBtn from "../button/redirectBtn/RedirectBtn";
import LoginBtn from "../button/loginBtn/LoginBtn";
import {changeFirstname, changeMail, changeName, changePassword, signUp} from '../../redux/reducers/signup.slice.js';
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {visible} = useSelector((store) => store.loginModalSlice)
    const {name, firstname, email, password, loading, finish} = useSelector((store) => store.signup)

    const dashboardRedirect = () => navigate('/dashboard');
    const handleSignUp = (e) => {
        console.log(name, firstname, email, password)
        e.preventDefault()
        dispatch(signUp({name, firstname, email, password}))
        setTimeout(dashboardRedirect, 3000)
    }

    const handleMail = (mail) => {
        dispatch(changeMail(mail))
    }
    const handlePassword = (password) => {
        dispatch(changePassword(password))
    }
    const handleName = (name) => {
        dispatch(changeName(name))
    }
    const handleFirstname = (firstname) => {
        dispatch(changeFirstname(firstname))
    }


    return (
        <main className={`${visible ? "overlay" : ""} container`}>
            {!visible ? <ModalLogin/> : null}
            {loading ? <div className="loader"></div> : null}

            <h1>Rejoignez-nous et faites de vos économies une réalité</h1>
            <div className={`flexAi`}>
                <img src={bannerDataAnalyze} alt="illustration d'un graphique "/>
                <div className={`${mc.signUpForm}`}>
                    <h2>Créer un compte</h2>
                    <form onSubmit={e => (handleSignUp(e))}>
                        <div className={`labelBox`}>
                            <input type="text" required value={name} onChange={(e) => handleName(e.target.value)}/>
                            <label htmlFor="name">Nom</label>
                        </div>
                        <div className={`labelBox`}>
                            <input type="text" required value={firstname}
                                   onChange={(e) => handleFirstname(e.target.value)}/>
                            <label htmlFor="name">Prénom</label>
                        </div>
                        <div className={`labelBox`}>
                            <input type="text" required value={email} onChange={(e) => handleMail(e.target.value)}/>
                            <label htmlFor="name">Email</label>
                        </div>
                        <div className={`labelBox`}>
                            <input type="password" required value={password}
                                   onChange={(e) => handlePassword(e.target.value)}/>
                            <label htmlFor="name">Mot de passe</label>
                        </div>
                        <div className={`labelBox`}>
                            <input type="password" required/>
                            <label htmlFor="name">Confirmer le mot de passe</label>
                        </div>
                        <RedirectBtn namebtn="C'est parti"/>
                        <p>Vous avez déja un compte ? </p>
                        < LoginBtn namebtn="Se connecter"/>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default SignUp;
import {NavLink} from "react-router-dom";
import logo from "../../assets/img/logoEnvelope.png";
import expand from "../../assets/img/expand.svg";
import mc from "./header.module.scss";
import SignUpBtn from "../button/signUpBtn/SignUpBtn";
import LoginBtn from "../button/loginBtn/LoginBtn";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/reducers/login.slice";

const Header = () => {

    const {logged, persistUser} = useSelector((store) => store.persistedReducer)
    const dispatch = useDispatch()

    const userLogout = () => {
        localStorage.removeItem("token")
        dispatch(logout())
    }

    return (
        <header>
            <div className={mc.logo}>
                <img src={logo} alt="Logo de envelope Pro"/>
                <span className={mc.title}>EnvelopePro</span>
            </div>
            <nav className={`${mc.navbar}`}>
                <ul>
                    <li><NavLink to={"/"}>Accueil</NavLink></li>
                    <li><NavLink to={"/about"}>A propos</NavLink></li>
                    <li><NavLink to={"/dashboard"}>Tableau de bord</NavLink></li>
                    <li className={mc.dropMenuNav}>
                        <NavLink to={"/envelope"} className="flex ai-center">
                            Enveloppe
                            <img src={expand} alt="Icone de chevron vers le bas"/>
                        </NavLink>
                        <div className={mc.dropMenu}>
                            <ul>
                                <li><NavLink to={"/envelope"}>Mes épargnes</NavLink></li>
                                <li><NavLink to={"/envelope"}>Mes dépenses</NavLink></li>
                                <li><NavLink to={"/envelope"}>Mes défis</NavLink></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
            {logged ?
             <div className={`${mc.account}`}>
                <div className={mc.dropMenuNav}>
                    <div className={`flex ai-center`}>
                        <p>{`${persistUser.firstname}` }</p>
                        <img src={expand} alt="Icone de chevron vers le bas"/>
                    </div>
                    <div className={mc.dropMenu}>
                        <ul>
                            <li><NavLink to={"/account"}>Mon compte</NavLink></li>
                            <li>
                                <button
                                className={mc.logout}
                                onClick={() => userLogout()}>
                                Se déconnecter
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
                :
            <div className={`${mc.login}`}>
                <LoginBtn namebtn="Se connecter"/>
                <SignUpBtn namebtn="Rejoindre"/>
            </div>
                }
        </header>

    );
};
export default Header
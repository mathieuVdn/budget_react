import {Link} from "react-router-dom";
import logo from "../../assets/img/logoEnvelope.png";
import expand from "../../assets/img/expand.svg";
import mc  from "./header.module.scss";
import SignUpBtn from "../button/signUpBtn/SignUpBtn";
import LoginBtn from "../button/loginBtn/LoginBtn";


const Header = () => {
    return (
        <header>
            <div className={mc.logo}>
                <img src={logo} alt="Logo de envelope Pro"/>
                <h1>EnvelopePro</h1>
            </div>
            <nav className={`${mc.navbar}`}>
                <ul>
                    <li><Link to={"/"}>Accueil</Link></li>
                    <li><Link to={"/about"}>A propos</Link></li>
                    <li><Link to={"/"}>Tableau de bord</Link></li>
                    <li className={mc.dropMenuNav}>
                        <Link to={"/"} className={mc.flexAi}>
                            Enveloppe
                            <img src={expand} alt="Icone de chevron vers le bas"/>
                        </Link>
                        <div className={mc.dropMenu}>
                        <ul >
                            <li><Link to={"/"}>Mes épargnes</Link></li>
                            <li><Link to={"/"}>Mes dépenses</Link></li>
                            <li><Link to={"/"}>Mes défis</Link></li>
                        </ul>
                        </div>
                    </li>
                </ul>
            </nav>
            <div className={`${mc.flexAi} ${mc.login}`}>
                <div className={mc.dropMenuNav}>
                    <LoginBtn name="Se connecter"/>
                        <div className={mc.dropMenu}>
                            <ul >
                                <li><input type="text" placeholder="Votre E-mail"  /> </li>
                                <li><input type="password" placeholder="Votre mot de passe"  /> </li>
                                <li><Link to={"/"}>Se connecter</Link></li>
                                <li><Link to={"/"}>Créer un compte</Link></li>
                            </ul>
                        </div>
                </div>
                <SignUpBtn name="Rejoindre" />
            </div>
        </header>
    );
};
export default Header
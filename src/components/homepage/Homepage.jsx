import banner from '../../assets/img/vaultBanner.png';
import mc from './homepage.module.scss';
import LoginBtn from '../button/loginBtn/LoginBtn';
import SignUpBtn from "../button/signUpBtn/SignUpBtn";
import ModalLogin from '../modalLogin/ModalLogin';
import {useSelector} from "react-redux";
import {BTN_SIGN_UP} from "../../constants/constant.utils";
import RedirectBtn from "../button/redirectBtn/RedirectBtn";

const Homepage = () => {
    const {visible} = useSelector((store) => store.loginModalSlice)
    const {token} = useSelector((store) => store.login)
    console.log(token)
    const isLogged = !!localStorage.getItem('token')
    return (
        <main className={`${visible ? "overlay" : ""} container`}>
        {!visible ? <ModalLogin/> : null}
        <h1>Prenez le contrôle de votre budget avec la méthode des enveloppes</h1>
        <section className="flexAi">
            <article>
                <img src={banner} alt="Illustration d'un coffre-fort"/>
            </article>
            <article className={`flexCol ${mc.description}`}>
                <h2>Rejoignez-nous</h2>
                <p>Découvrez notre site de gestion de budget avec la méthode des enveloppes ! Cette méthode consiste
                    à allouer un budget fixe à différentes catégories de dépenses ou d'épargne. Sur notre site, vous
                    pourrez créer des enveloppes virtuelles pour toutes vos opérations, suivre en temps réel votre
                    budget. Prenez le contrôle de votre budget dès maintenant et atteignez vos objectifs financiers
                    plus facilement.</p>
                {isLogged ? <RedirectBtn namebtn={`C'est parti`}/> :
                    <>
                        <SignUpBtn namebtn="Commencer dès maintenant"/>
                        <LoginBtn namebtn={BTN_SIGN_UP}/>
                    </>
            }
            </article>
        </section>
    </main>);
};
export default Homepage;
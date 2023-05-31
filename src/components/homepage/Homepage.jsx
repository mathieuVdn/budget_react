import React  from 'react';
import banner from "../../assets/img/vaultBanner.png";
import mc from "./homepage.module.scss";
import LoginBtn from "../button/loginBtn/LoginBtn";

import ModalLogin from "../modalLogin/ModalLogin";
import {useDispatch, useSelector} from "react-redux";
import { BTN_SIGN_IN } from "../../constants/constant.utils";
import RedirectBtn from "../button/redirectBtn/RedirectBtn";
import {useEffect} from "react";
import {toggleMenuBurger} from "../../redux/reducers/login.slice";

const Homepage = () => {
  const dispatch = useDispatch();
  const { visible } = useSelector((store) => store.loginModalSlice);
  const { logged } = useSelector(
    (store) => store.persistedReducer
  );
  useEffect( ()=> {
    dispatch(toggleMenuBurger())
  }, [dispatch])
useEffect(() => {

}, [])

  return (
    <main className={`${mc.mainHomepage} ${visible ? "overlay" : ""} container`}>
      {!visible ? <ModalLogin /> : null}
      <h1>Prenez le contrôle de votre budget avec la méthode des enveloppes</h1>
      <section
        className={`${mc.homepageContainer} flex flex-wrap ai-center jc-space-between`}
      >
        <article>
          <img src={banner} alt="Illustration d'un coffre-fort" />
        </article>
        <article className={`flex flex-column ai-center ${mc.description}`}>
          <h2>Rejoignez-nous</h2>
          <p>
            Découvrez notre site de gestion de budget avec la méthode des
            enveloppes ! Cette méthode consiste à allouer un budget fixe à
            différentes catégories de dépenses ou d'épargne. Sur notre site,
            vous pourrez créer des enveloppes virtuelles pour toutes vos
            opérations, suivre en temps réel votre budget. Prenez le contrôle de
            votre budget dès maintenant et atteignez vos objectifs financiers
            plus facilement.
          </p>
          {logged ? (
            <RedirectBtn namebtn={`C'est parti`} url={`/dashboard`} />
          ) : (
            <>
              <RedirectBtn namebtn="Commencer dès maintenant" url={`sign-up`} />
              <LoginBtn namebtn={BTN_SIGN_IN} />
            </>
          )}
        </article>
      </section>
    </main>
  );
};
export default Homepage;


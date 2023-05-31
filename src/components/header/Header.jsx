import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logoEnvelope.png";
import expand from "../../assets/img/expand.svg";
import mc from "./header.module.scss";
import LoginBtn from "../button/loginBtn/LoginBtn";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleMenuBurger } from "../../redux/reducers/login.slice";
import RedirectBtn from "../button/redirectBtn/RedirectBtn";
import close from "../../assets/img/close.svg";
import React  from 'react';
const Header = () => {
  const { logged, persistUser, menuBurger } = useSelector(
    (store) => store.persistedReducer
  );
  const dispatch = useDispatch();

  const handleMenuBurger = () => {
    dispatch(toggleMenuBurger());
  };
  const userLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <header className={`${mc.header} flex ai-center jc-flex-start`}>
      <NavLink to={`/`} className={mc.logo}>
        <img src={logo} alt="Logo de envelope Pro" />
        <span className={mc.title}>EnvelopePro</span>
      </NavLink>
      <div
        className={`${mc.navbar} ${
          menuBurger ? mc.visibleBurger : ""
        } flex ai-center jc-space-between`}
      >
        <nav>
          <ul className={`flex ai-center jc-space-around`}>
            <li>
              <NavLink onClick={handleMenuBurger} to={"/"}>Accueil</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>A propos</NavLink>
            </li>
            <li className={`${mc.dropMenuNav} flex ai-center`}>
              <NavLink onClick={handleMenuBurger} to={"/dashboard"}>Tableau de bord</NavLink>
              <img src={expand} alt="Icone de chevron vers le bas" />
              <div className={mc.dropMenu}>
                <ul>
                  <li>
                    <NavLink onClick={handleMenuBurger} to={"/envelope/savings"}>Mes épargnes</NavLink>
                  </li>
                  <li>
                    <NavLink onClick={handleMenuBurger} to={"/envelope/expenses"}>Mes dépenses</NavLink>
                  </li>
                  <li>
                    <NavLink onClick={handleMenuBurger} to={"/envelope/challenges"}>Mes défis</NavLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        {logged ? (
          <div className={`${mc.account}`}>
            <div className={`${mc.dropMenuNav} flex ai-center`}>
              <p>{`${persistUser.firstname}`}</p>
              <img src={expand} alt="Icone de chevron vers le bas" />
              <div className={mc.dropMenu}>
                <ul>
                  <li>
                    <NavLink to={"/account"}>Mon compte</NavLink>
                  </li>
                  <li>
                    <button className={mc.logout} onClick={() => userLogout()}>
                      Se déconnecter
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className={`${mc.login}`}>
            <LoginBtn namebtn="Se connecter"/>
            <RedirectBtn namebtn="Rejoindre" url={`sign-up`} functionOnClick={handleMenuBurger}/>
          </div>
        )}
        <div className={`${mc.logoNavbar} flex ai-center jc-space-between`}>
          <div className={mc.logoBurger}>
            <img src={logo} alt="Logo de envelope Pro" />
            <span className={mc.title}>EnvelopePro</span>
          </div>
          {menuBurger ? (
            <img
              onClick={handleMenuBurger}
              className={mc.closeBurger}
              src={close}
              alt="icone d'une croix"
            />
          ) : null}
        </div>
      </div>
      <div className={mc.burger} onClick={handleMenuBurger}>
        <div className={mc.line}></div>
        <div className={mc.line}></div>
        <div className={mc.line}></div>
      </div>
    </header>
  );
};
export default Header;

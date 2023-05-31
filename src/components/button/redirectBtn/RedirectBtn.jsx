import React from "react";
import mc from "./redirectBtn.module.scss";
import { NavLink } from "react-router-dom";
import { toggleMenuBurger } from "../../../redux/reducers/login.slice";
import { useDispatch } from "react-redux";

const RedirectBtn = (props) => {
  const { namebtn, url, handleMenuBurger, functionOnClick } = props;
  const dispatch = useDispatch();

  console.log("functionOnClick", functionOnClick);
  return (
    <>
      {!!functionOnClick ? (
        <NavLink
          to={`${url}`}
          className={mc.redirectBtn}
          onClick={()=>functionOnClick()}
        >
          {" "}
          {namebtn}
        </NavLink>
      ) : (
        <NavLink to={`${url}`} className={mc.redirectBtn}>
          {namebtn}{" "}
        </NavLink>
      )}
    </>
  );
};

export default RedirectBtn;

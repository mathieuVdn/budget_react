import React from "react";
import mc from "./redirectBtn.module.scss";
import { NavLink } from "react-router-dom";

const RedirectBtn = (props) => {
  const { namebtn, url, functionOnClick } = props;

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

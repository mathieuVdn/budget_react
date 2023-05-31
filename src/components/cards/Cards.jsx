import React, { useEffect } from "react";
import mc from "./cards.module.scss";
import RedirectBtn from "../button/redirectBtn/RedirectBtn";

import Radial from "../radialBar/Radial";
import {
  TYPE_SAVINGS,
  TYPE_EXPENSES,
  TYPE_CHALLENGES,
} from "../../constants/constant.utils";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { objectivePercent } from "../../utils/calcul.utils";

const Cards = (props) => {
  const { name, type } = props;
  const series = [60.3];
  const [redirection, setRedirection] = useState("");
  const dispatch = useDispatch();
  const { persistUser } = useSelector((store) => store.persistedReducer);
  const { savings, expenses, challenges } = useSelector(
    (store) => store.envelope
  );

  useEffect(() => {
    if (type === TYPE_SAVINGS) {
      setRedirection("savings");
    } else if (type === TYPE_EXPENSES) {
      setRedirection("expenses");
    } else if (type === TYPE_CHALLENGES) {
      setRedirection("challenges");
    }
  }, [type]);

  const totalEnvelope = (type) => {
    let total = 0;
    if (type === TYPE_SAVINGS) {
      savings.map((s) => {
        return total += 1;
      });
    } else if (type === TYPE_EXPENSES) {
      expenses.map((e) => {
        return  total += 1;
      });
    } else if (type === TYPE_CHALLENGES) {
      challenges.map((c) => {
        return total += 1;
      });
    }
    return total;
  };

  const totalAmountObjective = (type) => {
    let total = 0;
    if (type === TYPE_SAVINGS) {
      savings.map((s) => {
        total += s.amount;
      });
    } else if (type === TYPE_EXPENSES) {
      expenses.map((e) => {
        total += e.amount;
      });
    } else if (type === TYPE_CHALLENGES) {
      challenges.map((c) => {
        if (c.operations === undefined) return 0;
        total += c.amount;
      });
    }
    return total;
  };

  const totalAmountRealized = (type) => {
    let total = 0;
    if (type === TYPE_SAVINGS) {
      savings.map((s) => {
        if (s.operations === undefined) return 0;
        s.operations.map((o) => {
          total += o.amount;
        });
      });
    } else if (type === TYPE_EXPENSES) {
      expenses.map((e) => {
        if (e.operations === undefined) return 0;
        e.operations.map((o) => {
          total += o.amount;
        });
      });
    } else if (type === TYPE_CHALLENGES) {
      challenges.map((c) => {
        if (c.operations === undefined) return 0;
        c.operations.map((o) => {
          total += o.amount;
        });
      });
    }
    return total;
  };

  return (
    <div className={`${mc.cards} flex flex-column ai-center flex-wrap`}>
      <h3>{name}</h3>
      <div className={`${mc.bodyCards} flex ai-center jc-space-between`}>
        <Radial
          series={objectivePercent(
            totalAmountRealized(type),
            totalAmountObjective(type)
          )}
        />
        <div className={mc.textCards}>
          <p> Montant objectif total : {totalAmountObjective(type)} €</p>
          <p> Objectifs réalisés : {totalAmountRealized(type)} €</p>
          <p> Nombre d'enveloppes : {totalEnvelope(type)} </p>
        </div>
      </div>
      <RedirectBtn url={`/envelope/${redirection}`} namebtn={`Voir Plus`} />
    </div>
  );
};

export default Cards;

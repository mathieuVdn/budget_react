import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./envelope.module.scss";
import mc from "./envelope.module.scss";
import { NavLink } from "react-router-dom";
import {
  handleSelectedEnvelope,
  handleSelectEnvelope,
  handleType,
} from "../../redux/reducers/envelope.slice";
import {
  getEnvelopes,
  deleteEnvelope,
} from "../../redux/reducers/envelope.slice";
import Aside from "../aside/Aside";
import {
  TYPE_SAVINGS,
  TYPE_EXPENSES,
  TYPE_CHALLENGES,
} from "../../constants/constant.utils.js";
import RedirectBtn from "../button/redirectBtn/RedirectBtn";
import Radial from "../radialBar/Radial";
import MutipleRadialBar from "../mutipleRadialBar/MutipleRadialBar";
import arrowBack from "../../assets/img/arrow_back.svg";
import deleteIcon from "../../assets/img/deleteIcon.svg";
import { sum, objectivePercent } from "../../utils/calcul.utils";

const Envelope = (props) => {
  const { type, envelopesType } = props;
  const dispatch = useDispatch();
  const { persistUser } = useSelector((store) => store.persistedReducer);
  const { selectEnvelope, selectedEnvelope } = useSelector((store) => store.envelope);
  const [titlePage, setTitlePage] = useState("");
  const { visible, labels, dataMultipleRadialBar } = useSelector(
    (store) => store.graphics
  );

  useEffect(() => {
    dispatch(getEnvelopes(persistUser.id));
  }, [dispatch, persistUser.id]);

  useEffect(() => {
    dispatch(handleType(type));
  }, [dispatch, type]);

  useEffect(() => {
    dispatch(handleSelectEnvelope(null));
  }, [dispatch, type]);

  useEffect(() => {
    if (type === TYPE_SAVINGS) {
      setTitlePage("Mes Epargnes");
    } else if (type === TYPE_EXPENSES) {
      setTitlePage("Mes Dépenses");
    } else if (type === TYPE_CHALLENGES) {
      setTitlePage("Mes Défis");
    }
  }, [type, setTitlePage]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteEnvelope(id));
    dispatch(handleSelectEnvelope(null));
  };
  const selectEnvelopeOnClick = (e, id, name, amount) => {
    if (id === selectEnvelope) {
      dispatch(handleSelectEnvelope(null));
    } else {
      dispatch(handleSelectEnvelope(id));
      dispatch(handleSelectedEnvelope({ id, name, amount, type_id: type }));
      console.log(selectedEnvelope);
    }
  };

  return (
    <div className={`${mc.envelopeContainer} container flex ai-center jc-space-between ai-baseline`}>
      <main className={`${mc.envelope}`}>
        <div className={`flex ai-center`}>
          <span>
            <NavLink to={`http://localhost:3000/dashboard`}>
              <img src={arrowBack} alt="icone d'une fléche vers la gauche" />
            </NavLink>
          </span>
          <h2>{titlePage}</h2>
        </div>

        {visible ? (
          <div className={mc.graphic}>
            <MutipleRadialBar series={dataMultipleRadialBar} labels={labels} />
          </div>
        ) : (
          <div
            className={`${mc.envelopeList} flex ai-center flex-wrap jc-space-around`}
          >
            {envelopesType.map((envelope) => {
              return (
                <div
                  onClick={(e) =>
                    selectEnvelopeOnClick(
                      e,
                      envelope.id,
                      envelope.name,
                      envelope.amount
                    )
                  }
                  key={`${envelope.id}`}
                  className={`flex-column ai-center jc-center ${
                    selectEnvelope === envelope.id ? mc.selected : null
                  } ${mc.envelopeItem}`}
                >
                  <span
                    className={mc.deleteCross}
                    onClick={(e) => handleDelete(e, envelope.id)}
                  >
                    <img src={deleteIcon} alt="icone représentant une poubelle pour la suppression d'enveloppe" />
                  </span>
                  <h3>{envelope.name}</h3>
                  <div className={`${mc.cardsContent} flex ai-center jc-space-around`}>
                    <Radial
                      series={objectivePercent(
                        sum(envelope.operations),
                        envelope.amount
                      )}
                    />
                    <div>
                      <p>Objectif: {envelope.amount} €</p>
                      <p>Montant actuel : {sum(envelope.operations)} €</p>
                    </div>
                  </div>
                  <RedirectBtn
                    namebtn={`Voir toutes les opérations`}
                    url={`/operation/${envelope.id}`}
                  />
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Aside type={type} />

    </div>
  );
};

export default Envelope;

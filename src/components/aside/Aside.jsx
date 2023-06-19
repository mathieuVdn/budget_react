import React, { useEffect } from "react";
import mc from "./aside.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { TYPE_CHALLENGES,TYPE_EXPENSES, TYPE_SAVINGS } from "../../constants/constant.utils";
import {
  changeAmount,
  changeAmountSelectEnvelope,
  changeName,
  changeNameSelectEnvelope,
  createEnvelope,
  deleteEnvelope,
  handleSelectEnvelope,
  updateEnvelope,
} from "../../redux/reducers/envelope.slice";
import {
  changeNameOperation,
  changeAmountOperation,
  changeDateOperation,
  handleEnvelopeIdCreate,
  changeNameSelectedOperation,
  changeAmountSelectedOperation,
  createOperation,
  updateOperation,
  handleSelectOperation,
  deleteOperation,
} from "../../redux/reducers/operation.slice";
import {
  handleVisible,
  handleDataRadialBar,
  handleDataMultipleRadialBar,
  handleLabelsMultipleRadialBar,
  deleteFromDataMultipleRadialBar,
  deleteFromLabelsMultipleRadialBar,
} from "../../redux/reducers/graphics.slice";
import { useParams } from "react-router-dom";
import { sum, objectivePercent } from "../../utils/calcul.utils";

const Aside = (props) => {
  const {operation , type } = props;
  const envelope_id = useParams().id;
  const dispatch = useDispatch();
  const { newEnvelope, selectedEnvelope, selectEnvelope, savings, expenses, challenges } =
    useSelector((store) => store.envelope);
  const { newOperation, selectedOperation, selectOperation, operations } =
    useSelector((store) => store.operations);
  const { visible, labels, dataMultipleRadialBar } = useSelector(
    (store) => store.graphics
  );

  useEffect(() => {
    dispatch(handleSelectEnvelope(null));
    dispatch(handleEnvelopeIdCreate(envelope_id));
  }, [envelope_id, dispatch]);

  const handleName = (e) => {
    if (operation === "operation") {
      if (!!selectOperation) {
        dispatch(changeNameSelectedOperation(e.target.value));
      } else {
        dispatch(changeNameOperation(e.target.value));
      }
    } else {
      if (!!selectEnvelope) {
        dispatch(changeNameSelectEnvelope(e.target.value));
      } else {
        dispatch(changeName(e.target.value));
      }
    }
  };
  const handleAmount = (e) => {
    if (operation === "operation") {
      if (!!selectOperation) {
        dispatch(changeAmountSelectedOperation(e.target.value));
      } else {
        dispatch(changeAmountOperation(e.target.value));
      }
    } else {
      if (!!selectEnvelope) {
        dispatch(changeAmountSelectEnvelope(e.target.value));
      } else {
        dispatch(changeAmount(e.target.value));
      }
    }
  };
  const handleInputName = () => {
    if (type === "operation") {
      if (!!selectOperation) {
        return selectedOperation.name || "";
      } else {
        return newOperation.name || "";
      }
    } else {
      if (!!selectEnvelope) {
        return selectedEnvelope.name || "";
      } else {
        return newEnvelope.name || "";
      }
    }
  };
  const handleInputAmount = () => {
    if (operation === "operation") {
      if (!!selectOperation) {
        return selectedOperation.amount || "";
      } else {
        return newOperation.amount || "";
      }
    } else {
      if (!!selectEnvelope) {
        return selectedEnvelope.amount || "";
      } else {
        return newEnvelope.amount || "";
      }
    }
  };
  const handleInputDate = (e) => {
    dispatch(changeDateOperation(e.target.value));
  };
  const eraseValueInput = () => {
    dispatch(changeName(""));
    dispatch(changeAmount(""));
    dispatch(changeNameOperation(""));
    dispatch(changeDateOperation(" - - "));
    dispatch(changeAmountOperation(""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (operation === "operation") {
      if (!!selectOperation) {
        dispatch(updateOperation(selectedOperation));
        dispatch(handleSelectOperation(null));
      } else {
        dispatch(createOperation(newOperation));
        eraseValueInput();
      }
    } else {
      if (!!selectEnvelope) {
        dispatch(updateEnvelope(selectedEnvelope));
        dispatch(handleSelectEnvelope(null));
        eraseValueInput();
      } else {
        dispatch(createEnvelope(newEnvelope));
        eraseValueInput();
      }
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();
    if (!!selectEnvelope) {
      dispatch(deleteEnvelope(selectEnvelope));
      dispatch(handleSelectEnvelope(null));
    } else if (!!selectOperation) {
      dispatch(deleteOperation(selectOperation));
      dispatch(handleSelectOperation(null));
    }
  };

  const percentByEnvelope = () => {
    if (type === TYPE_SAVINGS) {
    savings.forEach((saving) => {
      if (saving.operations === undefined) return [0];
      let objective = saving.amount;
      let amount = sum(
        saving.operations.filter(
          (operation) => operation.envelope_id === saving.id
        )
      );
      let percent = objectivePercent(amount, objective);
      const label = saving.name;
      dispatch(handleDataMultipleRadialBar(percent));
      dispatch(handleLabelsMultipleRadialBar(label));
    });
  }
  else if (type === TYPE_EXPENSES) {
    expenses.forEach(expense => {
      if (expense.operations === undefined) return [0];
      let objective = expense.amount;
      let amount = sum(
        expense.operations.filter(
          (operation) => operation.envelope_id === expense.id
        )
      );
      let percent = objectivePercent(amount, objective);
      const label = expense.name;
      dispatch(handleDataMultipleRadialBar(percent));
      dispatch(handleLabelsMultipleRadialBar(label));
    });
  }
  else if (type === TYPE_CHALLENGES) {
    challenges.forEach((challenge) => {
      if (challenge.operations === undefined) return [0];
      let objective = challenge.amount;
      let amount = sum(
        challenge.operations.filter(
          (operation) => operation.envelope_id === challenge.id
        )
      );
      let percent = objectivePercent(amount, objective);
      const label = challenge.name;
      dispatch(handleDataMultipleRadialBar(percent));
      dispatch(handleLabelsMultipleRadialBar(label));
    });
  };
};

  return (
    <aside className={`${mc.aside}`}>
      {operation === "operation" ? (
        !!selectOperation ? (
          <h3>Modifier une opération </h3>
        ) : (
          <h3>Ajouter une opération </h3>
        )
      ) : !!selectEnvelope ? (
        <h3>Modifier l'enveloppe</h3>
      ) : (
        <h3>Ajoutez une nouvelle enveloppe</h3>
      )}

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={`${mc.labelBoxEnvelope}`}>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={handleInputName()}
            onChange={(e) => handleName(e)}
          />
          <label htmlFor="name">
            {operation === `operation` ? `Nom de l'opération` : `Nom de l'enveloppe`}
          </label>
        </div>
        <div className={`${mc.labelBoxEnvelope}`}>
          <input
            type="number"
            id="amount"
            name="amount"
            required
            value={handleInputAmount()}
            onChange={(e) => handleAmount(e)}
          />
          <label htmlFor="amount">Montant de l'objectif </label>
        </div>
        {operation === "operation" ? (
          <div className={`${mc.labelBoxEnvelope}`}>
            <input
              type="date"
              id="date"
              name="date"
              value={newOperation.date || ""}
              onChange={(e) => handleInputDate(e)}
            />
            <label htmlFor="name">{`Date de l'opération`}</label>
          </div>
        ) : null}
        {!!selectEnvelope || !!selectOperation ? (
          <button className={mc.submitButton} type="submit">
            Modifier
          </button>
        ) : (
          <button className={mc.submitButton} type="submit">
            Ajouter
          </button>
        )}
      </form>
      {!!selectEnvelope || !!selectOperation ? (
        <button
          className={mc.deleteButton}
          onClick={(e) => handleDelete(e, selectEnvelope)}
        >
          Supprimer l'enveloppe
        </button>
      ) : null}
      {!!selectEnvelope ? (
        <>
          <h3>Ajouter une opération</h3>
          <form action="src/components/aside">
            <div className={`${mc.labelBoxEnvelope}`}>
              <input type="text" id="name" name="name" required />
              <label htmlFor="name">Nom de l'opération</label>
            </div>
            <div className={`${mc.labelBoxEnvelope}`}>
              <input type="number" id="amount" name="amount" required />
              <label htmlFor="amount">Montant de l'opération</label>
            </div>
            <button className={mc.submitButton} type="submit">
              Ajouter une opération
            </button>
          </form>
        </>
      ) : null}
      <h3>Graphique</h3>
      <button
        className={mc.submitButton}
        onClick={() => {
          dispatch(handleVisible(!visible));
          if (!visible) {
            dispatch(
              handleDataRadialBar(
                  operations.map((op) => {
                  return { x: new Date(op.date).getTime(), y: op.amount };
                })
              )
            );
            percentByEnvelope();
          } else {
            dispatch(deleteFromDataMultipleRadialBar(dataMultipleRadialBar));
            dispatch(deleteFromLabelsMultipleRadialBar(labels));
          }
        }}
      >
        Voir graphique
      </button>
    </aside>
  );
};

export default Aside;

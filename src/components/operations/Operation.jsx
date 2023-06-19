import React, { useEffect } from "react";
import mc from "./operation.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  getOperation,
  deleteOperation,
  handleSelectOperation,
  handleSelectedOperation,
} from "../../redux/reducers/operation.slice";
import Aside from "../aside/Aside";
import LineChart from "../lineCharts/LineChart";
import arrowBack from "../../assets/img/arrow_back.svg";
import deleteIcon from "../../assets/img/deleteIcon.svg";


const Operation = () => {
  let { id } = useParams();
  id = parseInt(id);
  const dispatch = useDispatch();
  const { envelope, operations, selectOperation } = useSelector(
    (store) => store.operations
  );
  const { visible, dataRadialBar } = useSelector((store) => store.graphics);

  useEffect(() => {
    dispatch(getOperation(id));
  }, [dispatch, id]);

  const selectOperationOnClick = (id, name, amount, date, envelope_id) => {
    if (selectOperation === id) {
      dispatch(handleSelectOperation(null));
    } else {
      dispatch(handleSelectOperation(id));
      dispatch(
        handleSelectedOperation({ id, name, amount, date, envelope_id })
      );
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteOperation(id));
    dispatch(handleSelectOperation(null));
  };
  return (
    <div
      className={`${mc.operationsContainer} container flex jc-space-between`}
    >
      <main className={`${mc.operations}`}>
        {envelope.map((env) => (
          <div key={env.id}>
            <div className={`flex ai-center`}>
              <span>
                <NavLink to={`http://localhost:3000/dashboard/envelopes/`}>
                  <img src={arrowBack} alt="icone d'une " />
                </NavLink>
              </span>
              <h2>{env.name}</h2>
            </div>

            {visible ? (
              <LineChart data={dataRadialBar} />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nom de l'opération</th>
                    <th>Date</th>
                    <th colSpan="2">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {operations.map((op) => {
                    return (
                      <tr
                        onClick={() =>
                          selectOperationOnClick(
                            op.id,
                            op.name,
                            op.amount,
                            op.date,
                            op.envelope_id
                          )
                        }
                        key={`${env.id}-${op.id}`}
                        className={
                          selectOperation === op.id ? mc.selected : null
                        }
                      >
                        <td>{op.name}</td>
                        <td>{op.date}</td>
                        <td>{op.amount}</td>
                        <td onClick={() => handleDelete(op.id)}>
                          <img src={deleteIcon} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </main>
      <Aside  operation={"operation"} />
    </div>
  );
};

export default Operation;

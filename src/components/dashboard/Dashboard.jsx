import React, { useEffect, useState } from "react";
import mc from "./dashboard.module.scss";
import Cards from "../cards/Cards";

import {
  TYPE_CHALLENGES,
  TYPE_EXPENSES,
  TYPE_SAVINGS,
} from "../../constants/constant.utils";
import { getEnvelopes } from "../../redux/reducers/envelope.slice";
import { useDispatch, useSelector } from "react-redux";
import MultipleLineCharts from "../multipleLineCharts/MultipleLineCharts";
import ColumnCharts from "../columnChart/ColumnCharts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { persistUser } = useSelector((store) => store.persistedReducer);
  const { savings, expenses, challenges } = useSelector(
    (store) => store.envelope
  );
  const [changeGraphics, setChangeGraphics] = useState(false);

  useEffect(() => {
    dispatch(getEnvelopes(persistUser.id));
  }, [dispatch, persistUser.id]);

  const handleTotalAmount = (type) => {
    let total = 0;
    type.forEach((t) => {
      total += t.amount;
    });
    return total;
  };

  const handleTotalAmountByMonth = (type) => {
    const monthlyTotals = {};
    type.forEach((t) => {
      t.operations.forEach((operation) => {
        const month = operation.date.substring(5, 7);
        if (monthlyTotals[month]) {
          monthlyTotals[month] += operation.amount;
        } else {
          monthlyTotals[month] = operation.amount;
        }
      });
    });

    const result = [];
    for (let i = 1; i <= 12; i++) {
      const month = i < 10 ? `0${i}` : `${i}`;
      result.push(monthlyTotals[month] || 0);
    }
    return result;
  };

  return (
    <main className={"container"}>
          <h1>Mon tableau de bord</h1>
          <section>
            <article className={` ${mc.dashboard}`}>
              <h2>Statistiques annuelles</h2>
              <div
                className={`${mc.dashboardStatsContainer} flex ai-center jc-space-between`}>
                <div
                  className={`flex flex-column jc-space-between ai-flex-start ${mc.dashboardStats}`}>
                  <h3>Statistiques par type</h3>
                  <div className={mc.dashboardStatsType}>
                    <p>Montant épargné : {`${handleTotalAmount(savings)} €`}</p>
                    <p>Dépenses : {`${handleTotalAmount(expenses)} €`}</p>
                    <p>
                      Montant des défis : {`${handleTotalAmount(challenges)} €`}
                    </p>
                  </div>
                    <button
                      className={mc.actionButton}
                      onClick={() => {
                        setChangeGraphics(!changeGraphics);
                      }}>
                      {changeGraphics ? "Graphique linéaire" : "Histogramme"}
                    </button>
                </div>
                <div className={mc.dashboardGraph}>
                  {changeGraphics ? (
                    <ColumnCharts
                      savings={handleTotalAmountByMonth(savings)}
                      expenses={handleTotalAmountByMonth(expenses)}
                      challenges={handleTotalAmountByMonth(challenges)}
                    />
                  ) : (
                    <MultipleLineCharts
                      savings={handleTotalAmountByMonth(savings)}
                      expenses={handleTotalAmountByMonth(expenses)}
                      challenges={handleTotalAmountByMonth(challenges)}
                    />
                  )}
                </div>
              </div>
            </article>

            <article className={`flex ai-center jc-center flex-wrap`}>
              <Cards name='Epargnes' type={TYPE_SAVINGS} />
              <Cards name='Dépenses' type={TYPE_EXPENSES} />
              <Cards name='Défis' type={TYPE_CHALLENGES} />
            </article>
          </section>
    </main>
  );
};

export default Dashboard;

import { Route, Routes } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import Header from "../components/header/Header";
import About from "../components/about/About";
import SignUp from "../components/signup/SignUp";
import Dashboard from "../components/dashboard/Dashboard";
import Account from "../components/account/Account";
import Envelope from "../components/envelope/Envelope";
import Operation from "../components/operations/Operation";
import {
  TYPE_SAVINGS,
  TYPE_CHALLENGES,
  TYPE_EXPENSES,
} from "../constants/constant.utils";
import { useSelector } from "react-redux";
import React  from 'react';

const App = () => {
  const { savings, challenges, expenses } = useSelector(
    (store) => store.envelope
  );
  return (
    <div>
      <Header />
      <Routes>
        <Route path="*" element={<Homepage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route
          path="/envelope/savings"
          element={<Envelope type={TYPE_SAVINGS} envelopesType={savings} />}
        />
        <Route
          path="/envelope/expenses"
          element={<Envelope type={TYPE_EXPENSES} envelopesType={expenses} />}
        />
        <Route
          path="/envelope/challenges"
          element={
            <Envelope type={TYPE_CHALLENGES} envelopesType={challenges} />
          }
        />
        <Route
          path="/operation/:id"
          element={<Operation type={TYPE_SAVINGS} envelopesType={savings} />}
        />
      </Routes>
    </div>
  );
};

export default App;

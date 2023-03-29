import {Route, Routes} from 'react-router-dom';
import Homepage from '../components/homepage/Homepage';
import Header from "../components/header/Header";
import About from "../components/about/About";
import SignUp from "../components/signup/SignUp";
import Dashboard from "../components/dashboard/Dashboard";
import Account from "../components/account/Account";

const App = () => {

    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="account" element={<Account/>} />
            </Routes>
        </div>
    );
};

export default App;
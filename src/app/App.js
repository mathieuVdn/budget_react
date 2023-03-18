import {Routes, Route} from 'react-router-dom';
import Homepage from '../components/homepage/Homepage';
import Header from "../components/header/Header";
import About from "../components/about/About";
const App = () => {

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="about" element={<About />}/>
            </Routes>
        </div>
    );
};

export default App;
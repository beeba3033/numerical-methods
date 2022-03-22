import React, {FunctionComponent} from 'react';
import logo from './logo.svg';
import './App.css';
import Service from "./service/service";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
function App() {
  return (
    <div className="App">
        <Service></Service>


        {/*<Router>*/}
        {/*    <Navbar />*/}
        {/*    <Routes>*/}
        {/*        <Route path='/Root-of-Equation' element={ <Rootofequation></Rootofequation>} />*/}
        {/*        <Route path='/cats' component={Cats} />*/}
        {/*        <Route path='/sheeps' component={Sheeps} />*/}
        {/*        <Route path='/goats' component={Goats} />*/}
        {/*    </Routes>*/}
        {/*</Router>*/}
    </div>
  );
}

export default App;

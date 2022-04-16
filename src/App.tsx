import React, {FunctionComponent, useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import BisectionMethod from "./methods/root_of_equation/bisection/bisection";
import NestedList from "./components/customlist/customlist";
import {PropsProblem, StateNumerical} from "./methods/methodsproperty";
import FalsePositionMethod from "./methods/root_of_equation/falseposition/falseposition";
import OnePointMethod from "./methods/root_of_equation/onepoint/onepoint";
import NewtonRaphsonMethod from "./methods/root_of_equation/newtonraphsonn/newtonraphson";
import SecantMethod from "./methods/root_of_equation/secant/secant";
import CramerRuleMethod from "./methods/linear_of_algebra/cramerrule/cramerrule";
import JacobiIterationMethod from "./methods/linear_of_algebra/jacobiIteration/jacobiIteration";
import GaussSeidelIterationMethod from "./methods/linear_of_algebra/gaussseideliteration/gaussseideliteration";
import ConjugateGradientMethod from "./methods/linear_of_algebra/conjugategradient/conjugategradient";


const   url:string = "https://my-json-server.typicode.com/beeba3033/-numerical-methods-server/db" ;
function App() {
    let [Problems,setProblem] = useState([]),
        State_of_Numerical:StateNumerical = {
            Epsilon:Math.pow(10,-6),
            Equation:"1/2-x",
            Error:0,
            Method:{
                RootEquation:{
                    Bisection:{ Xl:1.5 , Xr:2.00 },
                    FalsePosition:{ Xl:0.02 , Xr:0.03 },
                    OnePoint:{ X:0 , Xi:0.5 },
                    NewtonRaphson: {X:2.0},
                    Secant: {X:2,Xi:2.75}
                }
            },
            Problem:Problems
        } ;
    useEffect(()=>{
        fetch(
            url)
            .then((res) => res.json())
            .then((json) => {
                setProblem(json.NumericalMethod.Chapter);
            })
    },[]);
    return (
        <div className="App">
            <div className={"Service"}>
                <Router>
                    <NestedList></NestedList>
                    <Routes>
                        {/*<Route path={"/Service"} element={<Service/>}></Route>*/}
                        <Route path={"/Bisection"} element={<BisectionMethod StateNumerical={State_of_Numerical}/>}></Route>
                        <Route path={"/FalsePosition"} element={<FalsePositionMethod StateNumerical={State_of_Numerical}/>}></Route>
                        <Route path={"/OnePoint"} element={<OnePointMethod StateNumerical={State_of_Numerical}/>}></Route>
                        <Route path={"/NewtonRaphson"} element={<NewtonRaphsonMethod StateNumerical={State_of_Numerical}/>}></Route>
                        <Route path={"/Secant"} element={<SecantMethod StateNumerical={State_of_Numerical}/>}></Route>
                        <Route path={"/CramerRule"} element={<CramerRuleMethod StateNumerical={State_of_Numerical}/>}></Route>
                        <Route path={"/JacobiIteration"} element={<JacobiIterationMethod StateNumerical={State_of_Numerical}/>}></Route>
                        <Route path={"/GaussSeidelIteration"} element={<GaussSeidelIterationMethod StateNumerical={State_of_Numerical}/>}></Route>
                        <Route path={"/ConjugateGradient"} element={<ConjugateGradientMethod StateNumerical={State_of_Numerical}/>}></Route>
                    </Routes>
                </Router>
            </div>
        </div>
  );
}

export default App;

import React, {FunctionComponent, useEffect, useState} from 'react';
import './App.css';
import Service from "./service/service";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import BisectionMethod from "./methods/root_of_equation/bisection/bisection";
import NestedList from "./components/customlist/customlist";
import FalsePositionMethod from "./methods/root_of_equation/falseposition/falseposition";
import {Methods} from "./service/serviceproperty";

const   epsilon:number = Math.pow(10,-6) ,
        equation:string = "x",
        error:number = 0 ,
        methods:Methods = {
            RootEquation:{
                Bisection:{ Xl:1.75 , Xr:2.00 },
                FalsePosition:{ Xl:0.02 , Xr:0.03 },
                OnePoint:{ X:0 , Xi:0.5 }
            }
        } ;
const   url:string = "https://my-json-server.typicode.com/beeba3033/-numerical-methods-server/equation" ;
function App() {
    useEffect(() => {
        fetch(
            url)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
            })
    },[]);
    return (
        <div className="App">
            <div className={"Service"}>
                <Router>
                    <NestedList></NestedList>
                    <Routes>
                        <Route path={"/Service"} element={<Service/>}></Route>
                        <Route path={"/Bisection"} element={<BisectionMethod Epsilon={epsilon} Equation={equation} Error={error} Method={methods} Url={url}/>}></Route>
                        <Route path={"/FalsePosition"} element={<FalsePositionMethod Epsilon={epsilon} Equation={equation} Error={error} Method={methods} Url={url}/>}></Route>
                    </Routes>
                </Router>
            </div>
        </div>
  );
}

export default App;

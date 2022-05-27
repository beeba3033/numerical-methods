import React, {FunctionComponent, useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter , Routes , Route } from "react-router-dom";
import BisectionMethod from "./methods/root_of_equation/bisection/bisection";
import NestedList from "./components/customlist/customlist";
import {KeyAPI, PropsProblem, StateNumerical} from "./methods/methodsproperty";
import FalsePositionMethod from "./methods/root_of_equation/falseposition/falseposition";
import OnePointMethod from "./methods/root_of_equation/onepoint/onepoint";
import NewtonRaphsonMethod from "./methods/root_of_equation/newtonraphsonn/newtonraphson";
import SecantMethod from "./methods/root_of_equation/secant/secant";
import CramerRuleMethod from "./methods/linear_of_algebra/cramerrule/cramerrule";
import JacobiIterationMethod from "./methods/linear_of_algebra/jacobiIteration/jacobiIteration";
import GaussSeidelIterationMethod from "./methods/linear_of_algebra/gaussseideliteration/gaussseideliteration";
import ConjugateGradientMethod from "./methods/linear_of_algebra/conjugategradient/conjugategradient";
import GaussEliminationMethod from "./methods/linear_of_algebra/gausselimination/gausselimination";
import GaussJordanMethod from "./methods/linear_of_algebra/gaussjordan/gaussjordan";
import LUDecompositionMethod from "./methods/linear_of_algebra/ludecomposition/ludecomposition";
import axios from "axios";


// const   url:string = "https://my-json-server.typicode.com/beeba3033/numerical-methods-server/db" ;

function App() {
    let path:string = JSON.stringify(process.env.REACT_APP_PATH),
        login:string = JSON.stringify(process.env.REACT_APP_LOGIN),
        key:string = JSON.stringify(process.env.REACT_APP_KEY),
        regex = /"/g;
    let email:string = JSON.stringify(process.env.REACT_APP_EMAIL),
        password:string = JSON.stringify(process.env.REACT_APP_PASSWORD);
    let pathRegex:string = path.replace(regex,''),
        keyRegex:string = key.replace(regex,''),
        loginRegex:string = login.replace(regex,''),
        emailRegex:string = email.replace(regex,''),
        passwordRegex:string = password.replace(regex,'');
    let [Problems,setProblem] = useState([]),
        State_of_Numerical:StateNumerical = {
            Epsilon:Math.pow(10,-6),
            Equation:"x",
            Error:0,
            Matrix:{
                Component:{
                    Selected:{
                        MatrixA:"0",
                        MatrixB:"0",
                    },
                    Choose:"problems"
                },
                Size:{
                    Row:0,
                    Column:0,
                    Default:0
                },
                Data:{
                    MatrixA:[[1,2],[3,4]],
                    MatrixB:[[5,6],[7,8]]
                }
            },
            Method:{
                RootEquation:{
                    Bisection:{ Xl:1.5 , Xr:2.00 },
                    FalsePosition:{ Xl:0.02 , Xr:0.03 },
                    OnePoint:{ X:0 , Xi:0.5 },
                    NewtonRaphson: {X:2.0},
                    Secant: {X:2,Xi:2.75}
                },
                LinearAlgebra:{
                    CramerRule:{MatrixA:[[-2,3,1], [3,4,-5], [1,-2,1]],MatrixB:[[9], [0], [-4]]},
                    GaussElimination:{MatrixA:[[-2,3,1], [3,4,-5], [1,-2,1]],MatrixB:[[9], [0], [-4]]},
                    GaussJordan:{MatrixA:[[-2,3,1], [3,4,-5], [1,-2,1]],MatrixB:[[9], [0], [-4]]},
                    Jacobi:{MatrixA:[[-2,3,1], [3,4,-5], [1,-2,1]],MatrixB:[[9], [0], [-4]]},
                    GaussSeidel:{MatrixA:[[-2,3,1], [3,4,-5], [1,-2,1]],MatrixB:[[9], [0], [-4]]},
                    ConjugateGradient:{MatrixA:[[-2,3,1], [3,4,-5], [1,-2,1]],MatrixB:[[9], [0], [-4]]}
                }
            },
            Problem:Problems,
            Url:pathRegex,
            Token:keyRegex,
        } ;
    let dataKey:KeyAPI = {
        email:emailRegex,
        password:passwordRegex,
        pathLogin:loginRegex,
        regex:regex
    }
    useEffect( ()=>{
        // try {
        //     axios.post(loginRegex, {
        //         "email": emailRegex,
        //         "password": passwordRegex
        //     })
        //         .then(res => {
        //             State_of_Numerical.Token = res.data.accessToken.replace(regex,'')
        //         })
        // }
        // catch (error){}
    },[]);
    return (
        <div className="App">
            <div className={"Service"}>
                {/*<Router>*/}
                    <NestedList></NestedList>
                    <Routes>
                        {/*<Route path={"/Service"} element={<Service/>}></Route>*/}
                        <Route path={"/Bisection"} element={<BisectionMethod StateNumerical={State_of_Numerical} Login={dataKey}/>}></Route>
                        <Route path={"/FalsePosition"} element={<FalsePositionMethod StateNumerical={State_of_Numerical} Login={dataKey}/>}></Route>
                        <Route path={"/OnePoint"} element={<OnePointMethod StateNumerical={State_of_Numerical} Login={dataKey}/>}></Route>
                        <Route path={"/NewtonRaphson"} element={<NewtonRaphsonMethod StateNumerical={State_of_Numerical} Login={dataKey}/>}></Route>
                        <Route path={"/Secant"} element={<SecantMethod StateNumerical={State_of_Numerical} Login={dataKey}/>}></Route>
                        <Route path={"/CramerRule"} element={<CramerRuleMethod StateNumerical={State_of_Numerical} Login={dataKey}/>}></Route>
                        <Route path={"/GaussElimination"} element={<GaussEliminationMethod StateNumerical={State_of_Numerical} Login={dataKey}/>}></Route>
                        <Route path={"/GaussJordan"} element={<GaussJordanMethod StateNumerical={State_of_Numerical} Login={dataKey}/>}></Route>
                        <Route path={"/JacobiIteration"} element={<JacobiIterationMethod StateNumerical={State_of_Numerical} Login={dataKey}/>}></Route>
                        <Route path={"/GaussSeidelIteration"} element={<GaussSeidelIterationMethod StateNumerical={State_of_Numerical} Login={dataKey}/>}></Route>
                        <Route path={"/ConjugateGradient"} element={<ConjugateGradientMethod StateNumerical={State_of_Numerical} Login={dataKey}/>}></Route>
                        <Route path={"/LUDecomposition"} element={<LUDecompositionMethod StateNumerical={State_of_Numerical} Login={dataKey}/>}></Route>

                    </Routes>
                {/*</Router>*/}
            </div>
        </div>
  );
}

export default App;

import React, {FunctionComponent} from 'react';
import './App.css';
import Service from "./service/service";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import BisectionMethod from "./methods/root_of_equation/bisection/bisection";
import NestedList from "./components/customlist/customlist";
import FalsePositionMethod from "./methods/root_of_equation/falseposition/falseposition";
function App() {
  return (
    <div className="App">
        <div className={"Service"}>
            <Router>
                <NestedList></NestedList>
                <Routes>
                    <Route path={"/Service"} element={<Service/>}></Route>
                    <Route path={"/Bisection"} element={
                        <BisectionMethod
                            Epsilon={Math.pow(10,-6)}
                            Equation={"x"}
                            Error={0}
                            Method={
                                {
                                    RootEquation:{
                                        Bisection:{ Xl:1.75 , Xr:2.00 },
                                        FalsePosition:{ Xl:0.02 , Xr:0.03 },
                                        OnePoint:{ X:0 , Xi:0.5 }
                                    }
                                }
                            }
                        />
                    }>
                    </Route>
                    <Route path={"/FalsePosition"} element={
                        <FalsePositionMethod
                            Epsilon={Math.pow(10,-6)}
                            Equation={"43*x-1"}
                            Error={0}
                            Method={
                                {
                                    RootEquation:{
                                        Bisection:{ Xl:1.555 , Xr:2.00 },
                                        FalsePosition:{ Xl:0.02 , Xr:0.03 },
                                        OnePoint:{ X:0 , Xi:0.5 }
                                    }
                                }
                            }
                        />
                    }>
                    </Route>
                        {/*<Route path={"/FalsePosition"} ></Route>*/}
                </Routes>
            </Router>
        </div>

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

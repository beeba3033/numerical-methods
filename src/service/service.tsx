import React, {ChangeEvent, Component, FormEvent, FunctionComponent} from "react";
import {Bisection, FalsePosition, OnePoint, Property} from "./serviceproperty";
import {DesmosChart} from "../components/desmoschart/desmoschart";
import {ApexChart} from "../components/apexchart/apexchart";
import {Method} from "@testing-library/react";
import BisectionMethod from "../methods/root_of_equation/bisection/bisection";

class Service extends Component<any,Property> {
    constructor(props?:any) {
        super(props);
        this.state = {
            Epsilon:Math.pow(10,-6),
            Equation:"2-e^x",
            Error:0,
            Method:{
                RootEquation:{
                    Bisection:{ Xl:1.75 , Xr:2.00 },
                    FalsePosition:{ Xl:0.02 , Xr:0.03 },
                    OnePoint:{ X:0 , Xi:0.5 }
                }
            },
            ApexChart:{Series:[],Categories:[]}
        }
    }
    render() {
        return(
            <div>
                <BisectionMethod
                    Epsilon={this.state.Epsilon}
                    Equation={this.state.Equation}
                    Error={this.state.Error}
                    Method={this.state.Method}
                />
            </div>
        );
    }
};
export default Service ;
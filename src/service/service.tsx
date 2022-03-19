import {Component, useEffect} from "react";
import {Property} from "./propertyService";
import OnepointMethod from "../methods/root_of_equation/onepoint";
import FalsePositionMethod from "../methods/root_of_equation/falseposition";
import {DesmosChart} from "../components/desmoschart";
import {ApexChart} from "../components/apexchart";


class Service extends Component<any,Property> {
    constructor(props?:any) {
        super(props);
        this.state = {
            Epsilon:Math.pow(10,-6),
            Equation:"2-e^x",
            Error:0,
            Method:{Bisection:{Xl:7,Xr:9},FalsePosition:{Xl:5,Xr:8},OnePoint:{X:0,Xi:0}}
        }
        // let onepoint = new OnepointMethod(),
        //     falseposition = new FalsePositionMethod();
        // console.log(onepoint.calculate(0,this.state.Error,this.state.Epsilon,this.state.Equation));
    }
    componentDidMount() {

        return(
            <div>
                <div>
                </div>
                <div>
                    <h1>Hello</h1>
                </div>
            </div>
        );
    }
    render() {

        return(
            <div>
                <h1>Service</h1>
                <DesmosChart Equation={"x-4"}></DesmosChart>
                <ApexChart></ApexChart>
            </div>
        );
    }
};
export default Service ;
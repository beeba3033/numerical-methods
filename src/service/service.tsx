import React, {ChangeEvent, Component, FormEvent, FunctionComponent} from "react";
import {Bisection, FalsePosition, OnePoint, Property} from "./serviceproperty";
import {DesmosChart} from "../components/desmoschart/desmoschart";
import {ApexChart} from "../components/apexchart/apexchart";
import {Method} from "@testing-library/react";
import BisectionMethod from "../methods/root_of_equation/bisection/bisection";
import {Link} from "react-router-dom";



import {
    Container,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    ThemeProvider
} from "@mui/material";
import "./service.css"
import ListRouter from "../components/customlist/customlist";
import App from "../App";

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
            ApexChart:{Series:[],Categories:[]},
            Data:[{}]
        }
    }
    render() {
        return(
            <Container>
                <div className={"Body-Field"}>
                    <div className={"List-Field"}>
                        {/*<ListItemButton component="a" href="/Bisection">*/}
                        {/*    <ListItemText primary="Spam" />*/}
                        {/*</ListItemButton>*/}
                        <h1>hello</h1>
                        {/*<Link to={"/Bisection"}>Bisection</Link>*/}
                        {/*<Link to={"/"}>F</Link>*/}
                    </div>
                    {/*<div>*/}
                    {/*    <BisectionMethod*/}
                    {/*        Epsilon={this.state.Epsilon}*/}
                    {/*        Equation={this.state.Equation}*/}
                    {/*        Error={this.state.Error}*/}
                    {/*        Method={this.state.Method}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>

                    {/*<Routes>*/}
                    {/*    <Route path='/Bisection' element={*/}
                    {/*                <BisectionMethod*/}
                    {/*                    Epsilon={this.state.Epsilon}*/}
                    {/*                    Equation={this.state.Equation}*/}
                    {/*                    Error={this.state.Error}*/}
                    {/*                    Method={this.state.Method}*/}
                    {/*                />*/}
                    {/*        }*/}
                    {/*    />*/}
                        {/*<Route path='/cats' component={Cats} />*/}
                        {/*<Route path='/sheeps' component={Sheeps} />*/}
                        {/*<Route path='/goats' component={Goats} />*/}
                    {/*</Routes>*/}
            </Container>

        );
    }
};
export default Service ;
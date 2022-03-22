import React, {ChangeEvent, FormEvent, FunctionComponent} from "react";
import RootEquation from "../rootofequation";
import {PropsCustom} from "../../../service/serviceproperty";
import "./bisection.css";
import {DesmosChart} from "../../../components/desmoschart/desmoschart";
import {ApexChart} from "../../../components/apexchart/apexchart";
import {
    Button,
    Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField
} from "@mui/material";

export default class BisectionMethod extends RootEquation {
    constructor(props:PropsCustom) {
        super(props);
        this.state = {
            Epsilon: props.Epsilon,
            Equation: props.Equation,
            Error: props.Error,
            Method: props.Method,
            ApexChart: {Series: [], Categories: []},
        };
        this.xlChange = this.xlChange.bind(this);
        this.xrChange = this.xrChange.bind(this);
        this.equationChange = this.equationChange.bind(this);
        this.epsilonChange = this.epsilonChange.bind(this);
        this. handleSubmit = this. handleSubmit.bind(this);

    }
    calculateXm(xl:number,xr:number):number {
        return (xl+xr)/2;
    }
    calculate(xl:number,xr:number,error:number,epsilon:number,equation:string) : object {
        let xm: number = this.calculateXm(xl, xr),
            listXl: Array<number> = [] ,
            listXr: Array<number> = [] ,
            listXm: Array<number> = [] ,
            listError: Array<number> = [] ;

        //First time
        error = (this.function(xl, equation) * this.function(xr, equation)) ? this.error(xm, xl) : this.error(xm, xr);
        //Get Data
        listXl.push(JSON.parse(xl.toFixed(6)));
        listXr.push(JSON.parse(xr.toFixed(6)));
        listXm.push(JSON.parse(xm.toFixed(6)));
        listError.push(JSON.parse(error.toFixed(6)));

        //Begin iteration
        while (error > epsilon && listError.length < 100) {
            xm = this.calculateXm(xl, xr);
            if ((this.function(xl, equation) * this.function(xr, equation)) < 0) {
                error = this.error(xm, xl);
                xl = xm;
            }
            else {
                error = this.error(xm, xr);
                xr = xm;
            }
            //Get Data
            listXl.push(JSON.parse(xl.toFixed(6)));
            listXr.push(JSON.parse(xr.toFixed(6)));
            listXm.push(JSON.parse(xm.toFixed(6)));
            listError.push(JSON.parse(error.toFixed(6)));
        }
        // Result
        return (
            {
                listXl:listXl,
                listXr:listXr,
                listXm:listXm,
                listError:listError,
                Epsilon:epsilon,
                Equation:equation
            }
        );
    }
    xlChange(event:ChangeEvent<HTMLInputElement>){
        this.props.Method.RootEquation.Bisection.Xl = JSON.parse(event.target.value) ;
        this.setState({Method: this.props.Method});
    }
    xrChange(event:ChangeEvent<HTMLInputElement>){
        this.props.Method.RootEquation.Bisection.Xr = JSON.parse(event.target.value) ;
        this.setState({Method: this.props.Method});
    }
    equationChange(event:ChangeEvent<HTMLInputElement>){
        this.setState({Equation:event.target.value});
        // console.log(this.props.Equation)
    }
    epsilonChange(event:ChangeEvent<HTMLInputElement>){
        this.setState({Epsilon:JSON.parse(event.target.value)});
    }
    handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let Result:any = this.calculate(
            this.state.Method.RootEquation.Bisection.Xl,
            this.state.Method.RootEquation.Bisection.Xr,
            this.state.Error,
            0.0001,
            this.state.Equation
        );
        let row:Array<DataBisection> = []
        for(let i:number = 0 ; i<Result.listError.length ; ++i){
            row.push({
                Xl:Result.listXl[i],
                Xr:Result.listXr[i],
                Xm:Result.listXm[i],
                Fxl:this.function(Result.listXl[i],this.state.Equation),
                Fxr:this.function(Result.listXr[i],this.state.Equation),
                Fxm:this.function(Result.listXm[i],this.state.Equation),
                Error:Result.listError[i]
            });
        }
        this.setState({
            ApexChart: {
                Series: [
                    {name: "Xl", data: Result.listXl},
                    {name: "Xr", data: Result.listXr},
                    {name: "Xm", data: Result.listXm},
                    {name: "Error", data: Result.listError}
                ],
                Categories: Result.listError.count
            }
        });
    }
    render() {
        return (
            <Container fixed>
                <div>
                    <h1>Bisection</h1>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className={"Input-Field"}>
                        <TextField id="outlined-required" label="Equation" variant="outlined" type={"text"} onChange={this.equationChange} />
                        <TextField id="outlined-number" label="Xl" variant="outlined" type={"number"} inputProps={{step:Math.pow(10,-6)}} onChange={this.xlChange}/>
                        <TextField id="outlined-number" label="Xr" variant="outlined" type={"number"} inputProps={{step:Math.pow(10,-6)}} onChange={this.xrChange}/>
                        <TextField id="outlined-number" label="Epsilon" variant="outlined" type={"number"} inputProps={{step:Math.pow(10,-6)}} onChange={this.epsilonChange}/>
                    </div>
                    <div className={"Submit-Field"}>
                        <Button variant="contained" type={"submit"}>Calculate</Button>
                        {/*<Button variant="contained" disabled>Calculate</Button>*/}
                    </div>
                </form>
                <div className={"Table-Field"}>

                </div>
                <div className={"Chart-Field"}>
                    <DesmosChart Equation={this.state.Equation}></DesmosChart>
                    <ApexChart Series={this.state.ApexChart.Series} Categories={this.state.ApexChart.Categories}></ApexChart>
                </div>
            </Container>
        );
    }
};
interface DataBisection{
  Xl:number;
  Xr:number;
  Xm:number;
  Fxl:number;
  Fxr:number;
  Fxm:number;
  Error:number;
};
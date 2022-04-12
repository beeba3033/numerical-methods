import React, {ChangeEvent, FormEvent, FunctionComponent} from "react";
import RootEquation from "../rootofequation";
import {DataTable, PropsCustom} from "../../../service/serviceproperty";
import "./bisection.css";
import {DesmosChart} from "../../../components/desmoschart/desmoschart";
import {ApexChart} from "../../../components/apexchart/apexchart";
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
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
            Data:[{}]
        };
        this.xlChange = this.xlChange.bind(this);
        this.xrChange = this.xrChange.bind(this);
        this.equationChange = this.equationChange.bind(this);
        this.epsilonChange = this.epsilonChange.bind(this);
        this. handleSubmit = this.handleSubmit.bind(this);
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
        error = ( (this.function(xl, equation) * this.function(xr, equation)) < 0 ) ? this.error(xm, xl) : this.error(xm, xr);
        //Get Data
        this.listResult(listXl,xl);
        this.listResult(listXr,xr);
        this.listResult(listXm,xm);
        this.listResult(listError,error);

        //Begin iteration
        while (error > epsilon && error != Infinity && listError.length < 100) {
            xm = this.calculateXm(xl, xr);
            if ( (this.function(xl, equation) * this.function(xr, equation)) < 0 ) {
                error = this.error(xm, xl);
                xl = xm;
            }
            else {
                error = this.error(xm, xr);
                xr = xm;
            }
            //Get Data
            this.listResult(listXl,xl);
            this.listResult(listXr,xr);
            this.listResult(listXm,xm);
            this.listResult(listError,error);
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

        //call function for calculate this method
        let Result:any = this.calculate(
            this.state.Method.RootEquation.Bisection.Xl,
            this.state.Method.RootEquation.Bisection.Xr,
            this.state.Error,
            this.state.Epsilon,
            this.state.Equation
        );

        //push row on data table
        let row:Array<DataTable> = [];
        for(let i:number = 0 ; i<Result.listError.length ; ++i){
            row.push({
                X1:Result.listXl[i],
                X2:Result.listXr[i],
                X3:Result.listXm[i],
                Fx1:JSON.parse(this.function(Result.listXl[i],this.state.Equation).toFixed(6)),
                Fx2:JSON.parse(this.function(Result.listXr[i],this.state.Equation).toFixed(6)),
                Fx3:JSON.parse(this.function(Result.listXm[i],this.state.Equation).toFixed(6)),
                Error:Result.listError[i]
            });
        }

        //set state to chart and table
        this.setState({
            Data:row,
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
                <div className={"Chart-Field"}>
                    <DesmosChart Equation={this.state.Equation}></DesmosChart>
                    <ApexChart Series={this.state.ApexChart.Series} Categories={this.state.ApexChart.Categories}></ApexChart>
                </div>
                <div className={"Table-Field"}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Iteration</TableCell>
                                    <TableCell align="center">Xl</TableCell>
                                    <TableCell align="center">Xr</TableCell>
                                    <TableCell align="center">Xm</TableCell>
                                    <TableCell align="center">F(Xl)</TableCell>
                                    <TableCell align="center">F(Xr)</TableCell>
                                    <TableCell align="center">F(Xm)</TableCell>
                                    <TableCell align="center">Error</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.Data.map((row,index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{index}</TableCell>
                                        <TableCell align="left">{row.X1}</TableCell>
                                        <TableCell align="left">{row.X2}</TableCell>
                                        <TableCell align="left">{row.X3}</TableCell>
                                        <TableCell align="left">{row.Fx1}</TableCell>
                                        <TableCell align="left">{row.Fx2}</TableCell>
                                        <TableCell align="left">{row.Fx3}</TableCell>
                                        <TableCell align="left">{row.Error}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
        );
    }
};
import RootEquation from "../rootofequation";
import {
    Button,
    Container,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import React, {ChangeEvent, FormEvent} from "react";
import {DataTable, PropsCustom} from "../../../service/serviceproperty";
import {DesmosChart} from "../../../components/desmoschart/desmoschart";
import {ApexChart} from "../../../components/apexchart/apexchart";

export default class FalsePositionMethod extends RootEquation{
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    calculateX1(xl:number,xr:number,equation:string) : number{
        return (
            ( (xl*this.function(xr,equation)) - (xr*this.function(xl,equation)) )
            /
            (this.function(xr,equation)-this.function(xl,equation))
        ) ;
    }
    calculate(xl:number,xr:number,error:number,epsilon:number,equation:string) : object {
        let xm: number = this.calculateX1( xl, xr, equation),
            listXl: Array<number> = [] ,
            listXr: Array<number> = [] ,
            listXm: Array<number> = [] ,
            listError: Array<number> = [] ;
        //first time
        error = (this.function(xl, equation) * this.function(xr, equation)) ? this.error(xm, xl) : this.error(xm, xr);
        //Get Data
        listXl.push(JSON.parse(xl.toFixed(6)));
        listXr.push(JSON.parse(xr.toFixed(6)));
        listXm.push(JSON.parse(xm.toFixed(6)));
        listError.push(JSON.parse(error.toFixed(6)));

        //begin iteration
        while (error > epsilon && listError.length < 100) {
            xm = (this.calculateX1(xl, xr,equation));
            if ((this.function(xl, equation) * this.function(xr, equation)) < 0) {
                error =this.error(xm, xl);
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
                listX1:listXm,
                listError:listError,
                Epsilon:epsilon,
                Equation:equation
            }
        );
    }
    xlChange(event:ChangeEvent<HTMLInputElement>){
        this.props.Method.RootEquation.FalsePosition.Xl = JSON.parse(event.target.value) ;
        this.setState({Method: this.props.Method});
    }
    xrChange(event:ChangeEvent<HTMLInputElement>){
        this.props.Method.RootEquation.FalsePosition.Xr = JSON.parse(event.target.value) ;
        this.setState({Method: this.props.Method});
    }
    equationChange(event:ChangeEvent<HTMLInputElement>){
        this.setState({Equation:event.target.value});
    }
    epsilonChange(event:ChangeEvent<HTMLInputElement>){
        this.setState({Epsilon:JSON.parse(event.target.value)});
    }
    handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let Result:any = this.calculate(
            this.state.Method.RootEquation.FalsePosition.Xl,
            this.state.Method.RootEquation.FalsePosition.Xr,
            this.state.Error,
            this.state.Epsilon,
            this.state.Equation
        );
        let row:Array<DataTable> = [] ;
        for(let i:number = 0 ; i<Result.listError.length ; ++i){
            row.push({
                FalsePosition:{
                    Xl:Result.listXl[i],
                    Xr:Result.listXr[i],
                    X1:Result.listX1[i],
                    Fxl:JSON.parse(this.function(Result.listXl[i],this.state.Equation).toFixed(6)),
                    Fxr:JSON.parse(this.function(Result.listXr[i],this.state.Equation).toFixed(6)),
                    Fx1:JSON.parse(this.function(Result.listX1[i],this.state.Equation).toFixed(6)),
                    Error:Result.listError[i]
                }
            });
            this.setState({
                Data:row
            })
        }
        this.setState({
            ApexChart: {
                Series: [
                    {name: "Xl", data: Result.listXl},
                    {name: "Xr", data: Result.listXr},
                    {name: "X1", data: Result.listX1},
                    {name: "Error", data: Result.listError}
                ],
                Categories: Result.listError.count
            }
        });
    }
    render() {
        return(
            <Container fixed>
                <div>
                    <h1>False Position</h1>
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
                                    <TableCell align="center">X1</TableCell>
                                    <TableCell align="center">F(Xl)</TableCell>
                                    <TableCell align="center">F(Xr)</TableCell>
                                    <TableCell align="center">F(X1)</TableCell>
                                    <TableCell align="center">Error</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.Data.map((row,index) => (
                                    <TableRow
                                        // key={row.FalsePosition?.Error}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{index}</TableCell>
                                        <TableCell align="left">{row.FalsePosition?.Xl}</TableCell>
                                        <TableCell align="left">{row.FalsePosition?.Xr}</TableCell>
                                        <TableCell align="left">{row.FalsePosition?.X1}</TableCell>
                                        <TableCell align="left">{row.FalsePosition?.Fxl}</TableCell>
                                        <TableCell align="left">{row.FalsePosition?.Fxr}</TableCell>
                                        <TableCell align="left">{row.FalsePosition?.Fx1}</TableCell>
                                        <TableCell align="left">{row.FalsePosition?.Error}</TableCell>
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
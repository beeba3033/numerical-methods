import React, {ChangeEvent, createRef, FormEvent, FunctionComponent, useRef} from "react";
import RootEquation from "../rootofequation";
import "./bisection.css";
import {
    Autocomplete,
    Button,
    Container, FormControl, InputLabel, MenuItem,
    Paper, Select, SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {PropsMethod, PropsProblem, PropsReportTable} from "../../methodsproperty";
import axios from 'axios'
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default class BisectionMethod extends RootEquation {
    constructor(Property:PropsMethod) {
        super(Property);
        this.state = {
            ApexChart: { Series:[] , Categories:[] } ,
            StateNumerical:Property.StateNumerical ,
            ReportTable:[]
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
        error = ( (this.function(xm, equation) * this.function(xr, equation)) < 0 ) ? this.error(xm, xl) : this.error(xm, xr);

        //Begin iteration
        while (error > epsilon && error != Infinity && listError.length < 100) {
            xm = this.calculateXm(xl, xr);

            //Get Data
            this.listResult(listXl,xl);
            this.listResult(listXr,xr);
            this.listResult(listXm,xm);

            if ( (this.function(xm, equation) * this.function(xr, equation)) < 0 ) {
                error = this.error(xm, xl);
                xl = xm;
            }
            else {
                error = this.error(xm, xr);
                xr = xm;
            }
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
        try {
            this.props.StateNumerical.Method.RootEquation.Bisection.Xl = JSON.parse(event.target.value) ;
            this.setState({ StateNumerical:this.props.StateNumerical });
        }
        catch (error){}
    }
    xrChange(event:ChangeEvent<HTMLInputElement>){
        try {
            this.props.StateNumerical.Method.RootEquation.Bisection.Xr = JSON.parse(event.target.value) ;
            this.setState({ StateNumerical:this.props.StateNumerical });
        }
        catch (error){}
    }
    equationChange(event:any,value:string){
        try {
            this.props.StateNumerical.Equation = value;
            this.setState({ StateNumerical:this.props.StateNumerical });
            // console.clear();
        }
        catch (error){}
    }
    epsilonChange(event:ChangeEvent<HTMLInputElement>){
        try{
            this.props.StateNumerical.Epsilon = JSON.parse(event.target.value);
            this.setState( {StateNumerical:this.props.StateNumerical} );
        }
        catch (error){}
    }
    handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();

        //call function for calculate this method
        let Result:any = this.calculate(
            this.state.StateNumerical.Method.RootEquation.Bisection.Xl,
            this.state.StateNumerical.Method.RootEquation.Bisection.Xr,
            this.state.StateNumerical.Error,
            this.state.StateNumerical.Epsilon,
            this.state.StateNumerical.Equation
        );

        //push row on data table
        let row:Array<PropsReportTable> = [];
        for(let i:number = 0 ; i<Result.listError.length ; ++i){
            row.push({
                X1:Result.listXl[i],
                X2:Result.listXr[i],
                X3:Result.listXm[i],
                Error:Result.listError[i]
            });
        }
        let reChart = [];
        for(let i=0 ;i<Result.listError.length;i++){
            reChart.push({
                Xl:Result.listXl[i],
                Xr:Result.listXr[i],
                Xm:Result.listXm[i],
                Error:Result.listError[i]
            })
        }
        //set state to chart and table
        this.setState({
            ReportTable:row,
            ApexChart: {
                Series: reChart,
                Categories: [
                    {name: "Xl", data: Result.listXl},
                    {name: "Xr", data: Result.listXr},
                    {name: "Xm", data: Result.listXm},
                    {name: "Error", data: Result.listError}
                ]
            }
        });
    }
    async componentDidMount() {
        const api = this.props.StateNumerical.Url;
        const regex = /"/g;
        await axios.post(this.props.Login.pathLogin, {
            "email": this.props.Login.email,
            "password": this.props.Login.password
        })
            .then(async res => {
                await axios.get(api, { headers: {"Authorization" : `Bearer ${res.data.accessToken.replace(regex,'')}`} })
                    .then(async res => {
                        this.props.StateNumerical.Problem = await res.data.Chapter[0].Bisection;
                        await this.setState({StateNumerical:this.props.StateNumerical})
                    })
            })
            // .then(res => {
            //     console.log(res);
            //     this.props.StateNumerical.Problem = res.data.Chapter[0].Bisection;
            //     this.setState({StateNumerical:this.props.StateNumerical})
            // });
        // fetch(
        //     this.Url)
        //     .then((res) => res.json())
        //     .then((json) => {
        //         console.log(json);
        //         this.props.StateNumerical.Problem = json.Chapter[0].Bisection;
        //         this.setState({StateNumerical:this.props.StateNumerical})
        //     })
    }
    componentWillUnmount() {

    }

    render() {
        const options:any= this.state.StateNumerical.Problem;
        // console.log(this.state.StateNumerical.Problem);
        return (
            <Container fixed>
                <div>
                    <h1>Bisection</h1>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className={"Input-Field"}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            getOptionLabel={(option)=>option.Equation}
                            value={{
                                Equation:this.state.StateNumerical.Equation
                            }}
                            onInputChange={this.equationChange}
                            renderInput={(params) => <TextField {...params} label="Equation" />}
                        />
                        <TextField id="outlined-number" label="Xl" variant="outlined" type={"number"} inputProps={{step:Math.pow(10,-6)}} onChange={this.xlChange} defaultValue={this.state.StateNumerical.Method.RootEquation.Bisection.Xl}/>
                        <TextField id="outlined-number" label="Xr" variant="outlined" type={"number"} inputProps={{step:Math.pow(10,-6)}} onChange={this.xrChange} defaultValue={this.state.StateNumerical.Method.RootEquation.Bisection.Xr}/>
                        <TextField id="outlined-number" label="Epsilon" variant="outlined" type={"number"} inputProps={{step:Math.pow(10,-6)}} onChange={this.epsilonChange} defaultValue={this.state.StateNumerical.Epsilon}/>
                    </div>
                    <div className={"Submit-Field"}>
                        <Button variant="contained" type={"submit"} disabled={this.state.StateNumerical.Equation == ""}>Calculate</Button>
                        {/*<Button variant="contained" disabled>Calculate</Button>*/}
                    </div>
                </form>
                <div className={"Chart-Field"}>
                    {/*<DesmosChart Equation={this.state.StateNumerical.Equation}></DesmosChart>*/}
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={this.state.ApexChart.Series}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Xl" stroke="#8884d8"/>
                            <Line type="monotone" dataKey="Xr" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="Xm" stroke="#8884d8"/>
                            <Line type="monotone" dataKey="Error" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                    {/*<ApexChart Series={this.state.ApexChart.Series} Categories={this.state.ApexChart.Categories}></ApexChart>*/}
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
                                    <TableCell align="center">Error</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.ReportTable.map((row,index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{index}</TableCell>
                                        <TableCell align="center">{row.X1}</TableCell>
                                        <TableCell align="center">{row.X2}</TableCell>
                                        <TableCell align="center">{row.X3}</TableCell>
                                        <TableCell align="center">{row.Error}</TableCell>
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
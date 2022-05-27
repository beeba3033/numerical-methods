import RootEquation from "../rootofequation";
import {
    Autocomplete,
    Button, Container,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import React, {ChangeEvent, FormEvent} from "react";
import {PropsMethod, PropsReportTable} from "../../methodsproperty";
import axios from "axios";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default class OnePointMethod extends RootEquation {
    constructor(Property:PropsMethod) {
        super(Property);
        this.state = {
            ApexChart: { Series:[] , Categories:[] } ,
            StateNumerical:Property.StateNumerical ,
            ReportTable:[]
        };
        this.xChange = this.xChange.bind(this);
        this.equationChange = this.equationChange.bind(this);
        this.epsilonChange = this.epsilonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    calculate(x:number,error:number,epsilon:number,equation:string) : object {
        let xi:number = this.function(x,equation),
            listX: Array<number> = [],
            listXi: Array<number> = [],
            listError: Array<number> = [];

        //First time
        error = this.error(xi,x);

        //Begin iteration
        while (error > epsilon && error != Infinity && listError.length < 100) {
            xi = this.function(x,equation);
            error = this.error(xi,x);

            //Get Data
            this.listResult(listX,x);
            this.listResult(listXi,xi);
            this.listResult(listError,error);

            x = xi;
        }

        // Result
        return (
            {
                listX:listX,
                listXi:listXi,
                listError:listError,
                Epsilon:epsilon,
                Equation:equation
            }
        );
    }
    xChange(event:ChangeEvent<HTMLInputElement>){
        try {
            this.props.StateNumerical.Method.RootEquation.OnePoint.X = JSON.parse(event.target.value) ;
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
            this.state.StateNumerical.Method.RootEquation.OnePoint.X,
            this.state.StateNumerical.Error,
            this.state.StateNumerical.Epsilon,
            this.state.StateNumerical.Equation
        );

        //push row on data table
        let row:Array<PropsReportTable> = [];
        for(let i:number = 0 ; i<Result.listError.length ; ++i){
            row.push({
                X1:Result.listX[i],
                X2:Result.listXi[i],
                Error:Result.listError[i]
            });
        }
        let reChart = [];
        for(let i=0 ;i<Result.listError.length;i++){
            reChart.push({
                X:Result.listX[i],
                Xi:Result.listXi[i],
                Error:Result.listError[i]
            })
        }
        //set state to chart and table
        this.setState({
            ReportTable:row,
            ApexChart: {
                Series: reChart,
                Categories: [
                    {name: "X", data: Result.listX},
                    {name: "Xi", data: Result.listXi},
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
                        this.props.StateNumerical.Problem = await res.data.Chapter[2].OnePoint;
                        await this.setState({StateNumerical:this.props.StateNumerical})
                    })
            })
        // const api = this.props.StateNumerical.Url;
        // axios.get(api, { headers: {"Authorization" : `Bearer ${this.props.StateNumerical.Token}`} })
        //     .then(res => {
        //         console.log(res.data);
        //         this.props.StateNumerical.Problem = res.data.Chapter[2].OnePoint;
        //         this.setState({StateNumerical:this.props.StateNumerical})
        //     });
        // fetch(
        //     this.Url)
        //     .then((res) => res.json())
        //     .then((json) => {
        //         this.props.StateNumerical.Problem = json.Chapter[2].OnePoint;
        //         this.setState({StateNumerical:this.props.StateNumerical})
        //     })
    }
    componentWillUnmount() {
        // alert('The component is going to be unmounted');
    }
    render() {
        const options:any= this.state.StateNumerical.Problem;
        // console.log(this.state.StateNumerical.Problem);
        return (
            <Container fixed>
                <div>
                    <h1>One Point</h1>
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
                        <TextField id="outlined-number" label="X" variant="outlined" type={"number"} inputProps={{step:Math.pow(10,-6)}} onChange={this.xChange} defaultValue={this.state.StateNumerical.Method.RootEquation.OnePoint.X}/>
                        <TextField id="outlined-number" label="Epsilon" variant="outlined" type={"number"} inputProps={{step:Math.pow(10,-6)}} onChange={this.epsilonChange} defaultValue={this.state.StateNumerical.Epsilon}/>
                    </div>
                    <div className={"Submit-Field"}>
                        <Button variant="contained" type={"submit"} disabled={this.state.StateNumerical.Equation == ""}>Calculate</Button>
                        {/*<Button variant="contained" disabled>Calculate</Button>*/}
                    </div>
                </form>
                <div className={"Chart-Field"}>
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
                            <Line type="monotone" dataKey="X" stroke="#8884d8"/>
                            <Line type="monotone" dataKey="Xi" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="Error" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={"Table-Field"}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Iteration</TableCell>
                                    <TableCell align="center">X</TableCell>
                                    <TableCell align="center">Xi</TableCell>
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
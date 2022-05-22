import LinearAlgebra from "../linearalgebra";
import Tex2SVG from "react-hook-mathjax";
import {PropsMethod, PropsReportTable} from "../../methodsproperty";
import {MatrixComponent} from "../../../components/matrix/matrix";
import {MathJax, MathJaxContext} from "better-react-mathjax";
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Grid,
    MenuItem,
    Paper,
    Select,
    Stack, Table, TableBody,
    TableCell, TableContainer, TableHead,
    TableRow,
    TextField
} from "@mui/material";
import React, {ChangeEvent, Component, FormEvent, FunctionComponent} from "react";
import {ApexChart} from "../../../components/apexchart/apexchart";
import {number, row} from "mathjs";
import {parse} from "url";
import {DesmosChart} from "../../../components/desmoschart/desmoschart";


export default class CramerRuleMethod extends LinearAlgebra {
    // private matrixTemp:Array<Array<number>> =   [[-2,3,1], [3,4,-5], [1,-2,1]];
    // private matrixAnswer:Array<Array<number>> = [[9], [0], [-4]];
    constructor(props:PropsMethod) {
        super(props);
        this.state = {
            ApexChart: {Series:[],Categories:[]},
            StateNumerical: props.StateNumerical,
            ReportTable: [],
        }
        this.rowChange = this.rowChange.bind(this);
        this.columnChange = this.columnChange.bind(this);
        this.handleMatrixInput = this.handleMatrixInput.bind(this);
        this.componentMatrixFill = this.componentMatrixFill.bind(this);
        this.componentMatrixInput = this.componentMatrixInput.bind(this);
        this. handleSubmit = this.handleSubmit.bind(this);
    }
    calculate(matrixA:Array<Array<number>>,matrixB:Array<Array<number>>) : object{
         let matrixTempA:Array<Array<number>>,
             detA = this.determinant(matrixA),
             listDetMatrixA:Array<number> = [] ,
             listDetMatrixTempA:Array<number> = [] ,
             listResult:Array<number> = [];

        for( let i=0 ;  i<matrixA[0].length ; i++ ) {
            matrixTempA = this.columnReplace(matrixA,matrixB,i)
            listDetMatrixTempA.push(JSON.parse(this.determinant(matrixTempA).toFixed(6)));
            listDetMatrixA.push(JSON.parse(detA.toFixed(6)));
            listResult.push(JSON.parse((this.determinant(matrixTempA)/detA).toFixed(6)));
        }
        return(
            {
                listDetMatrixAColB:listDetMatrixTempA,
                listDetMatrixA:listDetMatrixA,
                listResult:listResult
            }
        );
    }
    rowChange(event:ChangeEvent<HTMLInputElement>){
        try{
            if( (JSON.parse(event.target.value) >= 0) && (JSON.parse(event.target.value) <= 20) ) {
               this.props.StateNumerical.Matrix.Size.Row = parseInt(event.target.value);
               this.setState( {StateNumerical:this.props.StateNumerical} );
            }
        }
        catch (error){}
    }
    columnChange(event:ChangeEvent<HTMLInputElement>){
        try{
            if( (JSON.parse(event.target.value) >= 0) && (JSON.parse(event.target.value) <= 20) ) {
                    this.props.StateNumerical.Matrix.Size.Column = JSON.parse(event.target.value);
                    this.setState( {StateNumerical:this.props.StateNumerical} );
            }
        }
        catch (error){}
    }
    handleSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        this.props.StateNumerical.Method.LinearAlgebra.CramerRule.MatrixA = this.props.StateNumerical.Matrix.Data.MatrixA;
        //call function for calculate this method
        let Result:any = this.calculate(
            this.props.StateNumerical.Method.LinearAlgebra.CramerRule.MatrixA,
            this.props.StateNumerical.Method.LinearAlgebra.CramerRule.MatrixB,
        );

        //push row on data table
        let row:Array<PropsReportTable> = [];
        for(let i:number = 0 ; i<Result.listResult.length ; ++i){
            row.push({
                Matrix1:Result.listDetMatrixA,
                Matrix2:Result.listDetMatrixAColB,
                Matrix3:Result.listResult
            });
        }
        //set state to chart and table
        this.setState({
            ReportTable:row,
            StateNumerical: this.props.StateNumerical,
            ApexChart: {
                Series: [
                    {name: "MatrixA", data: Result.listDetMatrixA},
                    {name: "Det(MatrixA) * MatrixB", data: Result.listDetMatrixAColB},
                    {name: "Result", data: Result.listResult},
                ],
                Categories: Result.listResult.count
            }
        });
    }
    handleMatrixInput(event:any){
        try{
            this.props.StateNumerical.Matrix.Data.MatrixA[event.target.id.split(',')[0]][event.target.id.split(',')[1]] = parseInt(event.target.value) ;
            this.setState({StateNumerical:this.props.StateNumerical});
        }
        catch (error:any){}
    }
    componentMatrixFill(Before:number,After:number) {
        if (Before!=After) {
            this.props.StateNumerical.Matrix.Size.Default = this.state.StateNumerical.Matrix.Size.Row;
            this.props.StateNumerical.Matrix.Data.MatrixA = [] ;
            this.setState({StateNumerical: this.props.StateNumerical});
            for (let i: number = 0; i < this.state.StateNumerical.Matrix.Size.Row; i++) {
                this.props.StateNumerical.Matrix.Data.MatrixA[i] = new Array(this.state.StateNumerical.Matrix.Size.Column).fill(0);
            }
        }
    }
    componentMatrixInput(row:number,column:number) :Array<any>{
        let Field:Array<any> = [],
            i:number,
            j:number;
            for( i=0 ; i<row ; i++){
                for( j=0 ; j<column ; j++){
                    Field.push(
                        <Grid item xs={2} key={i.toString()+j.toString()}>
                            <TextField
                                id={i+","+j}
                                label={""}
                                variant="outlined"
                                type={"number"}
                                // key={Row.toString()+Column.toString()}
                                onChange={this.handleMatrixInput} defaultValue={this.state.StateNumerical.Matrix.Data.MatrixA[i][j]}>
                            </TextField>
                        </Grid>
                    );
                }
                Field.push(<Box width="100%" key={i.toString()}/>)
            }
        return Field;
    }
    componentMatrixAnswer() : Array<Array<string>> {
        let Field:Array<Array<string>> = [];
        let character:string = 'x';
        for(let i:number=0; i<this.state.StateNumerical.Matrix.Data.MatrixA.length ; i++){
            character = `x`+(i+1);
            Field.push([character]);
        }
        return Field;
    }
    componentDidMount() {
        // console.log( this.matrixTemp)
    }

    render() {
        this.componentMatrixFill(this.state.StateNumerical.Matrix.Size.Default,this.state.StateNumerical.Matrix.Size.Row)
        return (
            <Container fixed>
                <div>
                    <h1>Cramer's Rule</h1>
                </div>
                <MathJaxContext>
                    <Stack spacing={2}>
                        <Breadcrumbs separator={"="} aria-label="breadcrumb">
                            <MatrixComponent matrix={this.state.StateNumerical.Matrix.Data.MatrixA}></MatrixComponent>
                            <MatrixComponent matrix={this.componentMatrixAnswer()}></MatrixComponent>
                            <MatrixComponent matrix={this.state.StateNumerical.Matrix.Data.MatrixB}></MatrixComponent>
                        </Breadcrumbs>
                    </Stack>
                </MathJaxContext>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-basic"
                            label="Row"
                            variant="standard"
                            type={"number"}
                            onChange={this.rowChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="standard-basic" label="Column" variant="standard" type={"number"} inputProps={{step:0}} onChange={this.columnChange} defaultValue={this.state.StateNumerical.Matrix.Size.Column}/>
                    </Grid>
                </Grid>
                <br/>
                <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                        {this.componentMatrixInput(this.state.StateNumerical.Matrix.Size.Row,this.state.StateNumerical.Matrix.Size.Column)}
                </Grid>
                    <Button variant="contained" type={"submit"} disabled={this.state.StateNumerical.Equation == ""}>Calculate</Button>
                </form>
                <br/>
                <div className={"Chart-Field"}>
                    <ApexChart Series={this.state.ApexChart.Series} Categories={this.state.ApexChart.Categories}></ApexChart>
                </div>
                <div className={"Table-Field"}>
                    <MathJaxContext>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Iteration</TableCell>
                                        <TableCell align="center">DetA</TableCell>
                                        <TableCell align="center">DetA1</TableCell>
                                        <TableCell align="center">Result(DetA1/DetA)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.ReportTable.map((row:any,index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">X{index+1}</TableCell>
                                            <TableCell align="center">{row.Matrix1[index]}</TableCell>
                                            <TableCell align="center">{row.Matrix2[index]}</TableCell>
                                            <TableCell align="center">{row.Matrix3[index]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </MathJaxContext>

                </div>
            </Container>
        );
    }
}
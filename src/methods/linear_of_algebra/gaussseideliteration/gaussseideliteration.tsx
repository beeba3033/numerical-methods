import LinearAlgebra from "../linearalgebra";
import {PropsMethod, PropsReportTable} from "../../methodsproperty";
import React, {ChangeEvent, FormEvent} from "react";
import {
    Box,
    Breadcrumbs, Button,
    Container, FormControl,
    Grid, InputLabel,
    MenuItem, Paper, Select,
    SelectChangeEvent,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import {MatrixComponent} from "../../../components/matrix/matrix";
import {MathJaxContext} from "better-react-mathjax";
import axios from "axios";

export default class GaussSeidelMethod extends LinearAlgebra {

    constructor(props: PropsMethod) {
        super(props);
        this.state = {
            ApexChart: {Series:[],Categories:[]},
            StateNumerical: props.StateNumerical,
            ReportTable: [],
        }
        this.props.StateNumerical.Matrix.Data.MatrixA = this.props.StateNumerical.Method.LinearAlgebra.GaussSeidel.MatrixA;
        this.props.StateNumerical.Matrix.Data.MatrixB = this.props.StateNumerical.Method.LinearAlgebra.GaussSeidel.MatrixB;

        this.setState({StateNumerical:this.props.StateNumerical});
        this.rowChange = this.rowChange.bind(this);
        this.columnChange = this.columnChange.bind(this);
        this.componentMatrixFill = this.componentMatrixFill.bind(this);
        //MatrixA
        this.handleMatrixAInput = this.handleMatrixAInput.bind(this);
        this.componentMatrixAInput = this.componentMatrixAInput.bind(this);
        //MatrixB
        this.handleMatrixBInput = this.handleMatrixBInput.bind(this);
        this.componentMatrixBInput = this.componentMatrixBInput.bind(this);
        this. handleSubmit = this.handleSubmit.bind(this);
    }

    solve(matrixA: Array<Array<number>>, matrixB: Array<Array<number>>, epsilon: number) {
        let i: number = 0,
            j: number = 0,
            sumError: number = 1,
            tempB: number = 0,
            tempError:number = 0 ,
            matrixTempA : Array<Array<number>> = JSON.parse(JSON.stringify(matrixA)),
            matrixTempB : Array<Array<number>> = JSON.parse(JSON.stringify(this.matrixCustomColumn(matrixB,1))),
            matrixTempX : Array<Array<number>> = [],
            Error: Array<number> = [],
            listMatrixX : Array<Array<Array<number>>>  = [],
            listError: Array<Array<number>> = [];
        for( i=0 ;i<matrixTempA.length ; i++){
            matrixTempX.push([0]);
        }
        while (sumError > epsilon && listError.length < 100){
            Error = [];
            for( i=0 ; i<matrixTempA.length ; i++ ){
                tempB = matrixTempB[i][0];
                for( j=0 ; j<matrixTempA[0].length ; j++ ){
                    if(i!=j){
                        tempB -= (matrixTempA[i][j] * matrixTempX[j][0]);
                    }
                }
                tempError = matrixTempX[i][0];
                matrixTempX[i][0] = JSON.parse((tempB / matrixTempA[i][i]).toFixed(6));
                Error.push(JSON.parse(this.error(matrixTempX[i][0],tempError).toFixed(6)));
            }
            sumError = Error.reduce((a, b) => a + b)/Error.length;
            listMatrixX.push(matrixTempX);
            listError.push(Error);
        }
        return(
            {
                listMatrixX:listMatrixX,
                listError:listError
            }
        );
    }
    rowChange(event:ChangeEvent<HTMLInputElement>){
        try{
            this.componentMatrixFill();
            if( (JSON.parse(event.target.value) >= 0) && (JSON.parse(event.target.value) <= 20) ) {
                this.props.StateNumerical.Matrix.Size.Row = parseInt(event.target.value);
                this.setState( {StateNumerical:this.props.StateNumerical} );
            }
        }
        catch (error){}
    }
    columnChange(event:ChangeEvent<HTMLInputElement>){
        try{
            this.componentMatrixFill();
            if( (JSON.parse(event.target.value) >= 0) && (JSON.parse(event.target.value) <= 20) ) {
                this.props.StateNumerical.Matrix.Size.Column = JSON.parse(event.target.value);
                this.setState( {StateNumerical:this.props.StateNumerical} );
            }
        }
        catch (error){}
    }
    handleSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        if( this.props.StateNumerical.Matrix.Data.MatrixA == undefined ||
            this.props.StateNumerical.Matrix.Data.MatrixB == undefined )
        {
            // alert("Can't find some Matrix");
            return ;
        }
        if( this.props.StateNumerical.Matrix.Size.Column == undefined ||
            this.props.StateNumerical.Matrix.Size.Row == undefined )
        {
            // alert("Can't find Size of Matrix");
            return ;
        }
        if( this.props.StateNumerical.Matrix.Component.Choose == undefined){
            // alert("Please select options");
            return ;
        }
        if( this.props.StateNumerical.Matrix.Component.Choose == "custom" ){
            if( this.props.StateNumerical.Matrix.Size.Column == 0 || this.props.StateNumerical.Matrix.Size.Row == 0 ){
                // alert("Can't find Size of Matrix");
                return ;
            }
        }
        if(this.props.StateNumerical.Matrix.Data.MatrixB[0] == undefined){
            // alert("Can't find length of MatrixB");
            return ;
        }
        if( this.props.StateNumerical.Matrix.Data.MatrixA[0] == undefined){
            // alert("Can't find length of MatrixA");
            return ;
        }
        // if( this.props.StateNumerical.Matrix.Data.MatrixB.length != this.props.StateNumerical.Matrix.Data.MatrixB[0].length ||
        //     this.props.StateNumerical.Matrix.Data.MatrixA.length != this.props.StateNumerical.Matrix.Data.MatrixA[0].length)
        // {
        //     alert("Matrix must be square!");
        //     return ;
        // }

        this.props.StateNumerical.Method.LinearAlgebra.GaussSeidel.MatrixA = this.props.StateNumerical.Matrix.Data.MatrixA;
        this.props.StateNumerical.Method.LinearAlgebra.GaussSeidel.MatrixB = this.props.StateNumerical.Matrix.Data.MatrixB;

        //call function for calculate this method
        let Result:any = this.solve(
            this.props.StateNumerical.Method.LinearAlgebra.GaussSeidel.MatrixA,
            this.props.StateNumerical.Method.LinearAlgebra.GaussSeidel.MatrixB,
            this.props.StateNumerical.Epsilon
        );

        //push row on data table
        let row:Array<PropsReportTable> = [];
        for(let i:number = 0 ; i<Result.listError.length ; ++i){
            row.push({
                Matrix1:Result.listMatrixX,
                Matrix2:Result.listError
            });
        }
        //set state to chart and table
        this.setState({
            ReportTable:row,
            StateNumerical: this.props.StateNumerical,
        });
    }
    handleMatrixAInput(event:any){
        try{
            this.props.StateNumerical.Matrix.Data.MatrixA[event.target.id.split(',')[0]][event.target.id.split(',')[1]] = parseInt(event.target.value) ;
            this.setState({StateNumerical:this.props.StateNumerical});
        }
        catch (error:any){}
    }
    handleMatrixBInput(event:any){
        try{
            this.props.StateNumerical.Matrix.Data.MatrixB[event.target.id.split(',')[0]][event.target.id.split(',')[1]] = parseInt(event.target.value) ;
            this.setState({StateNumerical:this.props.StateNumerical});
        }
        catch (error:any){
            console.log(error);
        }
    }
    componentMatrixFill() {
        this.props.StateNumerical.Matrix.Data.MatrixA = [] ;
        this.props.StateNumerical.Matrix.Data.MatrixB = [] ;
        this.setState({StateNumerical: this.props.StateNumerical});
        for (let i: number = 0; i < this.state.StateNumerical.Matrix.Size.Row; i++) {
            this.props.StateNumerical.Matrix.Data.MatrixA[i] = new Array(this.state.StateNumerical.Matrix.Size.Column).fill(0);
            this.props.StateNumerical.Matrix.Data.MatrixB[i] = new Array(this.state.StateNumerical.Matrix.Size.Column).fill(0);
        }
        this.setState({StateNumerical: this.props.StateNumerical});
    }
    componentMatrixAInput(row:number,column:number) :Array<any>{
        let Field:Array<any> = [],
            i:number,
            j:number;
        try {
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
                                onChange={this.handleMatrixAInput} defaultValue={this.state.StateNumerical.Matrix.Data.MatrixA[i][j]}>
                            </TextField>
                        </Grid>
                    );
                }
                Field.push(<Box width="100%" key={i.toString()}/>)
            }
        }
        catch (error){
            this.componentMatrixFill();
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
                                onChange={this.handleMatrixAInput} defaultValue={this.state.StateNumerical.Matrix.Data.MatrixA[i][j]}>
                            </TextField>
                        </Grid>
                    );
                }
                Field.push(<Box width="100%" key={i.toString()}/>)
            }
        }
        return Field;
    }
    componentMatrixBInput(row:number,column:number) :Array<any>{
        let Field:Array<any> = [],
            i:number,
            j:number;
        try {
            for( i=0 ; i<row ; i++){
                for( j=0 ; j<1 ; j++){
                    Field.push(
                        <Grid item xs={2} key={i.toString()+j.toString()}>
                            <TextField
                                id={i+","+j}
                                label={""}
                                variant="outlined"
                                type={"number"}
                                // key={Row.toString()+Column.toString()}
                                onChange={this.handleMatrixBInput} defaultValue={this.state.StateNumerical.Matrix.Data.MatrixB[i][j]}>
                            </TextField>
                        </Grid>
                    );
                }
                Field.push(<Box width="100%" key={i.toString()}/>)
            }
        }
        catch (error){
            this.componentMatrixFill();
            for( i=0 ; i<row ; i++){
                for( j=0 ; j<1 ; j++){
                    Field.push(
                        <Grid item xs={2} key={i.toString()+j.toString()}>
                            <TextField
                                id={i+","+j}
                                label={""}
                                variant="outlined"
                                type={"number"}
                                // key={Row.toString()+Column.toString()}
                                onChange={this.handleMatrixBInput} defaultValue={this.state.StateNumerical.Matrix.Data.MatrixB[i][j]}>
                            </TextField>
                        </Grid>
                    );
                }
                Field.push(<Box width="100%" key={i.toString()}/>)
            }
        }
        return Field;
    }
    componentMatrixAnswer() : Array<Array<string>> {
        let Field:Array<Array<string>> = [];
        let character:string = 'x';
        for(let i:number=0; i<this.state.StateNumerical.Matrix.Data.MatrixA.length ; i++){
            character = 'x'+(i+1);
            Field.push([character]);
        }
        return Field;
    }
    async componentDidMount() {
        await this.componentMatrixFill();
        await this.props.StateNumerical.Problem.splice(0, this.props.StateNumerical.Problem.length);
        this.setState({StateNumerical:this.props.StateNumerical});

        const api = this.props.StateNumerical.Url;
        const regex = /"/g;
        await axios.post(this.props.Login.pathLogin, {
            "email": this.props.Login.email,
            "password": this.props.Login.password
        })
            .then(async res => {
                await axios.get(api, { headers: {"Authorization" : `Bearer ${res.data.accessToken.replace(regex,'')}`} })
                    .then(async res => {
                        this.props.StateNumerical.Problem = await res.data.Chapter[9].GaussSeidel;
                        await this.setState({StateNumerical:this.props.StateNumerical})
                    })
            })


        // await fetch(
        //     this.Url)
        //     .then(async (res) => await res.json())
        //     .then(async (json) => {
        //         console.log(json);
        //         this.props.StateNumerical.Problem = json.Chapter[9].GaussSeidel;
        //         this.setState({StateNumerical:this.props.StateNumerical});
        //     })
        // console.log(this.calculate(this.matrixA,this.matrixX,this.matrixB));
    }
    chooseComponent = (event:any) =>{
        this.props.StateNumerical.Matrix.Component.Choose = event.target.value;
        this.setState({StateNumerical:this.props.StateNumerical});
    }
    selectedOptionMatrixA = (event:SelectChangeEvent) => {
        let options:Array<any> = this.state.StateNumerical.Problem;

        if(options != [] && (JSON.stringify(options).includes("MatrixA"))){
            this.props.StateNumerical.Matrix.Data.MatrixA = JSON.parse(options[JSON.parse(event.target.value)].MatrixA);
            this.props.StateNumerical.Matrix.Component.Selected.MatrixA = event.target.value;
            this.setState({StateNumerical: this.props.StateNumerical});
        }
    }
    selectedOptionMatrixB = (event:SelectChangeEvent) => {
        let options:Array<any> = this.state.StateNumerical.Problem;

        if(options != [] && (JSON.stringify(options).includes("MatrixB"))){
            this.props.StateNumerical.Matrix.Data.MatrixB = JSON.parse(options[JSON.parse(event.target.value)].MatrixB);
            this.props.StateNumerical.Matrix.Component.Selected.MatrixB = event.target.value;
            this.setState({StateNumerical: this.props.StateNumerical});
        }
    }
    selectOptionMatrixA() {
        let options:Array<any> = this.state.StateNumerical.Problem;
        let Field:any = [];

        if(options != [] && (JSON.stringify(options).includes("MatrixA"))){
            options.map(({MatrixA,MatrixB},index)=>{
                Field.push(
                    <MenuItem value={index} key={"A"+index}>
                        <MatrixComponent matrix={JSON.parse(MatrixA)}></MatrixComponent>
                    </MenuItem>
                );
            });
        }
        return Field;
    }
    selectOptionMatrixB() {
        let options:Array<any> = this.state.StateNumerical.Problem;
        let Field:any = [];

        if(options != [] && (JSON.stringify(options).includes("MatrixB"))){
            options.map(({MatrixA,MatrixB},index)=>{
                Field.push(
                    <MenuItem value={index} key={"B"+index}>
                        <MatrixComponent matrix={JSON.parse(MatrixB)}></MatrixComponent>
                    </MenuItem>
                );
            });
        }
        return Field;
    }

    render() {

        return (
            <Container fixed>
                <div>
                    <h1>GaussSeidelMethod</h1>
                </div>
                <MathJaxContext>
                    <Stack spacing={2}>
                        <Breadcrumbs separator={"="} aria-label="breadcrumb">
                            <Breadcrumbs separator={"X"} aria-label="breadcrumb">
                                <MatrixComponent matrix={this.props.StateNumerical.Matrix.Data.MatrixA}></MatrixComponent>
                                <MatrixComponent matrix={this.componentMatrixAnswer()}></MatrixComponent>
                            </Breadcrumbs>
                            <MatrixComponent matrix={this.props.StateNumerical.Matrix.Data.MatrixB}></MatrixComponent>
                        </Breadcrumbs>
                    </Stack>
                    <br/>
                    <br/>
                    <ToggleButtonGroup
                        color="primary"
                        value={this.props.StateNumerical.Matrix.Component.Choose}
                        exclusive
                        onChange={this.chooseComponent}
                    >
                        <ToggleButton value="problems">Problems</ToggleButton>
                        <ToggleButton value="custom">Custom</ToggleButton>
                    </ToggleButtonGroup>
                    <br/>
                    <br/>

                    {   this.props.StateNumerical.Matrix.Component.Choose == "problems" &&
                    <div className={"problems-content"}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">MatrixA</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="MatrixA"
                                value={this.props.StateNumerical.Matrix.Component.Selected.MatrixA}
                                onChange={this.selectedOptionMatrixA}
                            >
                                { this.selectOptionMatrixA() }
                            </Select>
                        </FormControl>
                        <br/>
                        <br/>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">MatrixB</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="MatrixB"
                                value={this.props.StateNumerical.Matrix.Component.Selected.MatrixB}
                                onChange={this.selectedOptionMatrixB}
                            >
                                {
                                    this.selectOptionMatrixB()
                                }
                            </Select>
                        </FormControl>
                    </div>
                    }
                    <br/>
                    <br/>
                </MathJaxContext>
                {
                    this.props.StateNumerical.Matrix.Component.Choose == "custom" &&
                    <div className={"custom-content"}>
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
                        <div className={"custom-show"}>
                            <h3>matrixA</h3>
                            <Grid container spacing={2}>
                                {this.componentMatrixAInput(this.state.StateNumerical.Matrix.Size.Row,this.state.StateNumerical.Matrix.Size.Column)}
                            </Grid>
                            <br/>
                            <h3>matrixB</h3>
                            <Grid container spacing={2}>
                                {this.componentMatrixBInput(this.state.StateNumerical.Matrix.Size.Row,this.state.StateNumerical.Matrix.Size.Column)}
                            </Grid>
                        </div>
                    </div>
                }

                <br/>
                <form onSubmit={this.handleSubmit}>


                    <Button variant="contained" type={"submit"} disabled={this.state.StateNumerical.Equation == ""}>Calculate</Button>
                </form>
                <div className={"Table-Field"}>
                    <MathJaxContext>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Iteration</TableCell>
                                        <TableCell align="center">MatrixA</TableCell>
                                        <TableCell align="center">Error</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.ReportTable.map((row:any,index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{index+1}</TableCell>
                                            <TableCell align="center"><MatrixComponent matrix={row.Matrix1[index]}/></TableCell>
                                            <TableCell align="center">{row.Matrix2[index][row.Matrix2[index].length-1]}</TableCell>
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
import LinearAlgebra from "../linearalgebra";
import {PropsMethod, PropsProblem, PropsReportTable} from "../../methodsproperty";
import {MatrixComponent} from "../../../components/matrix/matrix";
import {MathJax, MathJaxContext} from "better-react-mathjax";
import {
    Autocomplete,
    Box,
    Breadcrumbs,
    Button,
    Container, FormControl,
    Grid, InputLabel,
    MenuItem,
    Paper,
    Select, SelectChangeEvent,
    Stack, Table, TableBody,
    TableCell, TableContainer, TableHead,
    TableRow,
    TextField, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import React, {ChangeEvent, Component, FormEvent, FunctionComponent} from "react";
import axios from "axios";


export default class CramerRuleMethod extends LinearAlgebra {

    constructor(props:PropsMethod) {
        super(props);
        this.state = {
            ApexChart: {Series:[],Categories:[]},
            StateNumerical: props.StateNumerical,
            ReportTable: [],
        }
        this.props.StateNumerical.Matrix.Data.MatrixA = this.props.StateNumerical.Method.LinearAlgebra.CramerRule.MatrixA;
        this.props.StateNumerical.Matrix.Data.MatrixB = this.props.StateNumerical.Method.LinearAlgebra.CramerRule.MatrixB;

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
    solve(matrixA:Array<Array<number>>,matrixB:Array<Array<number>>) : object{
        let matrixTempA:Array<Array<number>>,
             detA = this.determinant(matrixA),
             listDetMatrixA:Array<number> = [] ,
             listDetMatrixTempA:Array<number> = [] ,
             listResult:Array<number> = [];
        // for( let i=0 ;  i<matrixA[0].length ; i++ ) {
        //     matrixTempA = this.columnReplace(matrixA,matrixB,i)
        //     listDetMatrixTempA.push(JSON.parse(this.determinant(matrixTempA).toFixed(6)));
        //     listDetMatrixA.push(JSON.parse(detA.toFixed(6)));
        //     listResult.push(JSON.parse((this.determinant(matrixTempA)/detA).toFixed(6)));
        // }
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
        if( this.props.StateNumerical.Matrix.Data.MatrixB.length != this.props.StateNumerical.Matrix.Data.MatrixB[0].length ||
            this.props.StateNumerical.Matrix.Data.MatrixA.length != this.props.StateNumerical.Matrix.Data.MatrixA[0].length)
        {
            // alert("Matrix must be square!");
            return ;
        }

        this.props.StateNumerical.Method.LinearAlgebra.CramerRule.MatrixA = this.props.StateNumerical.Matrix.Data.MatrixA;
        this.props.StateNumerical.Method.LinearAlgebra.CramerRule.MatrixB = this.props.StateNumerical.Matrix.Data.MatrixB;

        //call function for calculate this method
        let Result:any = this.solve(
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
        // //set state to chart and table
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
                for( j=0 ; j<column ; j++){
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
                for( j=0 ; j<column ; j++){
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
                        this.props.StateNumerical.Problem = await res.data.Chapter[5].CramerRule;
                        await this.setState({StateNumerical:this.props.StateNumerical})
                    })
            })
        // const api = this.props.StateNumerical.Url;
        // axios.get(api, { headers: {"Authorization" : `Bearer ${this.props.StateNumerical.Token}`} })
        //     .then(res => {
        //         console.log(res.data);
        //         this.props.StateNumerical.Problem = res.data.Chapter[5].CramerRule;
        //         this.setState({StateNumerical:this.props.StateNumerical})
        //     });
        // await fetch(
        //     this.Url)
        //     .then(async (res) => await res.json())
        //     .then(async (json) => {
        //         this.props.StateNumerical.Problem = json.Chapter[5].CramerRule;
        //         this.setState({StateNumerical:this.props.StateNumerical});
        //     })
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
    chooseComponent = (event:any) =>{
        this.props.StateNumerical.Matrix.Component.Choose = event.target.value;
        this.setState({StateNumerical:this.props.StateNumerical});
    }
    render() {
        return (
            <Container fixed>
                <div>
                    <h1>Cramer's Rule</h1>
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
                                //0 1 2 3 4 5
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
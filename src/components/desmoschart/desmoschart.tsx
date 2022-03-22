import {ComponentProps, FC, useEffect} from "react";
import {PropsChart, PropsCustom} from "../../service/serviceproperty";

/* Dosmos Chart */
const Desmos = require("desmos");
let elt = document.getElementById("calculator"),
    calculator = Desmos.GraphingCalculator(elt),
    equation;
/* Pattern Equation */
const Pattern = new RegExp(/f/g);
export const DesmosChart:FC<PropsChart> = (props) => {

    useEffect(()=>{
        elt = document.getElementById('calculator');
        calculator = Desmos.GraphingCalculator(
            elt,
            {
                keypad:false,
                settingsMenu:false,
                expressionsTopbar:false,
                notes:false,
                qwertyKeyboard:false,
                expressions:false
            }
        );
        calculator.setExpression({ id: 'graph1', latex:"0"});
    },[]);
    try {
        equation = props.Equation?.replace(/\(/g,'{').replace(/\)/g,'}');
        calculator.setExpression({ id: 'graph1', latex: 'y='+ equation});
    }
    catch (error){
        console.log(error);
    }
    return (
        <div id="calculator" style={{width:"100%",height:"25rem"}}>
        </div>
    );
};
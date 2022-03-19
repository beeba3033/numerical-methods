import {ComponentProps, FC, useEffect} from "react";
import {string} from "mathjs";
/* Dosmos Chart */
export const DesmosChart:FC<any> = (props) => {
    const Desmos = require("desmos")
    useEffect(()=>{
        var elt = document.getElementById('calculator');
        var calculator = Desmos.GraphingCalculator(elt);
        calculator.setExpression({ id: 'graph1', latex: 'y='+ props.Equation});
    },[]);
    return (
        <div>
            <h1>Graph</h1>
            <div id="calculator" style={{width:"500px",height:"500px"}}></div>
        </div>
    );
};
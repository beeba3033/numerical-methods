import {ComponentProps, FC, useEffect, useState} from "react";
import {PropsChart} from "../../methods/methodsproperty";

/* Dosmos Chart */
// const Desmos = require("desmos");
// let elt = document.getElementById("calculator"),
//     calculator = Desmos.GraphingCalculator(elt),
//     equation;
/* Pattern Equation */
const Pattern = new RegExp(/f/g);

interface List{
    xl:string;
    xr:string
}
const list:Array<List> = [
    {xl:"-5",xr:"2.0"},
    {xl:"-4",xr:"1.875"},
    {xl:"-3",xr:"1.8125"},
    {xl:"-2",xr:"1.78125"},
    {xl:"-1",xr:"1.765625"},
    {xl:"1.75",xr:"1.757813"},
    {xl:"0",xr:"1.753906"},
    {xl:"1.75",xr:"1.751953"},
    {xl:"1.75",xr:"1.750977"}
];
// export const DesmosChart:FC<PropsChart> = (props) => {

export const DesmosChart:FC<PropsChart> = (props) => {
    // const [isShown, setIsShown] = useState(false);
    // useEffect(()=>{
    //     elt = document.getElementById('calculator');
    //     calculator = Desmos.GraphingCalculator(
    //         elt,
    //         {
    //             keypad:false,
    //             settingsMenu:false,
    //             expressionsTopbar:false,
    //             notes:false,
    //             qwertyKeyboard:false,
    //             expressions:false,
    //             label:true,
    //             showLabel:true,
    //             pointsOfInterest:true,
    //         }
    //     );
    //     calculator.setExpression({ id: 'graph1', latex:"0"});
    //
    //
    // },[]);
    // try {
    //     equation = props.Equation?.replace(/\(/g,'{').replace(/\)/g,'}');
    //     calculator.setExpression({id: 'Equation', latex: 'y='+ equation,  style: Desmos.Styles.OPEN})
    // }
    // catch (error){
    //     console.log(error);
    // }
    // a.observe('numericValue', function () {
    //     console.log(a);
    // });
    // for(let counter=0;counter<list.length;counter++){
    //     setTimeout(function() {
    //         counter++;
    //         calculator.observeEvent('graphReset');
    //         calculator.setExpression({id: 'xl', latex: 'x=' + list[counter].xl});
    //         calculator.setExpression({id: 'xr', latex: 'x=' + list[counter].xr});
    //     },1000*counter);
    // }


    return (
        // <div id="calculator" style={{width:"100%",height:"25rem"}}>
        // </div>
        <div></div>
    );
};
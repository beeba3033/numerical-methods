import {ChangeEvent, Component, FormEvent} from "react";
import {DataTable, Property, PropsCustom, Result} from "../../service/serviceproperty";
import {parse} from "mathjs";
import * as React from "react";

export default class RootEquation extends Component<PropsCustom,Property> {
    constructor(props:PropsCustom) {
        super(props);
    }
    function(x:number,equation:string) : number{
        try{
            let Equation = parse(equation) ;
            return Equation.evaluate({x:x});
        }
        catch (error){
            console.log("Equation Error: "+error);
        }
        return 0 ;
    }
    error(xNew:number,xOld:number) : number{
        return Math.abs( (xNew-xOld)/xNew );
    }
    listResult(list:Array<number>,data:number):void{
        if(data!=Infinity){
            list.push(JSON.parse(data.toFixed(6)));
        }
        else{
            list.push(0);
        }
    }
}

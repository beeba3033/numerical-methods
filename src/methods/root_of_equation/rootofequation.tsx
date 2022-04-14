import {ChangeEvent, Component, FormEvent} from "react";
import {derivative, parse} from "mathjs";
import {PropsMethod , StateMethod} from "../methodsproperty";

export default class RootEquation extends Component<PropsMethod,StateMethod> {
    constructor(props:PropsMethod) {
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
    Derivative(x:string,equation:string) : string{
        try {
            let Equation:string = derivative(equation,x).toString();
            return Equation;
        }
        catch (error){
            console.log("Equation Error: "+error);
        }
        return equation ;
    }
    error(xNew:number,xOld:number) : number{
        if( xNew != 0 ){
            return Math.abs( (xNew-xOld)/xNew );
        }
        else{
            console.log("xNew can not equal 0")
            return -1;
        }
    }
    listResult(list:Array<number>,data:number):void{
        if(data!=Infinity && data!=NaN){
            list.push(JSON.parse(data.toFixed(6)));
        }
        else{
            list.push(0);
        }
    }
}

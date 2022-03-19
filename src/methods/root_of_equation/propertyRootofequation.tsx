import {Component} from "react";
import {parse} from "mathjs";
import {Property} from "../../service/propertyService";

export class RootEquation extends Component<any,Property> {
    constructor(props:any) {
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
}
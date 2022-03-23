import RootEquation from "../rootofequation";

export default class OnepointMethod extends RootEquation {
    constructor(props?:any) {
        super(props);
    }
    calculate(x:number,error:number,epsilon:number,equation:string) : Array<object> {
        let resultList: Array<object> = [];

        //first time
        let xi = this.function(x,equation);
        error = this.error(xi,x);
        resultList.push({X: x, Xi: xi , Error: error, Epsilon: epsilon});
        x = xi;

        //begin iteration
        while (error > epsilon && error != Infinity){
            xi = this.function(x,equation);
            error = this.error(xi,x);
            resultList.push({X: x, Xi: x , Error: error, Epsilon: epsilon});
            x = xi ;
        }
        return resultList;
    }
};
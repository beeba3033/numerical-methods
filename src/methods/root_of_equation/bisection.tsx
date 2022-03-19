import {RootEquation} from "./propertyRootofequation";

class BisectionMethod extends RootEquation {
    constructor(props?:any) {
        super(props);
    }
    calculateXm(xl:number,xr:number):number {
        return (xl+xr)/2;
    }
    calculate(xl:number,xr:number,error:number,epsilon:number,equation:string) : Array<object> {
        let xm: number = this.calculateXm(xl, xr),
            resultList: Array<object> = [];
        //first time
        error = (this.function(xl, equation) * this.function(xr, equation)) ? this.error(xm, xl) : this.error(xm, xr);
        resultList.push({Xl: xl, Xr: xr, Xm: xm, Error: error, Epsilon: epsilon});

        //begin iteration
        while (error > epsilon && resultList.length < 100) {
            xm = this.calculateXm(xl, xr);
            if ((this.function(xl, equation) * this.function(xr, equation)) < 0) {
                error = this.error(xm, xl);
                xl = xm;
            }
            else {
                error = this.error(xm, xr);
                xr = xm;
            }
            resultList.push({Xl: xl, Xr: xr, Xm: xm, Error: error, Epsilon: epsilon});
        }
        return resultList;
    }
};
export default BisectionMethod ;
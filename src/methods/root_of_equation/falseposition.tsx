import RootEquation from "./rootofequation";

export default class FalsePositionMethod extends RootEquation{
    constructor(props?:any) {
        super(props);
    }
    calculateX1(xl:number,xr:number,equation:string) : number{
        return (xl*this.function(xr,equation)) - (xr*this.function(xl,equation)) / (this.function(xr,equation)-this.function(xl,equation)) ;
    }
    calculate(xl:number,xr:number,error:number,epsilon:number,equation:string) : Array<object> {
        let xm: number = this.calculateX1(xl, xr,equation),
            resultList: Array<object> = [];
        //first time
        error = (this.function(xl, equation) * this.function(xr, equation)) ? this.error(xm, xl) : this.error(xm, xr);
        resultList.push({Xl: xl, Xr: xr, Xm: xm, Error: error, Epsilon: epsilon});

        //begin iteration
        while (error > epsilon && resultList.length < 100) {
            xm = this.calculateX1(xl, xr,equation);
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
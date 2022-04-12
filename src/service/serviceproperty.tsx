/* Root of equation */
export interface Bisection {
    Xl:number;
    Xr:number;
};
export interface FalsePosition {
    Xl:number;
    Xr:number;
};
export interface OnePoint {
    X:number;
    Xi:number;
}


export interface Property {
    // Data: {
    //     Name:string;
    // }
    Epsilon:number;
    Equation:string;
    Error:number;
    Method:Methods;
    Result?:Result;
    ApexChart:PropsApexChart;
    Data:Array<DataTable>
};
export interface Methods {
    RootEquation:{
        Bisection:Bisection;
        FalsePosition:FalsePosition;
        OnePoint:OnePoint;
    };
};
export interface Result {
    Epsilon:number;
    Equation:string;
    Error:Array<number>;
}
export interface PropsCustom {
    Epsilon:number;
    Equation:string;
    Error:number;
    Method:Methods;
    Url:string;
}
export interface PropsChart {
    Name?:string;
    Equation?:string;
    Result?:Result;
}
export interface PropsApexChart {
    Series:Array<Series>;
    Categories:Array<number>;
}
export interface Series {
    name:string;
    data:Array<number>;
}
export interface DataTable {
    X1?:number;
    X2?:number;
    X3?:number;
    Fx1?:number;
    Fx2?:number;
    Fx3?:number;
    Error?:number;
}
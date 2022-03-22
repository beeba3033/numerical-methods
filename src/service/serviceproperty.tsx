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
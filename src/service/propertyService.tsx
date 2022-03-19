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

export interface Methods {
    Bisection:Bisection;
    FalsePosition:FalsePosition;
    OnePoint:OnePoint;
};
export interface Property {
    Epsilon:number;
    Equation:string;
    Error:number;
    Method:Methods;
    Result?:number;
};
//Props Custom
export interface PropsMethod {
    StateNumerical:StateNumerical;
}

//State on Custom and Method
export interface StateMethod {
    ApexChart:PropsApexChart;
    StateNumerical:StateNumerical;
    ReportTable:Array<PropsReportTable>
}
export interface StateNumerical {
    Epsilon:number;
    Equation:string;
    Error:number;
    Method:Methods;
    Problem:Array<PropsProblem>;
}
export interface Methods {
    RootEquation:{
        Bisection:Bisection;
        FalsePosition:FalsePosition;
        OnePoint:OnePoint;
        NewtonRaphson:NewtonRaphsonn;
        Secant:Secant;
    };
    // LinearAlgebra:{
    //
    // }
};

// Root of Equation Method
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
export interface NewtonRaphsonn {
    X:number;
}
export interface Secant {
    X:number;
    Xi:number;
}

// Linear of Algebra Method
export interface CramerRule {

}
export interface GaussElimination {

}
export interface GaussJordan {

}
export interface LUDecomposition {

}
export interface JacobiIteration {

}
export interface GaussSeidel {

}
export interface ConjugateGradient {

}
//Chart Property
export interface PropsApexChart {
    Series:Array<Series>;
    Categories:Array<number>;
}
export interface Series {
    name:string;
    data:Array<number>;
}

//ReportTable Property
export interface PropsReportTable {
    X1?:number;
    X2?:number;
    X3?:number;
    Fx1?:number;
    Fx2?:number;
    Fx3?:number;
    Error?:number;
}

//Problem Property
export interface PropsProblem {
    Bisection:Array<{Equation:string}>
    FalsePosition:Array<object>
}
export interface Result {
    Epsilon:number;
    Equation:string;
    Error:Array<number>;
}

export interface PropsChart {
    Name?:string;
    Equation?:string;
    Result?:Result;
}
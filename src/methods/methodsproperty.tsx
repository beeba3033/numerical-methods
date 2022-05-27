//Props Custom
import JacobiIterationMethod from "./linear_of_algebra/jacobiIteration/jacobiIteration";

export interface PropsMethod {
    StateNumerical:StateNumerical;
    Login:KeyAPI;
}

//State on Custom and Method
export interface StateMethod {
    ApexChart:PropsApexChart;
    StateNumerical:StateNumerical;
    ReportTable:Array<PropsReportTable>;
}
export interface KeyAPI {
    email:string;
    password:string
    pathLogin:string
    regex:RegExp
}
export interface StateNumerical {
    Epsilon:number;
    Equation:string;
    Error:number;
    Matrix:Matrix;
    Method:Methods;
    Problem:Array<PropsProblem>;
    Token:string;
    Url:string;
}
export interface Methods {
    RootEquation:{
        Bisection:Bisection;
        FalsePosition:FalsePosition;
        OnePoint:OnePoint;
        NewtonRaphson:NewtonRaphsonn;
        Secant:Secant;
    };
    LinearAlgebra:{
        CramerRule:CramerRule;
        GaussElimination:GaussElimination;
        GaussJordan:GaussJordan;
        Jacobi:JacobiIteration;
        GaussSeidel:GaussSeidel;
        ConjugateGradient:ConjugateGradient;
    }
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
    MatrixA:Array<Array<number>>;
    MatrixB:Array<Array<number>>;
}
export interface GaussElimination {
    MatrixA:Array<Array<number>>;
    MatrixB:Array<Array<number>>;
}
export interface GaussJordan {
    MatrixA:Array<Array<number>>;
    MatrixB:Array<Array<number>>;
}

export interface LUDecomposition {

}
export interface JacobiIteration {
    MatrixA:Array<Array<number>>;
    MatrixB:Array<Array<number>>;
}
export interface GaussSeidel {
    MatrixA:Array<Array<number>>;
    MatrixB:Array<Array<number>>;
}
export interface ConjugateGradient {
    MatrixA:Array<Array<number>>;
    MatrixB:Array<Array<number>>;
}
//Chart Property
export interface PropsApexChart {
    Series:Array<any>;
    Categories:Array<object>;
}

//ReportTable Property
export interface PropsReportTable {
    X1?:number;
    X2?:number;
    X3?:number;
    Fx1?:number;
    Fx2?:number;
    Fx3?:number;
    Matrix1?:Array<Array<number>>;
    Matrix2?:Array<Array<number>>;
    Matrix3?:Array<Array<number>>;
    listR?:Array<any>,
    listX?:Array<any>,
    listD?:Array<any>,
    listLamda?:Array<any>,
    listAlpha?:Array<any>,
    listError?:Array<number>
    Error?:number;
}

//Problem Property
export interface PropsProblem {
    Bisection:Array<{Equation:string}>
    FalsePosition:Array<object>
    CramerRule:Array<{MatrixA:Array<Array<number>>,MatrixB:Array<Array<number>>}>
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

export interface Matrix {
    Component: {
        Selected: {
            MatrixA:string;
            MatrixB:string;
        },
        Choose:string
    }
    Size:{
        Row:number;
        Column:number;
        Default:number
    }
    Data:{
        MatrixA:Array<Array<number>>;
        MatrixB:Array<Array<number>>;
    };
}
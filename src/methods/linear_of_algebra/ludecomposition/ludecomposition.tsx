import LinearAlgebra from "../linearalgebra";
import {PropsMethod} from "../../methodsproperty";
import {Matrix} from "mathjs";

export default class LUDecompositionMethod extends LinearAlgebra {
    constructor(props:PropsMethod) {
        super(props);
    }
    calculate(matrixA : Array<Array<number>>, matrixL : Array<Array<number>>, matrixU : Array<Array<number>>) : void{
        // var n : number, i : number, j : number, k : number, sum : number;
        // var success : boolean;
        //
        // n = NumberOfRows(A);
        //
        // L.r = CreateSquareMatrix(n).r;
        // U.r = CreateSquareMatrix(n).r;
        //
        // if(IsSquare(A)){
        //     success = true;
        //
        //     for(i = 0; i < n && success; i = i + 1){
        //         for(k = i; k < n; k = k + 1){
        //             sum = 0;
        //             for(j = 0; j < i; j = j + 1){
        //                 sum = sum + (Elementx(L, i, j)*Elementx(U, j, k));
        //             }
        //
        //             U.r[i].c[k] = Elementx(A, i, k) - sum;
        //         }
        //
        //         for(k = i; k < n && success; k = k + 1){
        //             if(i == k){
        //                 L.r[i].c[i] = 1;
        //             }else{
        //                 sum = 0;
        //                 for(j = 0; j < i; j = j + 1){
        //                     sum = sum + (Elementx(L, k, j)*Elementx(U, j, i));
        //                 }
        //
        //                 if(Elementx(U, i, i) == 0){
        //                     success = false;
        //                 }else{
        //                     L.r[k].c[i] = (Elementx(A, k, i) - sum)/Elementx(U, i, i);
        //                 }
        //             }
        //         }
        //     }
        // }else{
        //     success = false;
        // }
        //
        // return success;
    }
    render() {
        return <div>LUDecomposition</div>;
    }
}
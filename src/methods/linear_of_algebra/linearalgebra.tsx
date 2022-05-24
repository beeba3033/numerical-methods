import {Component} from "react";
import {PropsMethod, StateMethod} from "../methodsproperty";
import {column, det, index, matrix, multiply, range, subset} from "mathjs";


export default class LinearAlgebra extends Component<PropsMethod,StateMethod> {
    constructor(props:PropsMethod) {
        super(props);
    }
    determinant (matrix:Array<Array<number>>):number {
        return det(matrix);
    }
    columnReplace(Matrix1:Array<Array<number>>,Matrix2:Array<Array<number>>,Index:number) {
        let Temp:Array<string> = Matrix1.toString().split(","),
            MatrixAnswer:Array<Array<any>> = [],
            MatrixTemp:Array<number> = [],
            Count = 0;

        //Address memory is same Need to make different Address so change Array<2 Dimension> -> String -> new Array<2 Dimension>
        for(let i=0;i<Matrix1.length;i++){
            for (let j=0;j<Matrix1[0].length;j++){
                if(j==Index){
                    MatrixTemp.push(Matrix2[i][0]);
                }
                else{
                    MatrixTemp.push(JSON.parse(Temp[Count]));
                }
                if(j==Matrix1[i].length-1){
                    MatrixAnswer.push(MatrixTemp);
                    MatrixTemp = [] ;
                }
                Count++;
            }
        }
        return MatrixAnswer;
    }
    subtractArrayArray(array1:Array<number>,array2:Array<number>,index:number) : Array<number>{
        let result:Array<number> = [] ;
        if(Math.abs(array1[index] - array2[index]) != 0 ){
            array2 = multiply(array2,-1);
        }
        for(let i=0 ;i<array1.length ; i++){
            result.push(array1[i] - array2[i]);
        }
        return result ;
    }
    multiplyArrayValue(matrix:Array<number>,value:number) : Array<number> {
        for(let i=0 ; i<matrix.length ; i++){
            matrix[i] *= value ;
        }
        return matrix;
    }
    error(xNew:number,xOld:number) : number{
        if( xNew != 0 ){
            return Math.abs( (xNew-xOld)/xNew );
        }
        else{
            console.log("xNew can not equal 0")
            return -1;
        }
    }
    matrixCustomColumn(matrix:Array<Array<number>>,column:number):Array<Array<number>>{
        let temp:Array<Array<number>> = [];
        let i=0,j=0;
        for(i=0;i<matrix.length;i++){
            let arr:Array<number> = [];
            for(j=0;j<column;j++){
                if(matrix[i][j] == undefined || matrix[i][j] == null){
                    matrix[i][j] = 0;
                }
                arr.push(matrix[i][j]);
            }
            temp.push(arr);
        }
        return temp;
    }
}
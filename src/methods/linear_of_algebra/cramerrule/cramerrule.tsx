import LinearAlgebra from "../linearalgebra";
import {PropsMethod} from "../../methodsproperty";

export default class CramerRuleMethod extends LinearAlgebra {
    private matrixTemp:Array<Array<number>> =   [
                                                [-2,3,1],
                                                [3,4,-5],
                                                [1,-2,1]
                                                ];
    private matrixAnswer:Array<Array<number>> = [
                                            [9],
                                            [0],
                                            [-4]
                                        ];
    constructor(props:PropsMethod) {
        super(props);
    }
    calculate(matrixA:Array<Array<number>>,matrixB:Array<Array<number>>) : object{
         let matrixTempA:Array<Array<number>>,
             detA = this.determinant(matrixA),
             listDetMatrixA:Array<number> = [] ,
             listDetMatrixTempA:Array<number> = [] ,
             listResult:Array<number> = [];

        for( let i=0 ;  i<matrixA[0].length ; i++ ) {
            matrixTempA = this.columnReplace(matrixA,matrixB,i)
            listDetMatrixTempA.push(JSON.parse(this.determinant(matrixTempA).toFixed(6)));
            listDetMatrixA.push(JSON.parse(detA.toFixed(6)));
            listResult.push(JSON.parse((this.determinant(matrixTempA)/detA).toFixed(6)));
        }
        return(
            {
                listDetMatrixAColB:listDetMatrixTempA,
                listDetMatrixA:listDetMatrixA,
                listResult:listResult
            }
        );
    }
    render() {
        console.log(this.calculate(this.matrixTemp,this.matrixAnswer));
        return (
            <div>

            </div>
        );
    }
}
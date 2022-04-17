import LinearAlgebra from "../linearalgebra";
import {PropsMethod} from "../../methodsproperty";
import {multiply} from "mathjs";
import JacobiIterationMethod from "../jacobiIteration/jacobiIteration";
import GaussEliminationMethod from "../gausselimination/gausselimination";

export default class GaussJordanMethod extends LinearAlgebra {
    private matrixA: Array<Array<number>> = [
        [-2, 3, 1],
        [3, 4, -5],
        [1, -2,1]
    ];
    private matrixB: Array<Array<number>> = [
        [9],
        [0],
        [-4]
    ];
    private matrixX: Array<Array<number>> = [[0], [0], [0]];
    constructor(props:PropsMethod) {
        super(props);
    }
    calculate(matrixA:Array<Array<number>>,matrixX:Array<Array<number>>,matrixB:Array<Array<number>>) : object{
        let matrixTempA:Array<Array<number>> = JSON.parse(JSON.stringify(matrixA)),
            matrixTempB:Array<Array<number>> = JSON.parse(JSON.stringify(matrixB));

        let i:number = 0 ,
            j:number = 0 ,
            valueTempA:number = 0 ,
            listMatrixA:Array<Array<Array<number>>> = [],
            listMatrixB:Array<Array<Array<number>>> = [],
            listMatrixX:Array<Array<Array<number>>> = [];

        //Gauss Elimination Method
        for( i=0; i<matrixTempA.length ; i++ ){
            for( j=0; j<matrixTempA[i].length ; j++ ){
                if(j<i){
                    //swap multiply value
                    valueTempA = matrixTempA[j][j];

                    matrixTempA[j] = this.multiplyArrayValue(matrixTempA[j],matrixTempA[i][j]);
                    matrixTempB[j] = this.multiplyArrayValue(matrixTempB[j],matrixTempA[i][j]);

                    matrixTempA[i] = this.multiplyArrayValue(matrixTempA[i],valueTempA);
                    matrixTempB[i] = this.multiplyArrayValue(matrixTempB[i],valueTempA);

                    //subtract value
                    matrixTempA[i] = this.subtractArrayArray( matrixTempA[j] , matrixTempA[i] , j );
                    matrixTempB[i][0] = matrixTempB[j][0] - matrixTempB[i][0];
                    listMatrixA.push(JSON.parse(JSON.stringify(matrixTempA)));
                    listMatrixB.push(JSON.parse(JSON.stringify(matrixTempB)));
                }
            }
        }
        //Gauss Jordan Method
        for( i=0; i<matrixTempA.length ; i++ ){
            for( j=0; j<matrixTempA[i].length ; j++ ){
                if(j>i){
                    //swap multiply value
                    valueTempA = matrixTempA[j][j];

                    matrixTempA[j] = this.multiplyArrayValue(matrixTempA[j],matrixTempA[i][j]);
                    matrixTempB[j] = this.multiplyArrayValue(matrixTempB[j],matrixTempA[i][j]);

                    matrixTempA[i] = this.multiplyArrayValue(matrixTempA[i],valueTempA);
                    matrixTempB[i] = this.multiplyArrayValue(matrixTempB[i],valueTempA);

                    //subtract value
                    matrixTempA[i] = this.subtractArrayArray( matrixTempA[j] , matrixTempA[i] , j );
                    matrixTempB[i][0] = matrixTempB[j][0] - matrixTempB[i][0];
                    listMatrixA.push(JSON.parse(JSON.stringify(matrixTempA)));
                    listMatrixB.push(JSON.parse(JSON.stringify(matrixTempB)));
                }
            }
        }
        let temp:number = 0 ;
        for(i=0 ; i<matrixTempA.length ; i++ ){
            temp = matrixTempA[i][i];
            matrixTempA[i][i] /= temp;
            matrixTempB[i][0] /= temp;
            listMatrixA.push(JSON.parse(JSON.stringify(matrixTempA)));
            listMatrixB.push(JSON.parse(JSON.stringify(matrixTempB)));
            listMatrixX.push(JSON.parse(JSON.stringify(matrixTempB)));
        }
        return(
            {
                listMatrixA:listMatrixA,
                listMatrixB:listMatrixB,
                listMatrixX:listMatrixX
            }
        );
    }
    componentDidMount() {
        console.log(        this.calculate(this.matrixA,this.matrixX,this.matrixB));
    }

    render() {
        return (
            <div>
                <h1>GaussJordanMethod</h1>
            </div>
        );
    }
}
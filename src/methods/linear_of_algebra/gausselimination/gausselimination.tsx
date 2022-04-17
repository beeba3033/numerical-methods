import LinearAlgebra from "../linearalgebra";
import {multiply} from "mathjs";

export default class GaussEliminationMethod extends LinearAlgebra{
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
    calculate(matrixA:Array<Array<number>>,matrixX:Array<Array<number>>,matrixB:Array<Array<number>>,epsilon:number){

        let matrixTempA:Array<Array<number>> = JSON.parse(JSON.stringify(matrixA)),
            matrixTempX:Array<Array<number>> = JSON.parse(JSON.stringify(matrixX)),
            matrixTempB:Array<Array<number>> = JSON.parse(JSON.stringify(matrixB));

        let i:number = 0 ,
            j:number = 0 ,
            valueTempA:number = 0 ,
            matrixTemp:Array<Array<number>>,
            listMatrixA:Array<Array<Array<number>>> = [],
            listMatrixB:Array<Array<Array<number>>> = [],
            listMatrixX:Array<Array<Array<number>>> = [];

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
        matrixTemp = JSON.parse(JSON.stringify(matrixTempA));
        for( i=matrixTemp.length-1 ; i>=0 ; i-- ){
            matrixTempX[i][0] = matrixTempB[i][0];
            for( j=matrixTemp[i].length-1 ; j>=0 ; j--){
                if(j==i){
                   matrixTempX[i][0] /= matrixTemp[i][j];
                }
                else{
                    matrixTempX[i][0] += multiply(matrixTemp[i][j]*matrixTempX[j][0],-1);
                }
            }
            listMatrixX.push(JSON.parse(JSON.stringify(matrixTempX)));
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
        console.log(this.calculate(this.matrixA,this.matrixX,this.matrixB,Math.pow(10,-6)));
    }

    render() {
        return (
            <div>
                <h1>GaussEliminationMethod</h1>
            </div>
        );
    }
}
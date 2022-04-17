import LinearAlgebra from "../linearalgebra";
import {PropsMethod} from "../../methodsproperty";

export default class GaussSeidelIterationMethod extends LinearAlgebra {
    private matrixTemp: Array<Array<number>> = [
        [5, 2, 0, 0],
        [2, 5, 2, 0],
        [0, 2, 5, 2],
        [0, 0, 2, 5]
    ];
    private matrixAnswer: Array<Array<number>> = [
        [12],
        [17],
        [14],
        [7]
    ];
    private matrixX: Array<Array<number>> = [[0], [0], [0], [0]];

    constructor(props: PropsMethod) {
        super(props);
    }

    calculate(matrixA: Array<Array<number>>, matrixB: Array<Array<number>>, matrixX: Array<Array<number>>, epsilon: number) {
        let i: number = 0,
            j: number = 0,
            sumError: number = 1,
            tempB: number = 0,
            tempError:number = 0 ,
            matrixTempA : Array<Array<number>> = JSON.parse(JSON.stringify(matrixA)),
            matrixTempB : Array<Array<number>> = JSON.parse(JSON.stringify(matrixB)),
            matrixTempX : Array<Array<number>> = JSON.parse(JSON.stringify(matrixX)),
            Error: Array<number> = [],
            listMatrixX : Array<Array<Array<number>>>  = [],
            listError: Array<Array<number>> = [];

        while (sumError > epsilon && listError.length < 100){
            Error = [];
            for( i=0 ; i<matrixTempA.length ; i++ ){
                tempB = matrixTempB[i][0];
                for( j=0 ; j<matrixTempA[0].length ; j++ ){
                    if(i!=j){
                        tempB -= (matrixTempA[i][j] * matrixTempX[j][0]);
                    }
                }
                tempError = matrixTempX[i][0];
                matrixTempX[i][0] = JSON.parse((tempB / matrixTempA[i][i]).toFixed(6));
                Error.push(JSON.parse(this.error(matrixTempX[i][0],tempError).toFixed(6)));
            }
            sumError = Error.reduce((a, b) => a + b)/Error.length;
            listMatrixX.push(matrixTempX);
            listError.push(Error);
        }
        return(
            {
                listMatrixX:listMatrixX,
                listError:listError
            }
        );
    }
    componentDidMount() {
        console.log(
            this.calculate(
                this.matrixTemp,
                this.matrixAnswer,
                this.matrixX,
                Math.pow(10,-6)
            )
        );
    }

    render() {

        return (
            <div>

            </div>
        );
    }
}
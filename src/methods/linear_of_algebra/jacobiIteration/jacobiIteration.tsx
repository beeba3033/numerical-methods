import LinearAlgebra from "../linearalgebra";
import {PropsMethod} from "../../methodsproperty";
import {Button} from "@mui/material";

export default class JacobiIterationMethod extends LinearAlgebra {
    // private matrixTemp: Array<Array<number>> = [
    //     [5, 2, 0, 0],
    //     [2, 5, 2, 0],
    //     [0, 2, 5, 2],
    //     [0, 0, 2, 5]
    // ];
    private test:Array<Array<number>> = [
        [1,2],
        [2,1]
    ];
    private hello:Array<Array<number>> = [
        [2],
        [1]
    ];
    private matrixAnswer: Array<Array<number>> = [
        [12],
        [17],
        [14],
        [7]
    ];
    private matrixX: Array<Array<number>> = [[0], [0], [0]];

    constructor(props: PropsMethod) {
        super(props);
    }

    calculate(matrixA: Array<Array<number>>, matrixB: Array<Array<number>>, matrixX: Array<Array<number>>, epsilon: number) {
        let i: number = 0,
            j: number = 0,
            sumError: number = 1,
            tempB: number = 0,
            tempX:Array<Array<number>> = JSON.parse(JSON.stringify(matrixX)),
            matrixTempA : Array<Array<number>> = JSON.parse(JSON.stringify(matrixA)),
            matrixTempB : Array<Array<number>> = JSON.parse(JSON.stringify(matrixB)),
            matrixTempX : Array<Array<number>> = JSON.parse(JSON.stringify(matrixX)),
            Error: Array<number> = [],
            listMatrixX : Array<Array<Array<number>>>  = [],
            listError: Array<Array<number>> = [];

        while (sumError > epsilon && listError.length < 100){
            tempX = JSON.parse(JSON.stringify(matrixTempX));
            Error = [];
            for( i=0 ; i<matrixTempA.length ; i++ ){
                tempB = matrixTempB[i][0];
                for( j=0 ; j<matrixTempA[0].length ; j++ ){
                    if(i!=j){
                        tempB -= (matrixTempA[i][j] * tempX[j][0]);
                    }
                }
                matrixTempX[i][0] = JSON.parse((tempB / matrixTempA[i][i]).toFixed(6));
                Error.push(JSON.parse(this.error(matrixTempX[i][0],tempX[i][0]).toFixed(6)));
            }
            sumError = Error.reduce((a, b) => a + b)/Error.length;
            listMatrixX.push(tempX);
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
                this.test,
                this.hello,
                this.matrixX,
                Math.pow(10,-6)
            )
        );
    }

    render() {

        return (
            <div>
                <Button variant="text">Text</Button>

            </div>
        );
    }
}
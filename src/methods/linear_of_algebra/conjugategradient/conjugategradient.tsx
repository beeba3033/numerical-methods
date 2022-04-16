import LinearAlgebra from "../linearalgebra";
import {PropsMethod} from "../../methodsproperty";
import {add, divide, Matrix, matrix, multiply, pow, sqrt, subtract, transpose} from "mathjs";

export default class ConjugateGradientMethod extends LinearAlgebra {
    private matrixA:Array<Array<number>> = [
        [5, 2, 0, 0],
        [2, 5, 2, 0],
        [0, 2, 5, 2],
        [0, 0, 2, 5]
    ];
    private matrixB: Array<Array<number>> = [
        [12],
        [17],
        [14],
        [7]
    ];
    private matrixX: Array<Array<number>> = [[0], [0], [0], [0]];

    constructor(props:PropsMethod) {
        super(props);
    }
    calculate(matrixA: Array<Array<number>>, matrixB: Array<Array<number>>, matrixX: Array<Array<number>>, epsilon: number) {
        let matrixTempA : Array<Array<number>> = JSON.parse(JSON.stringify(matrixA)),
            matrixTempB : Array<Array<number>> = JSON.parse(JSON.stringify(matrixB)),
            matrixTempX : Array<Array<number>> = JSON.parse(JSON.stringify(matrixX)),
            Error:number = 0;

        let R:any = subtract( multiply(matrixTempA,matrixTempX) , matrixTempB ),
            D:any = multiply(R,-1),
            R1:any ,
            D1:any ,
            X1:any ,
            i:number = 0,
            Alpha:any,
            Lambda:any;
        for( i=0 ; i<100 ; i++ ){
            Lambda = divide( multiply( multiply(transpose(D),-1),R ) , multiply( transpose(D),multiply( matrixTempA,D ) ) );
            X1 = add( matrixTempX,multiply( D,Lambda )  );
            R1 = subtract( multiply( matrixTempA,X1 ),matrixTempB );
            Error = sqrt(multiply( transpose(R1),R1 ));
            Alpha = divide( multiply( transpose(R1) , multiply(matrixTempA,D) ), multiply( transpose(D) , multiply(matrixTempA,D) ) );
            D1 = add( multiply(R1,-1) , multiply(D,Alpha) );

                console.log(
                    "iteration:"+i+"\n"+
                    " X = [ "+matrixTempX.valueOf().toString() + " ]\n"+
                    "R = [ "+R.valueOf().toString() + " ]\n" +
                    "D = [ "+D.valueOf().toString() + " ]\n"+
                    "Lamda = "+Lambda.valueOf().toString() + "\n" +
                    "Alpha = "+Alpha.valueOf().toString() + "\n" +
                    "Error = "+Error.valueOf().toString() + "\n"
                );
                if(Error.valueOf() < epsilon){
                    break;
                }
            matrixTempX = X1 ;
            R = R1 ;
            D = D1 ;
        }
    }
    componentDidMount() {
        console.log(
            this.calculate(
                this.matrixA,
                this.matrixB,
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
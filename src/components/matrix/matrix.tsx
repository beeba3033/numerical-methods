import {MathJax, MathJaxContext} from "better-react-mathjax";
import {parse} from "mathjs";
import {Box, Grid, TextField} from "@mui/material";
import React from "react";
import {Matrix, StateNumerical} from "../../methods/methodsproperty";
interface matrix {
    matrix:Array<Array<any>>
}
export const MatrixComponent = (props:matrix) => {
    let matrix:any = JSON.stringify(props.matrix);
    try {
        return (
            <MathJax dynamic>
                {
                    "\\(" +
                        parse(matrix.toString().replace(/\r/g, "")).toTex({
                            parenthesis: "keep",
                            implicit: "show",
                        }).toString()
                    + "\\)"
                }
            </MathJax>
        );
    } catch (error:any) {
        return <MathJax dynamic>{error.toString()}</MathJax>;
    }
};
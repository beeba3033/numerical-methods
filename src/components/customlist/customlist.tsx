import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import {Link} from "react-router-dom";
import {makeStyles, Paper, styled} from "@mui/material";
import JacobiIterationMethod from "../../methods/linear_of_algebra/jacobiIteration/jacobiIteration";
import ConjugateGradientMethod from "../../methods/linear_of_algebra/conjugategradient/conjugategradient";
import GaussJordanMethod from "../../methods/linear_of_algebra/gaussjordan/gaussjordan";
import LUDecompositionMethod from "../../methods/linear_of_algebra/ludecomposition/ludecomposition";

export default function NestedList() {
    const [open, setOpen] = React.useState(true),
            [openLinear,setOpenLinear] = React.useState(true),
            [openInterPolation,setOpenInterPolation] = React.useState(true),
            [openNewtonDivided ,setOpenNewtonDivided ] = React.useState(true),
            [openLagrange,setOpenLagrange] = React.useState(true),
            [openLeastSquares,setOpenLeastSquares] = React.useState(true),
            [openNumericalIntergration,setOpenNumericalIntergration] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const LinearClick = () => {
        setOpenLinear(!openLinear);
    };
    const InterPolation = () => {
        setOpenInterPolation(!openInterPolation);
    }
    const NewtonDivided = () => {
        setOpenNewtonDivided(!openNewtonDivided);
    }
    const Lagrange = () => {
        setOpenLagrange(!openLagrange);
    }
    const LeastSquares = () => {
        setOpenLeastSquares(!openLeastSquares);
    }
    const NumericalIntergration = () => {
        setOpenNumericalIntergration(!openNumericalIntergration);
    }
    return (
      <Paper elevation={2} sx={{width:"14rem",bgcolor: '#0693e3'}}>
          <List
              sx={{ width: '100%', maxWidth: 400 }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                  <ListSubheader component="div" id="nested-list-subheader" sx={{bgcolor: '#0693e3',color: 'white',fontFamily:'Open Sans'}}>
                      Numerical Methods
                  </ListSubheader>
              }
          >
              <Link to={"/Service"}>
                  <ListItemButton sx={{boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',pl: 2 }}>
                      <ListItemText primary="Home" />
                  </ListItemButton>
              </Link>
              <ListItemButton onClick={handleClick} sx={{boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                  <ListItemText primary="Root of Equation"  sx={{color: '#FFF0F0',fontWeight:'700'}} />
                  {open && <i className='bx bxs-chevron-up' style={{color:"white"}}></i>}
                  {!open && <i className='bx bxs-chevron-down' style={{color:"white"}}></i>}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                      <Link to={"/Bisection"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              {/*&nbsp;*/}
                              <ListItemText primary="Bisection" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/FalsePosition"}>
                          <ListItemButton sx={{ pl: 4 }} >
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="FalsePosition" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/OnePoint"}>
                          <ListItemButton sx={{ pl: 4 }}  href="/OnePoint">
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="One Point" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/NewtonRaphson"}>
                          <ListItemButton sx={{ pl: 4 }}  href="/NewtonRaphson">
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Newton Raphson" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/Secant"}>
                          <ListItemButton sx={{ pl: 4 }}  href="/Secant">
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Secant" />
                          </ListItemButton>
                      </Link>
                  </List>
              </Collapse>

              <ListItemButton onClick={LinearClick} sx={{boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                  <ListItemText primary="Linear Algebra"  sx={{color: '#FFF0F0',fontWeight:'700'}}/>
                  {openLinear && <i className='bx bxs-chevron-up' style={{color:"white"}}></i>}
                  {!openLinear && <i className='bx bxs-chevron-down' style={{color:"white"}}></i>}
              </ListItemButton>
              <Collapse in={openLinear} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                      <Link to={"/CramerRule"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Cramer's Rule" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/GaussElimination"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Gauss Elimination" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/GaussJordan"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Gauss Jordan" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/JacobiIteration"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Jacobi Iteration" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/GaussSeidelIteration"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Gauss-Seidel Iteration" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/ConjugateGradient"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Conjugate Gradient" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/LUDecomposition"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="LUDecomposition" />
                          </ListItemButton>
                      </Link>
                  </List>
              </Collapse>
              <ListItemButton onClick={InterPolation} sx={{boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                  <ListItemText primary="Interpolation Techniques"  sx={{color: '#FFF0F0',fontWeight:'700'}}/>
                  {openInterPolation && <i className='bx bxs-chevron-up' style={{color:"white"}}></i>}
                  {!openInterPolation && <i className='bx bxs-chevron-down' style={{color:"white"}}></i>}
              </ListItemButton>
              <Collapse in={openInterPolation} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                      <ListItemButton onClick={NewtonDivided} sx={{boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',pl: 4,color:'white' }}>
                          <i className='bx bx-plus'></i>
                          <ListItemText primary="Newton's divided differences"  sx={{color: '#FFF0F0',fontWeight:'700'}}/>
                          {openNewtonDivided && <i className='bx bxs-chevron-up' style={{color:"white"}}></i>}
                          {!openNewtonDivided && <i className='bx bxs-chevron-down' style={{color:"white"}}></i>}
                      </ListItemButton>
                      <Collapse in={openNewtonDivided} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                              <Link to={"/NewtonDivided/LinearInterpolation"}>
                                  <ListItemButton sx={{ pl: 8 }} >
                                      <i className='bx bx-subdirectory-right' ></i>
                                      <ListItemText primary="Linear Interpolation" />
                                  </ListItemButton>
                              </Link>
                              <Link to={"/NewtonDivided/QuadraticInterpolation"}>
                                  <ListItemButton sx={{ pl: 8 }}>
                                      <i className='bx bx-subdirectory-right'></i>
                                      <ListItemText primary="Quadratic Interpolation"  sx={{color: '#FFF0F0',fontWeight:'700'}}/>
                                  </ListItemButton>
                              </Link>
                          </List>
                      </Collapse>
                      <ListItemButton onClick={Lagrange} sx={{boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',pl: 4,color:'white' }}>
                          <i className='bx bx-plus'></i>
                          <ListItemText primary="Lagrange Interpolation"  sx={{color: '#FFF0F0',fontWeight:'700'}}/>
                          {openLagrange && <i className='bx bxs-chevron-up' style={{color:"white"}}></i>}
                          {!openLagrange && <i className='bx bxs-chevron-down' style={{color:"white"}}></i>}
                      </ListItemButton>
                      <Collapse in={openLagrange} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                              <Link to={"/Lagrange/LinearInterpolation"}>
                                  <ListItemButton sx={{ pl: 8 }}>
                                      <i className='bx bx-subdirectory-right'></i>
                                      <ListItemText primary="Linear Interpolation" />
                                  </ListItemButton>
                              </Link>
                              <Link to={"/Lagrange/QuadraticInterpolation"}>
                                  <ListItemButton sx={{ pl: 8 }}>
                                      <i className='bx bx-subdirectory-right'></i>
                                      <ListItemText primary="Quadratic Interpolation" />
                                  </ListItemButton>
                              </Link>
                          </List>
                      </Collapse>
                  </List>
              </Collapse>
              <ListItemButton onClick={LeastSquares} sx={{boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                  <ListItemText primary="Least-Squares Regression"  sx={{color: '#FFF0F0',fontWeight:'700'}}/>
                  {openLeastSquares && <i className='bx bxs-chevron-up' style={{color:"white"}}></i>}
                  {!openLeastSquares && <i className='bx bxs-chevron-down' style={{color:"white"}}></i>}
              </ListItemButton>
              <Collapse in={openLeastSquares} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                      <Link to={"/LinearRegression"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Linear Regression" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/PolynomialRegression"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Polynomial Regression" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/MultipleLinearRegression"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Multiple Linear Regression" />
                          </ListItemButton>
                      </Link>
                  </List>
              </Collapse>
              <ListItemButton onClick={NumericalIntergration} sx={{boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                  <ListItemText primary="Numerical Intergration"  sx={{color: '#FFF0F0',fontWeight:'700'}}/>
                  {openNumericalIntergration && <i className='bx bxs-chevron-up' style={{color:"white"}}></i>}
                  {!openNumericalIntergration && <i className='bx bxs-chevron-down' style={{color:"white"}}></i>}
              </ListItemButton>
              <Collapse in={openNumericalIntergration} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                      <Link to={"/TrapzoidalRule"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Trapzoidal Rule" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/CompositeTrapzoidalRule"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Composite Trapzoidal Rule" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/SimpsonRule"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Simpson's Rule" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/CompositeSimpsonRule"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <i className='bx bx-subdirectory-right'></i>
                              <ListItemText primary="Composite Simpson's Rule" />
                          </ListItemButton>
                      </Link>
                  </List>
              </Collapse>
          </List>
      </Paper>
    );
}

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import {Link} from "react-router-dom";
import {Paper} from "@mui/material";
import JacobiIterationMethod from "../../methods/linear_of_algebra/jacobiIteration/jacobiIteration";
import ConjugateGradientMethod from "../../methods/linear_of_algebra/conjugategradient/conjugategradient";

export default function NestedList() {
    const [open, setOpen] = React.useState(true),
            [openLinear,setOpenLinear] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const LinearClick = () => {
        setOpenLinear(!openLinear);
    };
    return (
      <Paper elevation={2} sx={{width:"14rem"}}>
          <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                      Numerical Methods
                  </ListSubheader>
              }
          >
              <Link to={"/Service"}>
                  <ListItemButton sx={{ pl: 2 }}>
                      <ListItemText primary="Home" />
                  </ListItemButton>
              </Link>
              <ListItemButton onClick={handleClick}>
                  <ListItemText primary="Root of Equation" />
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                      <Link to={"/Bisection"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText primary="Bisection" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/FalsePosition"}>
                          <ListItemButton sx={{ pl: 4 }} >
                              <ListItemText primary="FalsePosition" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/OnePoint"}>
                          <ListItemButton sx={{ pl: 4 }}  href="/OnePoint">
                              <ListItemText primary="One Point" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/NewtonRaphson"}>
                          <ListItemButton sx={{ pl: 4 }}  href="/NewtonRaphson">
                              <ListItemText primary="Newton Raphson" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/Secant"}>
                          <ListItemButton sx={{ pl: 4 }}  href="/Secant">
                              <ListItemText primary="Secant" />
                          </ListItemButton>
                      </Link>
                  </List>
              </Collapse>
              <ListItemButton onClick={LinearClick}>
                  <ListItemText primary="Linear Algebra" />
              </ListItemButton>
              <Collapse in={openLinear} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                      <Link to={"/CramerRule"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText primary="Cramer's Rule" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/GaussElimination"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText primary="Gauss Elimination" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/JacobiIteration"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText primary="Jacobi Iteration" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/GaussSeidelIteration"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText primary="Gauss-Seidel Iteration" />
                          </ListItemButton>
                      </Link>
                      <Link to={"/ConjugateGradient"}>
                          <ListItemButton sx={{ pl: 4 }}>
                              <ListItemText primary="Conjugate Gradient" />
                          </ListItemButton>
                      </Link>
                  </List>
              </Collapse>
          </List>
      </Paper>
    );
}

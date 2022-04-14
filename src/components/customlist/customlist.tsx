import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import {Link} from "react-router-dom";
import {Paper} from "@mui/material";

export default function NestedList() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
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
          </List>
      </Paper>
    );
}

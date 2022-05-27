import React, {useEffect, useState} from 'react';
import {cleanup, fireEvent, getByTestId, render, screen, waitFor} from '@testing-library/react';
import App from './App';
import {act} from "react-dom/test-utils";
import {unmountComponentAtNode} from "react-dom";
import {StateNumerical} from "./methods/methodsproperty";
import BisectionMethod from "./methods/root_of_equation/bisection/bisection";
import {BrowserRouter, MemoryRouter, Router} from "react-router-dom";
import {createMemoryHistory} from 'history'

let path:string = JSON.stringify(process.env.REACT_APP_PATH),
    login:string = JSON.stringify(process.env.REACT_APP_LOGIN),
    key:string = JSON.stringify(process.env.REACT_APP_KEY),
    regex = /"/g;
let email:string = JSON.stringify(process.env.REACT_APP_EMAIL),
    password:string = JSON.stringify(process.env.REACT_APP_PASSWORD);
let pathRegex:string = path.replace(regex,''),
    keyRegex:string = key.replace(regex,''),
    loginRegex:string = login.replace(regex,''),
    emailRegex:string = email.replace(regex,''),
    passwordRegex:string = password.replace(regex,'');
let State_of_Numerical:StateNumerical = {
  Epsilon:Math.pow(10,-6),
  Equation:"x",
  Error:0,
  Matrix:{
    Component:{
      Selected:{
        MatrixA:"0",
        MatrixB:"0",
      },
      Choose:"problems"
    },
    Size:{
      Row:0,
      Column:0,
      Default:0
    },
    Data:{
      MatrixA:[[1,2],[3,4]],
      MatrixB:[[5,6],[7,8]]
    }
  },
  Method:{
    RootEquation:{
      Bisection:{ Xl:1.5 , Xr:2.00 },
      FalsePosition:{ Xl:0.02 , Xr:0.03 },
      OnePoint:{ X:0 , Xi:0.5 },
      NewtonRaphson: {X:2.0},
      Secant: {X:2,Xi:2.75}
    },
    LinearAlgebra:{
      CramerRule:{MatrixA:[[-2,3,1], [3,4,-5], [1,-2,1]],MatrixB:[[9], [0], [-4]]},
      GaussElimination:{MatrixA:[[-2,3,1], [3,4,-5], [1,-2,1]],MatrixB:[[9], [0], [-4]]},
      GaussJordan:{MatrixA:[[-2,3,1], [3,4,-5], [1,-2,1]],MatrixB:[[9], [0], [-4]]},
      Jacobi:{MatrixA:[[-2,3,1], [3,4,-5], [1,-2,1]],MatrixB:[[9], [0], [-4]]},
      GaussSeidel:{MatrixA:[[-2,3,1], [3,4,-5], [1,-2,1]],MatrixB:[[9], [0], [-4]]},
      ConjugateGradient:{MatrixA:[[-2,3,1], [3,4,-5], [1,-2,1]],MatrixB:[[9], [0], [-4]]}
    }
  },
  Problem:[],
  Url:pathRegex,
  Token:keyRegex,
} ;

let container:any = null;
beforeEach(async () => {
  cleanup();
  jest.clearAllMocks();
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  document.body.removeChild(container);
  unmountComponentAtNode(container);

  container.remove();
  // container.quit()
  // jest.resetModules();
  // jest.resetModuleRegistry();
  jest.clearAllMocks();
  container = null;
});
afterAll(() => {
  cleanup();
  jest.clearAllMocks();
})
test('Component: listCustom',async () => {
  let component = /Bisection/i;
  const history:any = createMemoryHistory();
  // act(()=>{
   render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  // });

  expect(screen.getByText(/Bisection/i)).toBeInTheDocument();
  expect(screen.getByText(/FalsePosition/i)).toBeInTheDocument();
  expect(screen.getByText(/One Point/i)).toBeInTheDocument();
  expect(screen.getByText(/Newton Raphson/i)).toBeInTheDocument();
  expect(screen.getByText(/Secant/i)).toBeInTheDocument();
  expect(screen.getByText(/Cramer's Rule/i)).toBeInTheDocument();
  expect(screen.getByText(/Gauss Elimination/i)).toBeInTheDocument();
  expect(screen.getByText(/Gauss Jordan/i)).toBeInTheDocument();
  expect(screen.getByText(/Gauss-Seidel/i)).toBeInTheDocument();
  expect(screen.getByText(/Jacobi/i)).toBeInTheDocument();
  expect(screen.getByText(/Conjugate/i)).toBeInTheDocument();
  expect(screen.getByText(/Interpolation Techniques/i)).toBeInTheDocument();
  expect(screen.getByText(/Least-Squares/i)).toBeInTheDocument();
  expect(screen.getByText(/Numerical Intergration/i)).toBeInTheDocument();
  //
  // fireEvent.keyDown(screen.getByText(component));
  // screen.getByText(component).focus();
  // fireEvent.keyDown(document.activeElement || document.body);
  // expect(screen.getByText(/Calculate/i)).toBeInTheDocument()

});

// test('Component: OnePoint',async () => {
//   let component = /One Point/i;
//   await act(async ()=>{
//     render(<App/>) ;
//     await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:8000});
//     fireEvent.click(screen.getByText(component))
//   })
// });
//
// test('Component: NewtonRaphson',async () => {
//   let component = /Newton Raphson/i;
//   await act(async ()=>{
//     render(<App/>) ;
//     await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:8000});
//     fireEvent.click(screen.getByText(component))
//   })
// });
// it('Component: FalsePosition',async () => {
//   const component = /FalsePosition/i;
//   const {container,getByTestId} =await render(<App/>)
//   // await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:8000});
//   fireEvent.click(screen.getByText(component))
//   // fireEvent.click(screen.getByText(/calculate/i))
//   // await expect(screen.getByText('0.000001')).toBeInTheDocument();
//   await unmountComponentAtNode(container);
//   await container.remove();
// });
// test('Component: OnePoint',async () => {
//   const component = /One Point/i;
//   const {container,getByTestId} = await render(<App/>)
//   // await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:8000});
//   fireEvent.click(screen.getByText(component))
//   fireEvent.click(screen.getByText(/calculate/i))
//   // await expect(screen.getByText('0.000001')).toBeInTheDocument();
//   unmountComponentAtNode(container);
//   container.remove();
// },60000);
// test('Component: NewtonRaphson',async () => {
//   const component = /Newton Raphson/i;
//   const {container,getByTestId} = await render(<App/>)
//   // await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:8000});
//   fireEvent.click(screen.getByText(component))
//   fireEvent.click(screen.getByText(/calculate/i))
//   // await expect(screen.getByText('0.000001')).toBeInTheDocument();
//   unmountComponentAtNode(container);
//   container.remove();
// },60000);
// test('Component: Secant',async () => {
//   const component = /Secant/i;
//   const {container,getByTestId} = await render(<App/>)
//   // await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:8000});
//   fireEvent.click(screen.getByText(component))
//   fireEvent.click(screen.getByText(/calculate/i))
//   // await expect(screen.getByText('0.000001')).toBeInTheDocument();
//   unmountComponentAtNode(container);
//   container.remove();
// },60000);
//
// test('Component: CramerRule',async () => {
//   const component = /Cramer's Rule/i;
//   const {container,getByTestId} = await render(<App/>)
//   // await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:8000});
//   fireEvent.click(screen.getByText(component))
//   fireEvent.click(screen.getByText(/calculate/i))
//   // await expect(screen.getByText('0.000001')).toBeInTheDocument();
//   unmountComponentAtNode(container);
//   container.remove();
// },60000);
//
// test('Component: GaussElimination',async () => {
//   const component = /Gauss Elimination/i;
//   const {container,getByTestId} = await render(<App/>)
//   // await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:8000});
//   fireEvent.click(screen.getByText(component))
//   fireEvent.click(screen.getByText(/calculate/i))
//   // await expect(screen.getByText('0.000001')).toBeInTheDocument();
//   unmountComponentAtNode(container);
//   container.remove();
// },60000);
//
// test('Component: GaussJordan',async () => {
//   const component = /Gauss Jordan/i;
//   const {container,getByTestId} = await render(<App/>)
//   // await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:8000});
//   fireEvent.click(screen.getByText(component))
//   fireEvent.click(screen.getByText(/calculate/i))
//   // await expect(screen.getByText('0.000001')).toBeInTheDocument();
//   unmountComponentAtNode(container);
//   container.remove();
// },60000);

// test('Component: GaussSeidel',async () => {
//   const component = /Gauss-Seidel/i;
//   const {container,getByTestId} = await render(<App/>)
//   await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:8000});
//   fireEvent.click(screen.getByText(component))
//   fireEvent.click(screen.getByText(/calculate/i))
//   // await expect(screen.getByText('0.000001')).toBeInTheDocument();
//   unmountComponentAtNode(container);
//   container.remove();
// },60000);
//
// test('Component: Jacobi',async () => {
//   const component = /Jacobi/i;
//   const {container,getByTestId} = await render(<App/>)
//   await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:8000});
//   fireEvent.click(screen.getByText(component))
//   fireEvent.click(screen.getByText(/calculate/i))
//   // await expect(screen.getByText('0.000001')).toBeInTheDocument();
//   unmountComponentAtNode(container);
//   container.remove();
// },60000);
//
// test('Component: Conjugate',async () => {
//   const component = /Conjugate/i;
//   const {container,getByTestId} = await render(<App/>)
//   await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:10000});
//   fireEvent.click(screen.getByText(component))
//   fireEvent.click(screen.getByText(/calculate/i))
//   // await expect(screen.getByText('0.000001')).toBeInTheDocument();
//   unmountComponentAtNode(container);
//   container.remove();
// },60000);
import React, {useEffect, useState} from 'react';
import {
  cleanup,
  fireEvent,
  getByTestId, queryByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import App from './App';
import {act, mockComponent} from "react-dom/test-utils";
import {unmountComponentAtNode} from "react-dom";
import {StateNumerical} from "./methods/methodsproperty";
import BisectionMethod from "./methods/root_of_equation/bisection/bisection";
import {BrowserRouter, MemoryRouter, Router} from "react-router-dom";
import {createMemoryHistory} from 'history'

let container:any = null;
beforeEach(async () => {
  cleanup();
  jest.clearAllMocks();
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(async () => {
  await document.body.removeChild(container);
  await unmountComponentAtNode(container);
  await history.pushState(null, '', '/');
  await cleanup();
  await container.remove();
  await jest.clearAllMocks();
  container = null;
});
afterAll(async () => {
  await jest.resetModules();
  await cleanup();
  await jest.clearAllMocks();
})
test('Component: listCustom',async () => {
  await act(()=>{
   render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  });

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
});

test('Component: Bisection',async () => {
  let component = /Bisection/i;
  const history:any = createMemoryHistory();
  await act(()=>{
    render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  })
  await history.push('/Bisection');
  await waitFor(async ()=>{
    // await act(()=>{
    expect(screen.getByText(component)).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 4000));
    await render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
    fireEvent.click(screen.getByText(/CALCULATE/i));
  },{timeout:8200})
},60000);

test('Component: FalsePosition',async () => {
  let component = /FalsePosition/i;
  const history:any = createMemoryHistory();
  await act(()=>{
    render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  })
  await history.push('/FalsePosition');
  await waitFor(async ()=>{
    // await act(()=>{
    await new Promise((r) => setTimeout(r, 4000));
    expect(screen.getByText(component)).toBeInTheDocument();
    await render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
    fireEvent.click(screen.getByText(/CALCULATE/i));
  },{timeout:8200})
},60000);

test('Component: OnePoint',async () => {
  let component = /One Point/i;
  const history:any = createMemoryHistory();
  await act(()=>{
    render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  })
  await history.push('/OnePoint');
  await waitFor(async ()=>{
    // await act(()=>{
    await new Promise((r) => setTimeout(r, 4000));
    expect(screen.getByText(component)).toBeInTheDocument();
    await render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
    fireEvent.click(screen.getByText(/CALCULATE/i));
  },{timeout:8200})
},60000);

test('Component: NewtonRaphson',async () => {
  let component = /Newton Raphson/i;
  const history:any = createMemoryHistory();
  await act(()=>{
    render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  })
  await history.push('/NewtonRaphson');
  await waitFor(async ()=>{
    // await act(()=>{
    await new Promise((r) => setTimeout(r, 4000));
    expect(screen.getByText(component)).toBeInTheDocument();
    await render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
    fireEvent.click(screen.getByText(/CALCULATE/i));
  },{timeout:8200})
},60000);

test('Component: Secant',async () => {
  let component = /Secant/i;
  const history:any = createMemoryHistory();
  await act(()=>{
    render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  })
  await history.push('/Secant');
  await waitFor(async ()=>{
    // await act(()=>{
    await new Promise((r) => setTimeout(r, 4000));
    expect(screen.getByText(component)).toBeInTheDocument();
    await render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
    fireEvent.click(screen.getByText(/CALCULATE/i));
  },{timeout:8200})
},60000);

test('Component: CramerRule',async () => {
  let component = /Cramer's Rule/i;
  const history:any = createMemoryHistory();
  await act(()=>{
    render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  })
  await history.push('/CramerRule');
  await waitFor(async ()=>{
    // await act(()=>{
    await new Promise((r) => setTimeout(r, 4000));
    expect(screen.getByText(component)).toBeInTheDocument();
    await render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
    fireEvent.click(screen.getByText(/CALCULATE/i));
  },{timeout:8200})
},60000);

test('Component: GaussElimination',async () => {
  let component = /Gauss Elimination/i;
  const history:any = createMemoryHistory();
  await act(()=>{
    render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  })
  await history.push('/GaussElimination');
  await waitFor(async ()=>{
    // await act(()=>{
    await new Promise((r) => setTimeout(r, 4000));
    expect(screen.getByText(component)).toBeInTheDocument();
    await render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
    fireEvent.click(screen.getByText(/CALCULATE/i));
  },{timeout:8200})
},60000);

test('Component: GaussJordan',async () => {
  let component = /Gauss Jordan/i;
  const history:any = createMemoryHistory();
  await act(()=>{
    render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  })
  await history.push('/GaussJordan');
  await waitFor(async ()=>{
    // await act(()=>{
    await new Promise((r) => setTimeout(r, 4000));
    expect(screen.getByText(component)).toBeInTheDocument();
    await render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
    fireEvent.click(screen.getByText(/CALCULATE/i));
  },{timeout:8200})
},60000);

test('Component: Jacobi',async () => {
  let component = /Jacobi/i;
  const history:any = createMemoryHistory();
  await act(()=>{
    render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  })
  await history.push('/JacobiIteration');
  await waitFor(async ()=>{
    // await act(()=>{
    await new Promise((r) => setTimeout(r, 4000));
    expect(screen.getByText(component)).toBeInTheDocument();
    await render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
    fireEvent.click(screen.getByText(/CALCULATE/i));
  },{timeout:8200})
},60000);

test('Component: GaussSeidel',async () => {
  let component = /Gauss-Seidel/i;
  const history:any = createMemoryHistory();
  await act(()=>{
    render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  })
  await history.push('/GaussSeidelIteration');
  await waitFor(async ()=>{
    // await act(()=>{
    await new Promise((r) => setTimeout(r, 4000));
    expect(screen.getByText(component)).toBeInTheDocument();
    await render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
    fireEvent.click(screen.getByText(/CALCULATE/i));
  },{timeout:8200})
},60000);

test('Component: ConjugateGradient',async () => {
  let component = /Conjugate/i;
  const history:any = createMemoryHistory();
  await act(()=>{
    render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container);
  })
  await history.push('/ConjugateGradient');
  await waitFor(async ()=>{
    // await act(()=>{
    await new Promise((r) => setTimeout(r, 4000));
    expect(screen.getByText(component)).toBeInTheDocument();
    await render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
    fireEvent.click(screen.getByText(/CALCULATE/i));
  },{timeout:8200})
},60000);
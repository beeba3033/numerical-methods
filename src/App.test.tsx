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
  // cleanup on exiting

  document.body.removeChild(container);
  unmountComponentAtNode(container);
  history.pushState(null, '', '/');
  cleanup();

  container.remove();
  // container.quit()
  // jest.resetModules();
  // jest.resetModuleRegistry();
  jest.clearAllMocks();
  container = null;
});
afterAll(() => {
  jest.resetModules();
  // jest.resetModuleRegistry();
  cleanup();
  jest.clearAllMocks();
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
  history.push('/Bisection');
  await waitFor(()=>{expect(screen.getByText(component))},{timeout:4000});
  await new Promise((r) => setTimeout(r, 2000));

  await act(()=>{
    render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
  })
  await waitFor(()=>{expect(screen.getByText(/Calculate/i))},{timeout:4000});
},60000);

test('Component: FalsePosition',async () => {
  let component = /FalsePosition/i;
  const history:any = createMemoryHistory();
  await act(()=>{
    render(
        <BrowserRouter>
          <App/>
        </BrowserRouter>,container)
  })
  history.push('/FalsePosition');
  await waitFor(()=>{expect(screen.getByText(component))},{timeout:4000});
  await new Promise((r) => setTimeout(r, 2000));
  await act(()=>{
    render(
        <Router location={history.location} navigator={history}>
          <App/>
        </Router>,container);
  })
  await waitFor(()=>{expect(screen.getByText(/Calculate/i))},{timeout:4000});
},60000);
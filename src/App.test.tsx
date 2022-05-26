import React from 'react';
import {fireEvent, getByTestId, render, screen, waitFor} from '@testing-library/react';
import App from './App';
import {unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

let container:any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
test('renders learn react link', () => {

});
test('Component: Bisection',async () => {
  let component = /Bisection/i;
  await act(()=>{
    render(<App/>)
  })
  await waitFor(()=> expect(screen.getByText(component)).toBeInTheDocument(),{timeout:8000});
  fireEvent.click(screen.getByText(component))
  fireEvent.click(screen.getByText(/calculate/i))
});
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
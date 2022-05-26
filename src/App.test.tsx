import React from 'react';
import {fireEvent, getByTestId, render, screen, waitFor} from '@testing-library/react';
import App from './App';
import {unmountComponentAtNode} from "react-dom";

test('renders learn react link', async () => {
  render(<App/>);
  // const component = /Bisection/i;
  // const {getByTestId} = render(<App/>)
  // await waitFor(() => expect(getByRole('textbox')).toHaveValue('hello'))
  // expect(screen.getByTestId('Epsilon')).toHaveValue(0.000001)
  // await waitFor(() =>    fireEvent.click(screen.getByText(component)) );
},60000);
test('Component: Bisection',async () => {
  const component = /Bisection/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)) ,{timeout:2000});
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)),{timeout:2000});
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
},60000);
test('Component: FalsePosition',async () => {
  const component = /FalsePosition/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)),{timeout:2000} );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)),{timeout:2000} );
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
},60000);
test('Component: OnePoint',async () => {
  const component = /One Point/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)),{timeout:2000} );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)),{timeout:2000} );
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
},60000);
test('Component: NewtonRaphson',async () => {
  const component = /Newton Raphson/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)),{timeout:2000} );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)),{timeout:2000} );
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
},60000);
test('Component: Secant',async () => {
  const component = /Secant/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)),{timeout:2000} );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)),{timeout:2000} );
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
},60000);

test('Component: CramerRule',async () => {
  const component = /Cramer's Rule/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)),{timeout:2000} );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)),{timeout:2000} );
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
},60000);

test('Component: GaussElimination',async () => {
  const component = /Gauss Elimination/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)),{timeout:2000} );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)),{timeout:2000} );
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
},60000);

test('Component: GaussJordan',async () => {
  const component = /Gauss Jordan/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)),{timeout:2000} );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)),{timeout:2000} );
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
},60000);

test('Component: GaussSeidel',async () => {
  const component = /Gauss-Seidel/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)) ,{timeout:2000});
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)) ,{timeout:2000});
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
},60000);

test('Component: Jacobi',async () => {
  const component = /Jacobi/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)) ,{timeout:2000});
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)) ,{timeout:2000});
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
},60000);

test('Component: Conjugate',async () => {
  const component = /Conjugate/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)),{timeout:2000} );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)) ,{timeout:2000});
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
},60000);
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
});
test('Component: Bisection',async () => {
  const component = /Bisection/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)) );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)) );
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
});
test('Component: FalsePosition',async () => {
  const component = /FalsePosition/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)) );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)) );
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
});
test('Component: OnePoint',async () => {
  const component = /One Point/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)) );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)) );
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
});
test('Component: NewtonRaphson',async () => {
  const component = /Newton Raphson/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)) );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)) );
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
});
test('Component: Secant',async () => {
  const component = /Secant/i;
  const {container,getByTestId} = render(<App/>)
  await waitFor(() => fireEvent.click(screen.getByText(component)) );
  await waitFor(() => fireEvent.click(screen.getByText(/calculate/i)) );
  // await expect(screen.getByText('0.000001')).toBeInTheDocument();
  unmountComponentAtNode(container);
  container.remove();
});

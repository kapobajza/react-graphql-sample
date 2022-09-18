import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import { defaultTheme } from '../../theme/default';

import { ModalProvider, useModal } from './Provider';
import { ModalStack } from './types';

interface TestModalParams {
  Test: undefined;
  TestTwo: { testParam: string };
}

const MODAL_ONE_HEADING = 'This is modal one';
const MODAL_TWO_HEADING = 'This is modal two';
const BUTTON_OPEN_MODAL = 'Open modal';
const BUTTON_OPEN_ANOTHER_MODAL = 'Open another modal';
const BUTTON_CLOSE_MODAL = 'Close modal';
const TEST_TWO_MODAL_PARAM = 'test';

const testModalStack: ModalStack<TestModalParams> = {
  Test: ({ closeModal }) => {
    const { openModal } = useModal<TestModalParams>();

    return (
      <div>
        <span>{MODAL_ONE_HEADING}</span>
        <button onClick={() => openModal('TestTwo', { testParam: TEST_TWO_MODAL_PARAM })}>
          {BUTTON_OPEN_ANOTHER_MODAL}
        </button>
        <button onClick={() => closeModal()}>{BUTTON_CLOSE_MODAL}</button>
      </div>
    );
  },
  TestTwo: ({ closeModal, getParams }) => {
    const { testParam } = getParams();

    return (
      <div>
        <span>{MODAL_TWO_HEADING}</span>
        <span>{testParam}</span>
        <button onClick={() => closeModal()}>{BUTTON_CLOSE_MODAL}</button>
      </div>
    );
  },
};

const Home = () => {
  const { openModal } = useModal<TestModalParams>();
  return <button onClick={() => openModal('Test')}>{BUTTON_OPEN_MODAL}</button>;
};

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ModalProvider stack={testModalStack as any}>
        <Home />
      </ModalProvider>
    </ThemeProvider>
  );
};

describe('Modal component', () => {
  test('open modal successfully', async () => {
    render(<App />);

    const buttonOpenModal = screen.getByRole('button', { name: BUTTON_OPEN_MODAL });
    userEvent.click(buttonOpenModal);

    const modalHeading = await screen.findByText(MODAL_ONE_HEADING);
    const buttonCloseModal = await screen.findByRole('button', { name: BUTTON_CLOSE_MODAL });

    expect(modalHeading).toBeInTheDocument();
    expect(buttonCloseModal).toBeInTheDocument();
  });

  test('close modal successfully', async () => {
    render(<App />);

    const buttonOpenModal = screen.getByRole('button', { name: BUTTON_OPEN_MODAL });
    userEvent.click(buttonOpenModal);

    const modalHeading = await screen.findByText(MODAL_ONE_HEADING);
    const buttonCloseModal = await screen.findByRole('button', { name: BUTTON_CLOSE_MODAL });

    userEvent.click(buttonCloseModal);

    const buttonClose = await screen.findByRole('button', { name: BUTTON_OPEN_MODAL });

    await waitForElementToBeRemoved(modalHeading);

    expect(modalHeading).not.toBeInTheDocument();
    expect(buttonCloseModal).not.toBeInTheDocument();
    expect(buttonClose).toBeInTheDocument();
  });
});

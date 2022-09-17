import { AnimatePresence } from 'framer-motion';
import { Dispatch, FC, SetStateAction, useState } from 'react';

import { useMountEffect } from '../../hooks';

import ModalItem from './ModalItem';
import {
  IModalContext,
  ModalComponentProps,
  ModalStack,
  ModalStackItem,
  ModalStackParams,
} from './types';

interface Props {
  setContextValue: Dispatch<SetStateAction<IModalContext>>;
  stack: ModalStack;
}

const ModalBackground: FC<Props> = ({ setContextValue, stack: modalStack }) => {
  const [stack, setStack] = useState<ModalStackItem[]>([]);

  const closeModal = (name?: keyof ModalStackParams) => {
    setStack((prev) =>
      prev.filter((x, i) => {
        if (name) {
          return x.name !== name;
        }

        return i !== prev.length - 1;
      }),
    );
  };

  useMountEffect(() => {
    setContextValue({
      openModal: (name, params = undefined, options) => {
        const Component = modalStack[name];

        const props: ModalComponentProps = {
          getParams: () => params,
          closeModal,
        };

        setStack((prev) => [...prev, { Component, props, options, name }]);
      },
      closeModal,
    });
  });

  const removeItem = () => setStack((prev) => prev.filter((v, i) => i !== prev.length - 1));

  return (
    <div>
      <AnimatePresence>
        {stack.map(({ Component, props, options }, i) => (
          <ModalItem key={i} index={i + 1} removeItem={removeItem} options={options}>
            <Component {...props} />
          </ModalItem>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ModalBackground;

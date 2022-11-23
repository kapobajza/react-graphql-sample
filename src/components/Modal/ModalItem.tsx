import { AnimationProps, motion } from 'framer-motion';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { useMountEffect } from '../../hooks';

import { ModalItemProps } from './types';

const ModalItem: FC<PropsWithChildren<ModalItemProps>> = ({
  children,
  options,
  closeModal = () => {},
}) => {
  const { animationType = 'slide-and-fade' } = options || {};

  useMountEffect(() => {
    document.body.style.overflow = 'hidden';

    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onKeyPress);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKeyPress);
    };
  });

  const onInnerItemClick: MouseEventHandler<HTMLDivElement> = (e) => e.stopPropagation();

  const containerAnimationProps: AnimationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4 },
  };

  const innerContainerAnimationProps: AnimationProps =
    animationType === 'slide-and-fade'
      ? {
          initial: { y: 100 },
          animate: { y: 0 },
          exit: { y: 100 },
          transition: { duration: 0.6 },
        }
      : {};

  return (
    <Container onClick={closeModal} {...containerAnimationProps}>
      <InnerContainer onClick={onInnerItemClick} {...innerContainerAnimationProps}>
        {children}
      </InnerContainer>
    </Container>
  );
};

export default ModalItem;

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.6);
  z-index: ${({ theme }) => theme.zIndices.modal};
`;

const InnerContainer = styled(motion.div)`
  ${({ theme }) => ({
    backgroundColor: theme.colors['#FFF'],
    padding: theme.spacing(2),
  })}

  border-radius: 8px;
`;

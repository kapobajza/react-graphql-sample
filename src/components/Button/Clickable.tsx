import { DetailsHTMLAttributes, FC, forwardRef, MouseEventHandler, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props extends DetailsHTMLAttributes<HTMLDivElement> {
  onClick: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
}

const Clickable: FC<PropsWithChildren<Props>> = forwardRef<HTMLDivElement, Props>(
  ({ children, onClick, disabled, ...rest }, ref) => {
    const onContainerClick: MouseEventHandler<HTMLDivElement> = (e) => {
      if (disabled) {
        return;
      }

      onClick(e);
    };

    return (
      <StyledContainer onClick={onContainerClick} $disabled={disabled} {...rest} ref={ref}>
        {children}
      </StyledContainer>
    );
  },
);

export default Clickable;

const StyledContainer = styled.div<{ $disabled?: boolean }>`
  cursor: ${({ $disabled }) => !$disabled && 'pointer'};
`;

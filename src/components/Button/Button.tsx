import { FC, PropsWithChildren } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Property } from 'csstype';

interface Props {
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: FC<PropsWithChildren<Props>> = ({ children, onClick, variant = 'primary' }) => {
  return (
    <StyledButton $variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;

const getVariantStyle = (variant: Props['variant'], { colors }: DefaultTheme) => {
  let style: { backgroundColor: Property.BackgroundColor; color: Property.Color } = {
    backgroundColor: colors['#0072B1'],
    color: colors['#FFF'],
  };

  switch (variant) {
    case 'secondary':
      style = {
        ...style,
        backgroundColor: colors['#333637'],
      };
      break;

    default:
      break;
  }

  return style;
};

const StyledButton = styled.button<{ $variant: Props['variant'] }>`
  ${({ theme, $variant }) => ({
    ...getVariantStyle($variant, theme),
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  })}

  :active {
    box-shadow: none;
    transform: scale(0.98);
  }

  :disabled {
    opacity: 0.5;
  }

  min-width: 60px;
  border: none;
  border-radius: 32px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

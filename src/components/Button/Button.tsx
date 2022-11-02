import { FC, PropsWithChildren } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Property } from 'csstype';

import { useTranslation } from '../../translation';

interface Props {
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  variant = 'primary',
  className,
  disabled,
  loading,
}) => {
  const { strings } = useTranslation();

  return (
    <StyledButton
      $variant={variant}
      onClick={onClick}
      className={className}
      disabled={disabled || loading}>
      {loading ? strings.loading : children}
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
    cursor: not-allowed;
  }

  :focus-visible {
    outline: none;
  }

  min-width: 60px;
  border: none;
  border-radius: 32px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

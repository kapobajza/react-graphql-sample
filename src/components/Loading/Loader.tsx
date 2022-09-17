import { FC } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  $size?: number;
  $center?: boolean;
}

const Loader: FC<Props> = (props) => {
  return <StyledLoader {...props} />;
};

export default Loader;

const StyledLoader = styled.div<Props>`
  ${({ theme, $size = 30, $center }) => {
    const sizeInPx = theme.getSizeInPx($size);

    return css`
      border: 8px solid ${theme.colors['#D3D3D3']};
      border-top: 8px solid ${theme.colors['#0072B1']};
      border-radius: 50%;
      width: ${sizeInPx};
      height: ${sizeInPx};
      animation: spin 2s linear infinite;
      margin: ${$center && '0 auto'};
      margin-top: ${theme.spacing(2)};

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `;
  }}
`;

import { ImgHTMLAttributes, FC } from 'react';
import styled from 'styled-components';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  $size?: number;
}

const Avatar: FC<Props> = (props) => {
  return <StyledImage {...props} />;
};

export default Avatar;

const StyledImage = styled.img<Props>`
  ${({ theme, ...otherProps }) => {
    const { $size = 16 } = otherProps;
    const sizeInPx = theme.getSizeInPx($size);

    return {
      width: sizeInPx,
      height: sizeInPx,
      borderRadius: '50%',
    };
  }}
`;

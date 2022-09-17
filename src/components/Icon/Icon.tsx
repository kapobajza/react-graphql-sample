import { FC } from 'react';
import { useTheme } from 'styled-components';

import { CloseIconSvg } from './svgs';
import { IconProps, SvgProps } from './types';

const Icon: FC<IconProps> = (props) => {
  const { colors } = useTheme();
  const { name, color = '#000', size, onClick } = props;
  let Component: React.ComponentType<SvgProps> | null = null;

  switch (name) {
    case 'close':
      Component = CloseIconSvg;
      break;

    default:
      break;
  }

  if (!Component) {
    return null;
  }

  return <Component color={colors[color]} size={size} onClick={onClick} />;
};

export default Icon;

import { Color } from '../../theme/types';

interface CommonProps {
  size: number;
}

export type IconName = 'close';

export interface IconProps extends CommonProps {
  name: IconName;
  color?: Color;
  onClick?: () => void;
  size: number;
}

export interface SvgProps extends CommonProps, React.SVGProps<SVGSVGElement> {
  color: string;
}

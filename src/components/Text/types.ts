import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface TextProps extends DetailedHTMLProps<HTMLAttributes<any>, any> {
  variant?: 'standard' | 'heading' | 'sub-heading';
  $color?: string;
  $fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'bold' | 'normal';
}

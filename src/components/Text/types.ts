import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Property } from 'csstype';

export interface TextProps extends DetailedHTMLProps<HTMLAttributes<any>, any> {
  variant?: 'standard' | 'heading' | 'sub-heading';
  $color?: string;
  $fontWeight?: Property.FontWeight;
  $fontSize?: number;
  $opacity?: Property.Opacity;
}

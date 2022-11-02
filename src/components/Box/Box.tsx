import { CSSProperties, FC, PropsWithChildren } from 'react';

export interface BoxProps extends CSSProperties {
  testId?: string;
}

const Box: FC<PropsWithChildren<BoxProps>> = ({ children, testId, ...style }) => {
  return (
    <div style={style} data-testid={testId}>
      {children}
    </div>
  );
};

export default Box;

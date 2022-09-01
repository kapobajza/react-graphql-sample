import { CSSProperties, FC, PropsWithChildren } from 'react';

interface BoxProperties extends CSSProperties {
  testId?: string;
}

const Box: FC<PropsWithChildren<BoxProperties>> = ({ children, testId, ...style }) => {
  return (
    <div style={style} data-testid={testId}>
      {children}
    </div>
  );
};

export default Box;

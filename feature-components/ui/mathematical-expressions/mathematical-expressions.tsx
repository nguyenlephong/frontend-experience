import React, { ReactNode } from 'react';

export type MathematicalExpressionsProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function MathematicalExpressions({ children }: MathematicalExpressionsProps) {
  return (
    <div>
      {children}
    </div>
  );
}

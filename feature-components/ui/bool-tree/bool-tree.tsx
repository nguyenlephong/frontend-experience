import React, { ReactNode } from 'react';

export type BoolTreeProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function BoolTree({ children }: BoolTreeProps) {
  return (
    <div>
      {children}
    </div>
  );
}

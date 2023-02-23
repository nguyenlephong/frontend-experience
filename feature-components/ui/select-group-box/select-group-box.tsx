import React, { ReactNode } from 'react';

export type SelectGroupBoxProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function SelectGroupBox({ children }: SelectGroupBoxProps) {
  return (
    <div>
      {children}
    </div>
  );
}

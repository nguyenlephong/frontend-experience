import React, { ReactNode } from 'react';

export type WebNativeDisplayProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function WebNativeDisplay({ children }: WebNativeDisplayProps) {
  return (
    <div>
      {children}
    </div>
  );
}

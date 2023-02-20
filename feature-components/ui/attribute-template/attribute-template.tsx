import React, { ReactNode } from 'react';

export type AttributeTemplateProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function AttributeTemplate({ children }: AttributeTemplateProps) {
  return (
    <div>
      {children}
    </div>
  );
}

import React, { ReactNode } from 'react';

export type DateRangePickerQuickSelectionProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function DateRangePickerQuickSelection({ children }: DateRangePickerQuickSelectionProps) {
  return (
    <div>
      {children}
    </div>
  );
}

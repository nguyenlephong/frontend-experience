import React from 'react';
import { BoolTree } from './bool-tree';
import BooleanTreeConditionFilterContainerJSX from "./wrapper/BooleanTreeConditionFilterContainerJSX";

export const BasicBoolTree = () => {
  return (
    <BoolTree>
      <BooleanTreeConditionFilterContainerJSX/>
    </BoolTree>
  );
}

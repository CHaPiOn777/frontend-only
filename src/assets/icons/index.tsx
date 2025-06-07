import React from "react";
import BigArrow from "./BigArrow";
import { BigArrowIconProps } from "./types";

// Правый (по умолчанию)
export const RightArrow: React.FC<BigArrowIconProps> = (props) => (
  <BigArrow {...props} />
);

// Левый (развернутый)
export const LeftArrow: React.FC<BigArrowIconProps> = (props) => (
  <BigArrow {...props} isLeft />
);

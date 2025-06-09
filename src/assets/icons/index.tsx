import React from "react";
import { ArrowBtnIconProps } from "./types";
import ArrowBtn from "./ArrowBtn";

export const RightArrow: React.FC<ArrowBtnIconProps> = (props) => (
  <ArrowBtn {...props} />
);

export const LeftArrow: React.FC<ArrowBtnIconProps> = (props) => (
  <ArrowBtn {...props} isLeft />
);

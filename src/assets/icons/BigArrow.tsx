import React from "react";
import { BigArrowIconProps } from "./types";
import { StyledSvg } from "./Icon.syles";
import { theme } from "@/styles/theme";

const BigArrow: React.FC<BigArrowIconProps> = ({
  width = 50,
  height = 50,
  color = theme.colors.primary,
  onClick,
  isLeft = false,
  className,
  disabled = false,
}) => (
  <StyledSvg
    width={width}
    height={height}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: onClick ? "pointer" : "default" }}
    className={className}
    $isLeft={isLeft}
    $disabled={disabled}
  >
    <circle
      cx="25"
      cy="25"
      r="24.5"
      transform="matrix(-1 0 0 1 50 0)"
      stroke={color}
      strokeOpacity="0.5"
      //   fill="red"
    />
    <path
      d="M27.4999 18.75L21.2499 25L27.4999 31.25"
      stroke={color}
      strokeWidth="2"
    />
  </StyledSvg>
);

export default BigArrow;

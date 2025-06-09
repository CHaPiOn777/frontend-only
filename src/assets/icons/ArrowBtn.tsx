import React from "react";
import { StyledSvg } from "./Icon.syles";
import { theme } from "@/styles/theme";
import { ArrowBtnIconProps } from "./types";

const ArrowBtn: React.FC<ArrowBtnIconProps> = ({
  width = 50,
  height = 50,
  color = theme.colors.primary,
  onClick,
  isLeft = false,
  className,
  style,
  fill = "transparent",
  disabled = false,
  isShadow = false,
  isBorder = true,
}) => (
  <StyledSvg
    $isShadow={isShadow}
    width={width}
    height={height}
    viewBox="0 0 50 50"
    $fill={fill}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: onClick ? "pointer" : "default", ...style }}
    className={className}
    $isLeft={isLeft}
    $disabled={disabled}
  >
    <circle
      cx="25"
      cy="25"
      r="24.5"
      transform="matrix(-1 0 0 1 50 0)"
      stroke={isBorder ? `${theme.colors.primary50}` : "transparent"}
      strokeOpacity="0.5"
    />
    <path
      d="M27.4999 18.75L21.2499 25L27.4999 31.25"
      stroke={color}
      strokeWidth="2"
    />
  </StyledSvg>
);

export default ArrowBtn;

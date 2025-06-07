import React from "react";
import styled from "styled-components";

import { variantStyles } from "./Text.styles";
import { theme } from "@/styles/theme";

export type TextVariant =
  | "display56"
  | "title20"
  | "hero200"
  | "caption14"
  | "uppercase25"
  | "body20";

export type TextProps<T extends React.ElementType = "div"> = {
  as?: T;
  variant?: TextVariant;
  children?: React.ReactNode;
  color?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;

const StyledText = styled.div<{
  variant: NonNullable<TextProps>["variant"];
  color: string;
}>`
  margin: 0;
  padding: 0;
  color: ${({ color }) => color};
  ${({ variant }) => variantStyles[variant || "body20"]}
`;

type CustomTextComponent = <T extends React.ElementType = "div">(
  props: TextProps<T> & { ref?: React.Ref<any> }
) => React.ReactElement | null;

const CustomText = React.forwardRef(
  <T extends React.ElementType = "div">(
    {
      as,
      variant = "body20",
      children,
      color = theme.colors.primary,
      ...rest
    }: TextProps<T>,
    ref?: React.Ref<any>
  ) => {
    return (
      <StyledText as={as} variant={variant} color={color} ref={ref} {...rest}>
        {children}
      </StyledText>
    );
  }
) as CustomTextComponent;

export default CustomText;

import styled from "styled-components";

export const StyledSvg = styled.svg<{ $isLeft?: boolean; $disabled?: boolean }>`
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transform: ${({ $isLeft }) => ($isLeft ? "rotate(0)" : "rotate(180deg)")};
  & circle {
    fill: transparent;
    transition: fill 0.2s ease;
  }
  ${({ $disabled }) =>
    !$disabled &&
    `
    &:hover circle {
      fill: #fff;
    }
    `}
`;

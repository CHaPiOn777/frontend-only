import styled from "styled-components";

export const StyledSvg = styled.svg<{
  $isLeft?: boolean;
  $disabled?: boolean;
  $fill?: string;
  $isShadow?: boolean;
}>`
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transform: ${({ $isLeft }) => ($isLeft ? "rotate(0)" : "rotate(180deg)")};
  & circle {
    fill: ${({ $fill }) => $fill};
    transition: fill 0.2s ease;
  }

  border-radius: 50px;
  box-shadow: ${({ $isShadow }) =>
    $isShadow ? "0px 0px 15px 0px #3877EE1A" : "none"};

  ${({ $disabled }) =>
    !$disabled &&
    `
    @media (hover: hover) and (pointer: fine) {
      &:hover circle {
        fill: #fff;
      }
    }
  `}
`;

import React, { memo, RefObject, useMemo } from "react";
import TimelineDot from "./TimelineDot";
import { styled } from "styled-components";
import { mocData } from "@/shared/lib/mocData";
import { useFadeTransition } from "@/shared/hooks/useFadeTransition";
import { theme } from "@/styles/theme";
const StSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
export const defaultDeg = 360 / mocData.length;
export const offsetDeg = -defaultDeg;
const radius = 265;

const SVGContent = ({
  circleRef,
  handleDotClick,
  activePin,
  centerX,
  centerY,
}: {
  circleRef: React.RefObject<SVGSVGElement | null>;
  handleDotClick: (indx: number) => void;
  activePin: number;
  centerX: number;
  centerY: number;
}) => {
  const dots = useMemo(
    () =>
      mocData.map((item, i) => {
        const baseRad = (i * defaultDeg * Math.PI) / 180;
        const offsetRad = (60 * Math.PI) / 180;

        const angle = baseRad - offsetRad;

        return {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
          label: item.id,
        };
      }),
    [centerX, centerY, handleDotClick]
  );
  const { ref: refTitle, displayedValue } = useFadeTransition(activePin);

  return (
    <>
      <StSVG>
        <text
          x={dots[0].x + 40}
          y={dots[0].y + 5}
          fontSize="20px"
          fontWeight={700}
          fontFamily="PT Sans, sans-serif"
          ref={refTitle as RefObject<SVGTextElement>}
        >
          {mocData[displayedValue - 1].title}
        </text>
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke={theme.colors.primary10}
        />
        <line
          x1="0"
          y1="45%"
          x2="100%"
          y2="45%"
          stroke={theme.colors.primary10}
        />
      </StSVG>
      <StSVG style={{ zIndex: 200 }} ref={circleRef}>
        <circle
          cx="50%"
          cy="45%"
          r={radius}
          fill="none"
          stroke={theme.colors.primary20}
        />

        {dots.map((d, idx) => (
          <TimelineDot
            handleDotClick={handleDotClick}
            activePin={activePin}
            key={idx + d.label}
            x={d.x}
            y={d.y}
            label={d.label}
          />
        ))}
      </StSVG>
    </>
  );
};

export default memo(SVGContent);

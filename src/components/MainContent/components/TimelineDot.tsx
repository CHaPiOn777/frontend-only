import React, { memo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { theme } from "@/styles/theme";

export interface TimelineDotProps {
  x: number;
  y: number;
  label: number;
  handleDotClick: (indx: number) => void;
  activePin: number;
}

const TimelineDot: React.FC<TimelineDotProps> = ({
  x,
  y,
  label,
  activePin,
  handleDotClick,
}) => {
  const groupRef = useRef<SVGGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const tlRef = useRef<gsap.core.Timeline>(null);
  const isActivePin = activePin === label;

  useLayoutEffect(() => {
    const group = groupRef.current;
    const circle = circleRef.current;
    const text = textRef.current;
    if (!group || !circle || !text) return;

    if (!isActivePin) {
      gsap.set(circle, {
        r: 4,
        fill: theme.colors.primary,
        stroke: "transparent",
      });
      gsap.set(text, { autoAlpha: 0, fontSize: "1px", fill: "transparent" });
    }

    const tl = gsap
      .timeline({ paused: true })
      .to(
        circle,
        {
          r: 26,
          fill: "#f4f5f9",
          stroke: theme.colors.accent,
          strokeWidth: 1,
          duration: 0.7,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        text,
        {
          autoAlpha: 1,
          fontSize: "20px",
          fill: theme.colors.primary,
          duration: 0.7,
          ease: "power4.inOut",
        },
        0
      );

    tlRef.current = tl;

    const onEnter = () => tl.play();
    const onLeave = () => {
      if (!isActivePin) tl.reverse();
    };
    if (isActivePin) {
      onEnter();
    } else {
      onLeave();
    }
    group.addEventListener("mouseenter", onEnter);
    group.addEventListener("mouseleave", onLeave);

    return () => {
      group.removeEventListener("mouseenter", onEnter);
      group.removeEventListener("mouseleave", onLeave);
      tl.kill();
    };
  }, [isActivePin]);
  return (
    <>
      <g
        ref={groupRef}
        transform={`translate(${x}, ${y})`}
        style={{ cursor: "pointer" }}
        onClick={() => handleDotClick(label)}
      >
        <circle cx={0} cy={0} r={30} fill="transparent" pointerEvents="all" />
        <circle ref={circleRef} cx={0} cy={0} />

        <text
          ref={textRef}
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="PT Sans, sans-serif"
        >
          {label}
        </text>
      </g>
    </>
  );
};

export default memo(TimelineDot);

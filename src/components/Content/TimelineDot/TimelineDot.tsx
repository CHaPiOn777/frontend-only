import { theme } from "@/styles/theme";
import { memo, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";

type TimelineDotProps = {
  x: number;
  y: number;
  label: number;
  handleDotClick: (indx: number) => void;
  activePin: number;
};

const TimelineDot: React.FC<TimelineDotProps> = ({
  handleDotClick,
  x,
  y,
  label,
  activePin,
}) => {
  const groupRef = useRef<SVGGElement>(null);
  const isActivePin = useMemo(() => activePin === label, [activePin, label]);
  const tlRef = useRef<gsap.core.Timeline>(null);
  useLayoutEffect(() => {
    if (!groupRef.current) return;

    const ctx = gsap.context(() => {
      const circle = groupRef.current!.querySelector("circle")!;
      const text = groupRef.current!.querySelector("text")!;

      tlRef.current = gsap
        .timeline({ paused: true })
        .to(
          circle,
          {
            r: 26,
            duration: 0.4,
            ease: "power4.inOut",
            fill: "#f4f5f9",
            stroke: theme.colors.primary,
          },
          0
        )

        .to(
          text,
          {
            visibility: "visible",
            opacity: 1,
            display: "block",
            fill: theme.colors.primary,
            duration: 0.4,
          },
          0.2
        );

      groupRef.current!.addEventListener("mouseenter", () =>
        tlRef.current?.play()
      );

      groupRef.current!.addEventListener(
        "mouseleave",
        () => !isActivePin && tlRef.current?.reverse()
      );
    }, groupRef);

    return () => ctx.revert();
  }, [isActivePin]);

  return (
    <g
      style={{ cursor: "pointer" }}
      ref={groupRef}
      transform={`translate(${x}, ${y})`}
      width={126}
      height={126}
      onClick={() => handleDotClick(label)}
    >
      <circle
        cx={0}
        cy={0}
        r={isActivePin ? 26 : 4}
        fill={isActivePin ? "#f4f5f9" : theme.colors.primary}
        stroke={isActivePin ? theme.colors.primary : "transparent"}
        strokeWidth={1}
      />
      <text
        x={0}
        y={0}
        fontSize="20px"
        visibility={isActivePin ? "visble" : "hidden"}
        textAnchor="middle"
        dominantBaseline="middle"
        display={isActivePin ? "block" : "none"}
        fill={isActivePin ? theme.colors.primary : "transparent"}
        fontFamily="PT Sans, sans-serif"
      >
        {label}
      </text>
      <circle
        cx={0}
        cy={0}
        pointerEvents="all"
        r={30} /* <- задаём нужный радиус зоны наведения */
        fill="transparent" /* при прозрачном fill события всё равно ловятся */
      />
    </g>
  );
};

export default memo(TimelineDot);

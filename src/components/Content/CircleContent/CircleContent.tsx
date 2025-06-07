import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TimelineDot from "../TimelineDot/TimelineDot";
import { useContainerSize } from "@/shared/hooks/useContainerSize";
import CustomText from "@/assets/text/Text";
import { styled } from "styled-components";
import { theme } from "@/styles/theme";
import gsap from "gsap";

const offsetDeg = -60;
const radius = 265;
const offsetRad = (offsetDeg * Math.PI) / 180;

const StBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 90px;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
`;

const data = [
  { id: 1, startDate: 1980, endDate: 1985 },
  { id: 2, startDate: 1986, endDate: 1990 },
  { id: 3, startDate: 1991, endDate: 1995 },
  { id: 4, startDate: 1996, endDate: 2000 },
  { id: 5, startDate: 2001, endDate: 2005 },
  { id: 6, startDate: 2006, endDate: 2010 },
];

const CircleContent = ({
  containerRef,
  activePin,
  setActivePin,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  activePin: number;
  setActivePin: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const circleRef = useRef<any>(null);
  const { width, height } = useContainerSize(containerRef);
  const centerX = width * 0.5;
  const centerY = height * 0.45;
  const elStart = useRef<HTMLSpanElement>(null);
  const elEnd = useRef<HTMLSpanElement>(null);

  const activeValue = useMemo(
    () => data.filter(({ id }) => id === activePin)[0],
    [activePin]
  );
  const prevStart = useRef(activeValue.startDate);
  const prevEnd = useRef(activeValue.endDate);

  const animatedDates = useCallback(
    (
      value: React.RefObject<number>,
      newDate: number,
      ref: React.RefObject<HTMLSpanElement | null>
    ) => {
      const obj = { val: value.current };
      gsap.to(obj, {
        val: newDate,
        duration: 0.6,
        ease: "power1.out",
        snap: { val: 1 },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = String(obj.val);
        },
      });
      value.current = newDate;
    },
    [activeValue]
  );

  useEffect(() => {
    animatedDates(prevStart, activeValue.startDate, elStart);
    animatedDates(prevEnd, activeValue.endDate, elEnd);
  }, [activeValue]);

  const handleDotClick = useCallback(
    (indx: number) => {
      setActivePin(indx);
      const ancle = -indx * 60 - offsetDeg;

      const tl = gsap.timeline();

      tl.to(circleRef.current, {
        rotation: ancle,
        transformOrigin: `${centerX}px ${centerY}px`,
        ease: "power1.inOut",
        duration: 0.5,
      });
      tl.to(
        circleRef.current!.querySelectorAll("g"),
        {
          rotation: -ancle,
          transformOrigin: "50% 50%",
          duration: 0.5,
          ease: "power1.inOut",
        },
        0
      );
    },
    [width, height]
  );

  const dots = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const baseRad = (i * 60 * Math.PI) / 180;
        const angle = baseRad + offsetRad;
        return {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
          label: i + 1,
        };
      }),
    [centerX, centerY]
  );
  return (
    <>
      <StBox>
        <CustomText
          ref={elStart}
          color={theme.colors.blue}
          variant="hero200"
          as="h2"
        >
          {activeValue.startDate}
        </CustomText>
        <CustomText
          ref={elEnd}
          color={theme.colors.red}
          variant="hero200"
          as="h2"
        >
          {activeValue.endDate}
        </CustomText>
      </StBox>

      <svg>
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e0e0e0" />
        <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#e0e0e0" />
      </svg>
      <svg style={{ zIndex: 200 }} ref={circleRef}>
        <circle cx="50%" cy="45%" r="265" fill="none" stroke="#c0c0c0" />

        {dots.map((d, idx) => (
          <TimelineDot
            handleDotClick={handleDotClick}
            activePin={activePin}
            key={idx}
            x={d.x}
            y={d.y}
            label={d.label}
          />
        ))}
      </svg>
    </>
  );
};

export default memo(CircleContent);

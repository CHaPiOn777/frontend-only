import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useContainerSize } from "@/shared/hooks/useContainerSize";
import { styled } from "styled-components";
import gsap from "gsap";
import { mocData } from "@/shared/lib/mocData";
import YearsText from "./components/YearsText";
import SVGContent, { defaultDeg, offsetDeg } from "./components/SVGContent";
import NavigationBtns from "./components/NavigationBtns";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

const MainContent = ({
  containerRef,
  activePin,
  setActivePin,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  activePin: number;
  setActivePin: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const circleRef = useRef<SVGSVGElement>(null);
  const { width, height } = useContainerSize(containerRef);
  const centerX = width * 0.5;
  const centerY = height * 0.45;
  const elStart = useRef<HTMLSpanElement>(null);
  const elEnd = useRef<HTMLSpanElement>(null);
  const isMobile = useIsMobile();

  const activeValue = useMemo(
    () => mocData.filter(({ id }) => id === activePin)[0],
    [activePin]
  );
  const prevStart = useRef(activeValue.startDate);
  const prevEnd = useRef(activeValue.endDate);

  const animatedDates = (
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
  };

  useEffect(() => {
    animatedDates(prevStart, activeValue.startDate, elStart);
    animatedDates(prevEnd, activeValue.endDate, elEnd);
  }, [activeValue]);

  const handleDotClick = useCallback(
    (indx: number) => {
      setActivePin(indx);
      if (isMobile) return;

      const rawAngle = -indx * defaultDeg - offsetDeg;

      const currentRotation =
        Number(gsap.getProperty(circleRef.current, "rotation")) || 0;

      const currNorm = ((currentRotation % 360) + 360) % 360;
      const targetNorm = ((rawAngle % 360) + 360) % 360;

      let delta = targetNorm - currNorm;
      if (delta > 180) delta -= 360;
      if (delta <= -180) delta += 360;

      const tl = gsap.timeline();

      tl.to(circleRef.current, {
        rotation: `+=${delta}`,
        transformOrigin: `${centerX}px ${centerY}px`,
        duration: 0.5,
        ease: "power1.inOut",
      });
      tl.to(
        circleRef.current!.querySelectorAll("g"),
        {
          rotation: `-=${delta}`,
          transformOrigin: "50% 50%",
          duration: 0.5,
          ease: "power1.inOut",
        },
        0
      );
    },
    [width, height, isMobile]
  );

  const handleClickBtn = useCallback(
    (value: number) => {
      setActivePin(value);
      handleDotClick(value);
    },
    [width, height, isMobile]
  );

  return (
    <StContainer>
      <YearsText activeValue={activeValue} elStart={elStart} elEnd={elEnd} />

      {!isMobile && (
        <SVGContent
          circleRef={circleRef}
          centerX={centerX}
          centerY={centerY}
          handleDotClick={handleDotClick}
          activePin={activePin}
        />
      )}
      <NavigationBtns
        activeValue={activeValue}
        handleClickBtn={handleClickBtn}
        activePin={activePin}
      />
    </StContainer>
  );
};

export default memo(MainContent);

import { useRef, useLayoutEffect, useState } from "react";
import { styled } from "styled-components";

import CustomText from "@/assets/text/Text";
import MainContent from "@/components/MainContent/MainContent";
import gsap from "gsap";

import { theme } from "@/styles/theme";
import Slider from "@/components/Slider/Slider";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
const StMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  overflow: hidden;
  margin: 0 160px 0 320px;
  height: 100vh;
  border-left: 1px solid ${theme.colors.primary10};
  border-right: 1px solid ${theme.colors.primary10};
  @media (max-width: 1440px) {
    margin: 0;
  }
`;
const StBox = styled.div`
  padding: 170px 80px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  @media (max-width: 1440px) {
    padding: 60px 20px;
  }
`;
const StBoxLine = styled.div`
  width: 5px;
  height: 120px;
  background: linear-gradient(180deg, #3877ee -5%, #ef5da8 85%);
  position: absolute;
  top: 10px;
  left: -80px;
`;

const Main = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const isMobile = useIsMobile();

  const [activePin, setActivePin] = useState<number>(1);
  useLayoutEffect(() => {
    if (containerRef.current) {
      setReady(true);
    }
  }, [containerRef.current]);

  useLayoutEffect(() => {
    if (ready) {
      gsap.from(containerRef.current, {
        opacity: 0,
        delay: 0.5,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [ready]);
  return (
    <StMainContainer ref={containerRef}>
      <StBox>
        <div style={{ position: "relative" }}>
          <CustomText variant="display56" as="h1">
            Исторические <span style={{ display: "block" }}>даты</span>
          </CustomText>
          {!isMobile && <StBoxLine />}
        </div>
        {ready && (
          <MainContent
            setActivePin={setActivePin}
            activePin={activePin}
            containerRef={containerRef}
          />
        )}
        <Slider activePin={activePin} />
      </StBox>
    </StMainContainer>
  );
};

export default Main;

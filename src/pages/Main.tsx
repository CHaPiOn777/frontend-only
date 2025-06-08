import { useRef, useLayoutEffect, useState, RefObject } from "react";
import { styled } from "styled-components";

import CustomText from "@/assets/text/Text";
import MainContent from "@/components/MainContent/MainContent";
import { mocData } from "@/shared/lib/mocData";
import gsap from "gsap";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { theme } from "@/styles/theme";
import { useFadeTransition } from "@/shared/hooks/useFadeTransition";
import { LeftArrow, RightArrow } from "@/assets/icons";

const StMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  border: 5px solid red;
  overflow: hidden;
  margin: 0 160px 0 320px;
  height: 100vh;
`;
const StBox = styled.div`
  padding: 170px 80px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
const StSwiper = styled(Swiper)`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;

  will-change: transform, transition;
  & > div {
    display: flex;
  }
`;
const StBoxSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 320px;
`;
const StBoxBtns = styled.div`
  display: flex;
  width: calc(100% + 160px);
  padding: 0 20px;
  position: absolute;
  left: -80px;
  pointer-events: none;
  top: calc(50% - 20px);
  transform: translate(0, -50%);
  justify-content: space-between;
`;

const Main = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [activePin, setActivePin] = useState<number>(1);
  const swiperRef = useRef<any>(null);
  useLayoutEffect(() => {
    if (containerRef.current) {
      setReady(true);
    }
  }, [containerRef.current]);

  const { ref: refSliderContainer, displayedValue } =
    useFadeTransition(activePin);

  return (
    <StMainContainer ref={containerRef}>
      <StBox>
        <CustomText style={{ width: "353px" }} variant="display56" as="h1">
          Исторические даты
        </CustomText>
        {ready && (
          <MainContent
            setActivePin={setActivePin}
            activePin={activePin}
            containerRef={containerRef}
          />
        )}
        <div
          style={{ zIndex: "200", position: "relative" }}
          ref={refSliderContainer as RefObject<HTMLDivElement>}
        >
          <StSwiper
            modules={[Navigation]}
            navigation={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onReachBeginning={() => setIsAtStart(true)}
            onReachEnd={() => setIsAtEnd(true)}
            onSlideChange={(s) => {
              setIsAtStart(s.isBeginning);
              setIsAtEnd(s.isEnd);
            }}
            slidesPerView={"auto"}
            slidesPerGroup={1}
            slidesOffsetBefore={0}
            spaceBetween={80}
            grabCursor={true}
          >
            {mocData[displayedValue - 1].facts.map(({ year, desc }, index) => (
              <StBoxSlide key={index}>
                <CustomText
                  color={theme.colors.blue}
                  as="h3"
                  variant="uppercase25"
                >
                  {year}
                </CustomText>
                <CustomText as="p" variant="body20">
                  {desc}
                </CustomText>
              </StBoxSlide>
            ))}
          </StSwiper>
          <StBoxBtns>
            <LeftArrow
              style={{
                opacity: !isAtStart ? 1 : 0,
                transition: "all 0.3s ease",
              }}
              isShadow
              width={40}
              height={40}
              fill="#fff"
              onClick={() => swiperRef.current?.slidePrev()}
            />

            <RightArrow
              isShadow
              style={{ opacity: !isAtEnd ? 1 : 0, transition: "all 0.3s ease" }}
              width={40}
              height={40}
              fill="#fff"
              onClick={() => swiperRef.current?.slideNext()}
            />
          </StBoxBtns>
        </div>
      </StBox>
    </StMainContainer>
  );
};

export default Main;

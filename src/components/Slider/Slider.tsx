import { RefObject, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TSwiper from "swiper";
import { mocData } from "@/shared/lib/mocData";
import { useFadeTransition } from "@/shared/hooks/useFadeTransition";
import CustomText from "@/assets/text/Text";
import { theme } from "@/styles/theme";
import BtnsSlider from "./BtnsSlider";
import { useIsMobile } from "@/shared/hooks/useIsMobile";

const SwiperContainer = styled.div`
  z-index: 200;
  position: relative;
  @media (max-width: 520px) {
    height: 400px;
    border-top: 1px solid ${theme.colors.primary50};
    padding-top: 20px;
  }
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
  @media (max-width: 520px) {
    margin-top: auto;
  }
`;
const StBoxSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 320px;
  @media (max-width: 520px) {
    min-width: 200px;
  }
`;
const Slider = ({ activePin }: { activePin: number }) => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const swiperRef = useRef<TSwiper | null>(null);
  const isMobile = useIsMobile();

  const { ref: refSliderContainer, displayedValue } = useFadeTransition(
    activePin,
    { y: 10 }
  );
  const { ref: refTitle, displayedValue: textDispValue } =
    useFadeTransition(activePin);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0, 0);
      setIsAtStart(true);
      setIsAtEnd(false);
    }
  }, [displayedValue]);

  return (
    <>
      {isMobile && (
        <CustomText
          style={{ marginTop: "-100px", paddingBottom: "20px" }}
          as="p"
          variant="title20"
          ref={refTitle}
        >
          {mocData[textDispValue - 1].title}
        </CustomText>
      )}
      <SwiperContainer
        style={{}}
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
          spaceBetween={isMobile ? 25 : 80}
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
        {!isMobile && (
          <BtnsSlider
            isAtStart={isAtStart}
            isAtEnd={isAtEnd}
            swiperRef={swiperRef}
          />
        )}
      </SwiperContainer>
    </>
  );
};

export default Slider;

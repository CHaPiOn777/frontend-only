import { LeftArrow, RightArrow } from "@/assets/icons";
import { RefObject } from "react";
import { styled } from "styled-components";
import TSwiper from "swiper";

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
  z-index: 201;
`;
const BtnsSlider = ({
  isAtStart,
  isAtEnd,
  swiperRef,
}: {
  isAtStart: boolean;
  isAtEnd: boolean;
  swiperRef: RefObject<TSwiper | null>;
}) => {
  return (
    <StBoxBtns>
      <LeftArrow
        isShadow
        isBorder={false}
        style={{
          opacity: !isAtStart ? 1 : 0,
          transition: "all 0.3s ease",
        }}
        width={40}
        height={40}
        fill="#fff"
        onClick={() => swiperRef.current?.slidePrev()}
      />

      <RightArrow
        isShadow
        isBorder={false}
        style={{ opacity: !isAtEnd ? 1 : 0, transition: "all 0.3s ease" }}
        width={40}
        height={40}
        fill="#fff"
        onClick={() => swiperRef.current?.slideNext()}
      />
    </StBoxBtns>
  );
};

export default BtnsSlider;

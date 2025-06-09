import { LeftArrow, RightArrow } from "@/assets/icons";
import CustomText from "@/assets/text/Text";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { mocData, TMocData } from "@/shared/lib/mocData";
import { theme } from "@/styles/theme";
import { memo } from "react";
import { styled } from "styled-components";
const StBoxBtns = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 520px) {
    gap: 8px;
  }
`;
const StNavigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  top: calc(45% + 217px);
  left: 80px;
  z-index: 200;
  @media (max-width: 520px) {
    left: 20px;
    top: auto;
    bottom: 20px;
    gap: 10px;
  }
`;

const StPagination = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  left: 50%;
  top: auto;
  bottom: 30px;
  transform: translate(-50%, 0);
`;
const StPaginationItem = styled.div<{ $isActive: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50px;
  background: ${theme.colors.primary};
  transition: all 0.3s ease;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.4)};
`;

const NavigationBtns = ({
  activeValue,
  handleClickBtn,
  activePin,
}: {
  activeValue: TMocData;
  handleClickBtn: (value: number) => void;
  activePin: number;
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      <StNavigation>
        <CustomText as="p" variant="caption14">
          {`0${activeValue.id}/0${mocData.length}`}
        </CustomText>
        <StBoxBtns>
          <LeftArrow
            width={isMobile ? 25 : 50}
            height={isMobile ? 25 : 50}
            disabled={activeValue.id === 1}
            onClick={() => handleClickBtn(activePin - 1)}
          />
          <RightArrow
            width={isMobile ? 25 : 50}
            height={isMobile ? 25 : 50}
            disabled={activeValue.id === mocData.length}
            onClick={() => handleClickBtn(activePin + 1)}
          />
        </StBoxBtns>
      </StNavigation>
      {isMobile && (
        <StPagination>
          {mocData.map((_, index) => (
            <StPaginationItem
              $isActive={index + 1 === activePin}
              onClick={() => handleClickBtn(index + 1)}
              key={index}
            />
          ))}
        </StPagination>
      )}
    </>
  );
};

export default memo(NavigationBtns);

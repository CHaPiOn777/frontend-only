import { LeftArrow, RightArrow } from "@/assets/icons";
import CustomText from "@/assets/text/Text";
import { mocData, TMocData } from "@/shared/lib/mocData";
import { memo } from "react";
import { styled } from "styled-components";
const StBoxBtns = styled.div`
  display: flex;
  gap: 20px;
`;
const StNavigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  top: calc(45% + 217px);
  left: 80px;
  z-index: 200;
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
  return (
    <StNavigation>
      <CustomText as="p" variant="caption14">
        {`0${activeValue.id}/0${mocData.length}`}
      </CustomText>
      <StBoxBtns>
        <LeftArrow
          disabled={activeValue.id === 1}
          onClick={() => handleClickBtn(activePin - 1)}
        />
        <RightArrow
          disabled={activeValue.id === mocData.length}
          onClick={() => handleClickBtn(activePin + 1)}
        />
      </StBoxBtns>
    </StNavigation>
  );
};

export default memo(NavigationBtns);

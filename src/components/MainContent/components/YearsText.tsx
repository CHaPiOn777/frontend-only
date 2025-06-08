import CustomText from "@/assets/text/Text";
import { TMocData } from "@/shared/lib/mocData";
import { theme } from "@/styles/theme";
import React, { memo } from "react";
import { styled } from "styled-components";
const StBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 90px;
  z-index: 100;
  position: absolute;
  top: 45%;
  left: 50%;

  transform: translate(-50%, -50%);
`;
const YearsText = ({
  activeValue,
  elStart,
  elEnd,
}: {
  activeValue: TMocData;
  elStart: React.RefObject<HTMLSpanElement | null>;
  elEnd: React.RefObject<HTMLSpanElement | null>;
}) => {
  return (
    <StBox>
      <CustomText
        ref={elStart}
        color={theme.colors.secondary}
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
  );
};

export default memo(YearsText);

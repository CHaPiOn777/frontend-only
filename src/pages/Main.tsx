import { useRef, useLayoutEffect, useState } from "react";
import { styled } from "styled-components";
import CircleContent from "@/components/Content/CircleContent/CircleContent";
import CustomText from "@/assets/text/Text";

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
  padding: 170px 80px;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  & svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Main = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  console.count();
  useLayoutEffect(() => {
    if (containerRef.current) {
      setReady(true);
    }
  }, [containerRef.current]);

  return (
    <StMainContainer ref={containerRef}>
      <StBox>
        <CustomText style={{ width: "353px" }} variant="display56" as="h1">
          Исторические даты
        </CustomText>
        {ready && <CircleContent containerRef={containerRef} />}
      </StBox>
      {/* <LeftArrow isLeft onClick={() => console.log("Назад")} />
      <RightArrow onClick={() => console.log("вперед")} /> */}
    </StMainContainer>
  );
};

export default Main;

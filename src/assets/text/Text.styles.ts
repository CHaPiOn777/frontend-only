import { css } from "styled-components";

export const variantStyles = {
  caption14: css`
    font-family: "PT Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0;
  `,
  title20: css`
    font-family: "PT Sans", sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0;
    letter-spacing: 0;
    @media (max-width: 520px) {
      font-size: 14px;
    }
  `,
  body20: css`
    font-family: "PT Sans", sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0;
    @media (max-width: 520px) {
      font-size: 14px;
      line-height: 145%;
    }
  `,
  uppercase25: css`
    font-family: "Bebas Neue";
    font-weight: 400;
    font-size: 25px;
    line-height: 120%;
    letter-spacing: 0;
    text-transform: uppercase;
    @media (max-width: 520px) {
      font-size: 16px;
    }
  `,
  display56: css`
    font-family: "PT Sans", sans-serif;
    font-weight: 700;
    font-size: 56px;
    line-height: 120%;
    letter-spacing: 0;
    @media (max-width: 520px) {
      font-size: 20px;
    }
  `,
  hero200: css`
    font-family: "PT Sans", sans-serif;
    font-weight: 700;
    font-size: 200px;
    line-height: 160px;
    letter-spacing: -2%;
    text-align: center;
    @media (max-width: 520px) {
      // по макету 56px но по ощущениям мало поэтому увеличил до 72px
      font-size: 72px;
    }
  `,
};

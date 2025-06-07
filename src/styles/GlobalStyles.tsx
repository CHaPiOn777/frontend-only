// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/pt-sans";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
/* width: 1920px;
    height: 1080px; */
    /* padding: 0 160px 0 320px; */
    max-width: 100vw;
    
    max-height: 100vh;

  }
  
  html, body {

    /* width: 1920px;
    height: 1080px; */
    font-family: 'PT Sans', sans-serif;
    background-color: #f4f5f9;
    
  }

  #root {
    min-height: 100vh;
  }
`;

export default GlobalStyles;

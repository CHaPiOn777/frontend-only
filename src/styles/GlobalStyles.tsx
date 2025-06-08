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

  
  html, body {
    font-family: 'PT Sans', sans-serif;
    background-color: #f4f5f9;
    
  }


`;

export default GlobalStyles;

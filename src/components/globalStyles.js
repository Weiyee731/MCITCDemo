import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Helvetica !important;
    transition: all 0.50s linear;
  }
  
  Card{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};

  }

  `


  // font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
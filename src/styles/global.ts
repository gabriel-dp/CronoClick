"use client";

import { createGlobalStyle, DefaultTheme } from "styled-components";

export default createGlobalStyle<{ theme: DefaultTheme }>`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        -webkit-tap-highlight-color: transparent;
        
        ::selection {
            background-color: ${(props) => props.theme.primary};
            color: ${(props) => props.theme.primaryText};
        }
    }

    body {
        background-color: ${(props) => props.theme.background};
        color: ${(props) => props.theme.text};
        transition: background 0.25s ease-in-out, color 0.25s ease-in-out;
    }

`;

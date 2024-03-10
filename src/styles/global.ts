"use client";

import { createGlobalStyle } from "styled-components";

import { AppTheme } from "@/styles/themes";

export default createGlobalStyle<{ theme: AppTheme }>`
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

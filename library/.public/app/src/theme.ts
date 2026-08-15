import { createGlobalStyle } from 'styled-components';

export const ink = '#1d2327';
export const faint = '#6b7680';
export const rule = '#d8d3ca';
export const ground = '#f4f1ea';
export const mark = '#1e3a4a';

export const GlobalStyle = createGlobalStyle`
    body {
        background: ${ground};
        color: ${ink};
        font-family: 'Cormorant Garamond', Georgia, serif;
        overflow: auto;
    }
`;

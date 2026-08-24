import { createGlobalStyle } from 'styled-components';
import { dressing } from './dressing';

// THE APPLICATION READS THE SAME OBJECT THE BOOKS DO. These were five literals
// beside a stylesheet; they are the theme's own answers now, so changing the
// theme moves the chrome and the books together rather than one of them.

export const ink = dressing.ink;
export const faint = dressing.faint;
export const rule = dressing.rule;
export const ground = dressing.ground;
export const mark = dressing.accent;
export const measure = dressing.measure;
export const leading = dressing.leading;
export const rhythm = dressing.rhythm;
export const face = dressing.face;
export const mono = dressing.mono;

export const GlobalStyle = createGlobalStyle`
    body {
        background: ${ground};
        color: ${ink};
        font-family: ${face};
        -webkit-font-smoothing: antialiased;
        overflow: auto;
    }
`;

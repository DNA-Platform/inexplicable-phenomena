import styled, { css } from 'styled-components';

const frameBase = css`
    margin: 20px 0;
    padding: 14px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border-radius: 0 3px 3px 0;
`;

const labelBase = css`
    font-family: ${(p) => p.theme.font.sans};
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 8px;
`;

export const CalloutBody = styled.div`
    font-family: ${(p) => p.theme.font.body};
    font-size: ${(p) => p.theme.type.body};
    color: ${(p) => p.theme.color.inkSoft};
    line-height: 1.6;
`;

// One styled pair per Callout variant — the styled-component knows its accent.

export const NoteFrame = styled.section`
    ${frameBase}
    border-left: 2px solid ${(p) => p.theme.color.muted};
`;
export const NoteLabel = styled.header`
    ${labelBase}
    color: ${(p) => p.theme.color.muted};
`;

export const DefinitionFrame = styled.section`
    ${frameBase}
    border-left: 2px solid ${(p) => p.theme.color.theme};
`;
export const DefinitionLabel = styled.header`
    ${labelBase}
    color: ${(p) => p.theme.color.theme};
`;

export const RulesFrame = styled.section`
    ${frameBase}
    border-left: 2px solid ${(p) => p.theme.color.ink};
`;
export const RulesLabel = styled.header`
    ${labelBase}
    color: ${(p) => p.theme.color.ink};
`;

export const PitfallFrame = styled.section`
    ${frameBase}
    border-left: 2px solid ${(p) => p.theme.color.pending};
`;
export const PitfallLabel = styled.header`
    ${labelBase}
    color: ${(p) => p.theme.color.pending};
`;

export const DeepDiveFrame = styled.section`
    ${frameBase}
    border-left: 2px solid ${(p) => p.theme.color.muted};
`;
export const DeepDiveLabel = styled.header`
    ${labelBase}
    color: ${(p) => p.theme.color.muted};
`;

export const InTheLabFrame = styled.section`
    ${frameBase}
    border-left: 2px solid ${(p) => p.theme.color.themeBright};
`;
export const InTheLabLabel = styled.header`
    ${labelBase}
    color: ${(p) => p.theme.color.themeBright};
`;

export const SeeAlsoFrame = styled.section`
    ${frameBase}
    border-left: 2px solid ${(p) => p.theme.color.muted};
`;
export const SeeAlsoLabel = styled.header`
    ${labelBase}
    color: ${(p) => p.theme.color.muted};
`;

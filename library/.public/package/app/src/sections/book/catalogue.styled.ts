import styled, { keyframes } from 'styled-components';

const rule = keyframes`
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
`;

const settle = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const Field = styled.div`
    perspective: 2400px;
    height: 100vh;
    overflow: hidden;
    background: #0c0e11;
`;

export const Stage = styled.div<{ $turned: boolean }>`
    position: relative;
    height: 100vh;
    transform-style: preserve-3d;
    transform: rotateY(${(p) => (p.$turned ? -180 : 0)}deg);
    transition: transform 1250ms cubic-bezier(0.72, 0.02, 0.18, 1);
`;

export const Face = styled.div`
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    overflow: hidden;
`;

export const Reverse = styled(Face)`
    transform: rotateY(180deg);
`;

export const Leaf = styled.div`
    height: 100vh;
    overflow-y: auto;
    background:
        radial-gradient(1200px 700px at 50% 0%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 62%),
        linear-gradient(180deg, #eae4d8 0%, #e3dccd 58%, #dcd4c3 100%);
`;

export const Column = styled.div`
    max-width: 640px;
    margin: 0 auto;
    padding: 13vh 6vw 12vh;
`;

export const Turnable = styled.span`
    cursor: pointer;
    transition: color 260ms ease;

    &:hover {
        color: #e6e1d8;
    }
`;

export const Standing = styled.h1`
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 400;
    font-size: clamp(2rem, 4.2vw, 3rem);
    letter-spacing: 0.01em;
    color: #23262a;
    cursor: pointer;
    transition: color 260ms ease;
    animation: ${settle} 700ms 460ms ease-out both;

    &:hover {
        color: #5b2f2a;
    }
`;

export const Preamble = styled.p`
    margin: 18px 0 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 15.5px;
    font-style: italic;
    line-height: 1.75;
    color: rgba(52, 55, 60, 0.72);
    animation: ${settle} 700ms 620ms ease-out both;
`;

export const Entries = styled.ol`
    list-style: none;
    margin: 8vh 0 0;
    padding: 0;
`;

export const Entry = styled.li<{ $ink: string; $i: number }>`
    position: relative;
    padding: 0 0 0 26px;
    margin-bottom: 6vh;
    animation: ${settle} 700ms ${(p) => 740 + p.$i * 130}ms ease-out both;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 4px;
        bottom: 4px;
        width: 3px;
        border-radius: 2px;
        background: ${(p) => p.$ink};
        transform-origin: top;
        animation: ${rule} 620ms ${(p) => 820 + p.$i * 130}ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    &:hover h2 {
        color: ${(p) => p.$ink};
    }
`;

export const EntryTitle = styled.h2`
    margin: 0;
    cursor: pointer;
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 400;
    font-size: clamp(1.28rem, 2.4vw, 1.7rem);
    line-height: 1.3;
    color: #23262a;
    transition: color 220ms ease;
`;

export const EntryNote = styled.p`
    margin: 10px 0 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 15px;
    line-height: 1.8;
    color: rgba(52, 55, 60, 0.78);
`;

export const Colophon = styled.p`
    margin: 9vh 0 0;
    padding-top: 22px;
    border-top: 1px solid rgba(52, 55, 60, 0.16);
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 13px;
    font-style: italic;
    line-height: 1.8;
    color: rgba(52, 55, 60, 0.55);
    animation: ${settle} 700ms 1200ms ease-out both;
`;


export const Byline = styled.span`
    display: inline-block;
    margin-top: 9px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 13px;
    font-style: italic;
    color: rgba(52, 55, 60, 0.62);
    cursor: pointer;
    transition: color 220ms ease;

    &:hover {
        color: #8c3b1e;
    }
`;

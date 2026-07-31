import styled from 'styled-components';

export const Room = styled.div`
    height: 100vh;
    overflow: hidden;
    position: relative;
    background:
        radial-gradient(1100px 640px at 50% 58%, rgba(255, 255, 255, 0.028) 0%, rgba(255, 255, 255, 0) 70%),
        linear-gradient(180deg, #17191d 0%, #101216 55%, #0c0e11 100%);

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(90deg, rgba(12, 14, 17, 0.82) 0%, rgba(12, 14, 17, 0) 16%, rgba(12, 14, 17, 0) 84%, rgba(12, 14, 17, 0.82) 100%);
    }
`;

export const Caption = styled.div`
    position: absolute;
    top: 9vh;
    width: 100%;
    text-align: center;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 11.5px;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: rgba(196, 200, 205, 0.6);

    em {
        display: block;
        margin-top: 10px;
        font-size: 12px;
        font-style: italic;
        letter-spacing: 0.04em;
        text-transform: none;
        color: rgba(150, 155, 161, 0.5);
    }
`;

export const Board = styled.div`
    position: absolute;
    left: 0;
    bottom: 12vh;
    width: 100vw;
`;

export const Row = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 8px;
    width: 100vw;
    overflow: hidden;
`;

export const BoardTop = styled.div`
    height: 10px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.045);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 16px 34px -14px rgba(0, 0, 0, 0.7);
`;

export const BoardShadow = styled.div`
    height: 22px;
    background: radial-gradient(52% 100% at 50% 0%, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0) 70%);
`;

export const Spine = styled.div<{ $ink: string; $tall: number; $wide: number; $held?: boolean }>`
    position: relative;
    flex-shrink: 0;
    width: ${(p) => p.$wide}px;
    height: ${(p) => p.$tall}vh;
    background-color: ${(p) => p.$ink};
    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 40%, rgba(0, 0, 0, 0.1) 100%);
    border: 1px solid rgba(255, 255, 255, 0.055);
    border-radius: 3px;
    box-shadow:
        inset 1px 0 0 rgba(255, 255, 255, 0.06),
        0 8px 18px -8px rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(p) => (p.$held ? 'pointer' : 'default')};
    transition: transform 160ms ease, filter 160ms ease;

    ${(p) => p.$held && `
        &:hover {
            transform: translateY(-6px);
            filter: brightness(1.07);
        }
    `}
`;

export const SpineTitle = styled.span`
    writing-mode: vertical-rl;
    max-height: 86%;
    overflow: hidden;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 12.5px;
    letter-spacing: 0.12em;
    color: #cfc7b8;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
`;

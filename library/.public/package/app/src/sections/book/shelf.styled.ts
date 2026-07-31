import styled from 'styled-components';

export const Room = styled.div`
    height: 100vh;
    overflow: hidden;
    position: relative;
    background:
        radial-gradient(1040px 600px at 50% 56%, rgba(214, 160, 96, 0.17) 0%, rgba(120, 80, 44, 0.07) 46%, rgba(0, 0, 0, 0) 74%),
        radial-gradient(1500px 950px at 50% 28%, #251b12 0%, #170f0a 55%, #0b0806 100%);
    box-shadow: inset 0 0 190px 44px rgba(0, 0, 0, 0.55);
`;

export const PageLink = styled.a`
    position: absolute;
    top: 18px;
    left: 22px;
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    color: rgba(202, 169, 111, 0.5);
    text-decoration: none;
    transition: color 140ms;

    &:hover {
        color: rgba(224, 194, 138, 0.9);
    }
`;

export const Caption = styled.div`
    position: absolute;
    top: 8vh;
    width: 100%;
    text-align: center;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 12px;
    letter-spacing: 0.46em;
    text-transform: uppercase;
    color: rgba(202, 169, 111, 0.78);

    em {
        display: block;
        margin-top: 11px;
        font-size: 12.5px;
        font-style: italic;
        letter-spacing: 0.05em;
        text-transform: none;
        color: rgba(160, 132, 92, 0.62);
    }
`;

export const Board = styled.div`
    position: absolute;
    left: 50%;
    bottom: 10vh;
    transform: translateX(-50%);
    width: min(960px, 94vw);
`;

export const Row = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 7px;
    padding: 0 36px;
`;

export const BoardTop = styled.div`
    height: 15px;
    border-radius: 2px;
    background: linear-gradient(180deg, #6d4b2e 0%, #4a3018 42%, #2c1b0d 100%);
    box-shadow:
        inset 0 1px 0 rgba(255, 219, 166, 0.35),
        inset 0 -2px 3px rgba(0, 0, 0, 0.5),
        0 12px 26px -6px rgba(0, 0, 0, 0.75);
`;

export const BoardShadow = styled.div`
    height: 30px;
    background: radial-gradient(58% 100% at 50% 0%, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 72%);
`;

export const Spine = styled.div<{ $ink: string; $tall: number; $wide: number; $lean?: number; $held?: boolean }>`
    position: relative;
    flex-shrink: 0;
    width: ${(p) => p.$wide}px;
    height: ${(p) => p.$tall}vh;
    background-color: ${(p) => p.$ink};
    background-image:
        linear-gradient(180deg, rgba(255, 240, 214, 0.08) 0%, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 0.16) 76%, rgba(0, 0, 0, 0.3) 100%),
        linear-gradient(90deg, rgba(255, 238, 206, 0.2) 0%, rgba(255, 238, 206, 0.05) 15%, rgba(0, 0, 0, 0) 48%, rgba(0, 0, 0, 0.18) 84%, rgba(0, 0, 0, 0.38) 100%);
    border-radius: 3px 3px 1px 1px;
    box-shadow:
        inset 0 2px 0 rgba(255, 240, 210, 0.12),
        inset -1px 0 0 rgba(0, 0, 0, 0.3),
        0 9px 14px -5px rgba(0, 0, 0, 0.65);
    transform: rotate(${(p) => p.$lean ?? 0}deg);
    transform-origin: bottom ${(p) => ((p.$lean ?? 0) >= 0 ? 'right' : 'left')};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(p) => (p.$held ? 'pointer' : 'default')};
    transition: transform 170ms ease, filter 170ms ease;

    &::before {
        content: '';
        position: absolute;
        top: 7px;
        left: 3px;
        right: 3px;
        height: 3px;
        background: rgba(0, 0, 0, 0.3);
        box-shadow: 0 1px 0 rgba(255, 235, 195, 0.14);
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 9px;
        left: 3px;
        right: 3px;
        height: 3px;
        background: rgba(0, 0, 0, 0.26);
        box-shadow: 0 -1px 0 rgba(255, 235, 195, 0.1);
    }

    ${(p) => p.$held && `
        &:hover {
            transform: translateY(-9px) rotate(${p.$lean ?? 0}deg);
            filter: brightness(1.09);
        }
    `}
`;

export const SpineTitle = styled.span`
    writing-mode: vertical-rl;
    max-height: 84%;
    overflow: hidden;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 13px;
    letter-spacing: 0.13em;
    color: #d9bd85;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.55);
`;

export const Tooling = styled.span`
    position: absolute;
    top: 22px;
    left: 5px;
    right: 5px;
    height: 9px;
    border-top: 1px solid rgba(217, 189, 133, 0.22);
    border-bottom: 1px solid rgba(217, 189, 133, 0.14);
`;

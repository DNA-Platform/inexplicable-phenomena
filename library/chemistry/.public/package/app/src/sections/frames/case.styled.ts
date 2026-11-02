import styled from 'styled-components';

// ── Gallery layout ──────────────────────────────────────────────────────────

export const Gallery = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 34px;
    align-items: flex-end;
    justify-content: center;
    padding: 20px 0 10px;
`;

export const PictureCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

export const FrameLabel = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${(p) => p.theme.color.muted};
`;

// ── The picture itself — the shared view(), identical under every frame ──────

export const Scene = styled.div`
    position: relative;
    width: 150px;
    height: 110px;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    background: linear-gradient(180deg, #2a1a5e 0%, #6d3b9c 34%, #e8743b 72%, #f4b26a 100%);
`;

export const Sun = styled.div`
    position: absolute;
    top: 44px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: radial-gradient(circle, #fff3c4 0%, #ffd15c 55%, #ff9d4d 100%);
    box-shadow: 0 0 24px 8px #ffcf6e88;
`;

export const Hills = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 36px;
    background: linear-gradient(180deg, #1c2b2a 0%, #0d1716 100%);
    clip-path: polygon(0 40%, 22% 12%, 45% 46%, 68% 8%, 100% 38%, 100% 100%, 0 100%);
`;

export const Caption = styled.div`
    position: absolute;
    left: 8px;
    bottom: 6px;
    z-index: 2;
    font-family: ${(p) => p.theme.font.sans};
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 1px 3px #0008;
`;

// ── The frames — each wraps super.frame() (the picture) ──────────────────────

export const OrnateFrame = styled.div`
    padding: 11px;
    border-radius: 2px;
    background: linear-gradient(135deg, #8c6a12, #ffe08a 25%, #a9791a 50%, #ffe08a 75%, #8c6a12);
    border: 2px solid #6b4f0c;
    box-shadow: inset 0 0 0 3px #5a3f08, 0 6px 16px #0006;
`;

export const PolaroidFrame = styled.div`
    padding: 11px 11px 0;
    background: #fbfbf7;
    box-shadow: 0 8px 20px #0005;
    transform: rotate(-2.5deg);

    .pol-caption {
        padding: 9px 2px 13px;
        text-align: center;
        font-family: 'Segoe Script', 'Bradley Hand', cursive;
        font-size: 15px;
        color: #333;
    }
`;

export const MattedFrame = styled.div`
    padding: 8px;
    border-radius: 3px;
    background: linear-gradient(160deg, #2b2b33, #14141a);
    box-shadow: 0 12px 28px #0007;

    .mat {
        padding: 15px;
        background: #f3f0e9;
        box-shadow: inset 0 0 6px #0003;
    }
`;

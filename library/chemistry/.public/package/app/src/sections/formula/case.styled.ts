import styled from 'styled-components';

export const Bench = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    align-items: flex-start;
`;

export const Legend = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 700;
    color: ${(p) => p.theme.color.themeText};
    letter-spacing: 0.06em;
    text-transform: uppercase;
`;

export const Written = styled.code`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    color: ${(p) => p.theme.color.themeText};
    opacity: 0.75;
`;

export const Card = styled.div`
    width: 268px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 16px 16px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 8px;
    background: ${(p) => p.theme.color.paperRaised};
`;

export const CardTitle = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: ${(p) => p.theme.color.themeText};
`;

export const Meta = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    opacity: 0.7;
`;

export const Verdict = styled.div<{ $ok: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid ${(p) => (p.$ok ? '#A6E3A1' : '#F38BA8')};
    background: ${(p) => (p.$ok ? 'rgba(166, 227, 161, 0.10)' : 'rgba(243, 139, 168, 0.10)')};
`;

export const Kind = styled.div<{ $ok: boolean }>`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11.5px;
    font-weight: 700;
    color: ${(p) => (p.$ok ? '#40A02B' : '#D20F39')};
`;

export const Demand = styled.div`
    font-size: 11.5px;
    line-height: 1.5;
    opacity: 0.85;
`;

export const Chips = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`;

export const Chip = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10.5px;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid ${(p) => p.theme.color.rule};
`;

export const Loop = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    letter-spacing: 0.02em;
`;

export const Spine = styled.ol`
    margin: 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 11.5px;
`;

export const Strip = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3px 10px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
`;

export const Letter = styled.span`
    display: inline-block;
    width: 13px;
    opacity: 0.55;
`;

export const Arrow = styled.div<{ $closed: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    padding: 6px 8px;
    border-radius: 5px;
    border: 1px dashed ${(p) => (p.$closed ? '#40A02B' : '#D20F39')};
`;

export const Refusal = styled.div`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 12px;
    line-height: 1.6;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #F38BA8;
    background: rgba(243, 139, 168, 0.12);
    color: #F38BA8;
`;

export const Script = styled.div`
    width: 176px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 12px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 8px;
`;

export const Glyphs = styled.div`
    font-size: 19px;
    letter-spacing: 0.08em;
`;

export const Pair = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const Panel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px 16px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 8px;
    background: ${(p) => p.theme.color.paperRaised};
`;

export const Parts = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`;

export const Faults = styled.ul`
    margin: 0;
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 11px;
    color: #D20F39;
`;

export const Label = styled.span<{ $kind: string }>`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10px;
    padding: 1px 5px;
    border-radius: 3px;
    margin-right: 5px;
    border: 1px solid ${(p) => p.theme.color.rule};
    opacity: 0.8;
`;

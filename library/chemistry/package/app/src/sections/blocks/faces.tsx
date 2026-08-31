import styled from 'styled-components';

export const Card = styled.div`
    width: 100%;
    max-width: 560px;
    background: linear-gradient(158deg, #1b2039 0%, #14182e 100%);
    border: 1px solid #2c3358;
    border-radius: 16px;
    padding: 26px 28px;
    box-shadow: 0 18px 48px -20px rgba(0, 0, 0, 0.7);
`;

export const Prose = styled.p`
    margin: 0 0 20px;
    /* Fixed height so highlighting never reflows the page. */
    min-height: 150px;
    font-size: 19px;
    line-height: 1.72;
    color: #e6eaff;
    font-family: Georgia, 'Times New Roman', serif;
    b, strong { color: #ffd27a; font-weight: 700; }
    i, em { color: #9fd0ff; font-style: italic; }
    a { color: #7cf0c8; border-bottom: 1px dashed rgba(124, 240, 200, 0.55); cursor: pointer; }
`;

export const Mark = styled.mark`
    background: #ffd27a;
    color: #14182e;
    border-radius: 3px;
    padding: 0 2px;
    box-shadow: 0 0 0 1px rgba(255, 210, 122, 0.55), 0 0 14px -2px rgba(255, 210, 122, 0.6);
`;

export const Field = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    padding-top: 17px;
    border-top: 1px solid #2a3055;
`;

export const Input = styled.input`
    flex: 1;
    padding: 9px 14px;
    border-radius: 9px;
    background: #12162a;
    border: 1px solid #2c3358;
    color: #e6eaff;
    font-size: 15px;
    transition: border-color 0.15s;
    &:focus { outline: none; border-color: #3d4680; }
    &::placeholder { color: #5b6493; }
`;

export const Count = styled.span`
    font-size: 12px;
    letter-spacing: 0.06em;
    color: #7a86b8;
    min-width: 92px;
    text-align: right;
    font-variant-numeric: tabular-nums;
`;

export const Panel = styled.div`
    margin-top: 14px;
    padding: 12px 14px;
    border-radius: 10px;
    background: #12162a;
    border: 1px solid #242a4a;
    color: #cfd6ff;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 15px;
    line-height: 1.6;
    min-height: 34px;

    b, strong { color: #ffd27a; }
    i, em { color: #9fd0ff; }
`;

export const Label = styled.div`
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #6f7aad;
    margin-bottom: 6px;
`;

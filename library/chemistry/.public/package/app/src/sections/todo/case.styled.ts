import styled from 'styled-components';

export const TodoFrame = styled.div`
    max-width: 480px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    overflow: hidden;
`;

export const TodoHeader = styled.div`
    display: flex;
    gap: 8px;
    padding: 14px 16px;
    border-bottom: 1px solid ${(p) => p.theme.color.rule};
`;

export const TodoInput = styled.input`
    flex: 1;
    padding: 8px 12px;
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.ink};
    background: ${(p) => p.theme.color.paper};

    &:focus {
        outline: none;
        border-color: ${(p) => p.theme.color.theme};
    }
`;

export const AddButton = styled.button`
    padding: 8px 16px;
    border: 1px solid ${(p) => p.theme.color.theme};
    border-radius: 4px;
    background: ${(p) => p.theme.color.themeFaint};
    color: ${(p) => p.theme.color.themeText};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    font-weight: 600;

    &:hover { background: ${(p) => p.theme.color.themeSoft}; }
`;

export const TodoList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    min-height: 40px;
`;

export const TodoRow = styled.li<{ $done: boolean }>`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border-bottom: 1px solid ${(p) => p.theme.color.rule};
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => (p.$done ? p.theme.color.muted : p.theme.color.ink)};
    text-decoration: ${(p) => (p.$done ? 'line-through' : 'none')};
    transition: color 150ms, text-decoration 150ms;

    &:last-child { border-bottom: none; }
`;

export const Checkbox = styled.button<{ $checked: boolean }>`
    width: 20px;
    height: 20px;
    border: 2px solid ${(p) => (p.$checked ? p.theme.color.ok : p.theme.color.rule)};
    border-radius: 4px;
    background: ${(p) => (p.$checked ? p.theme.color.okBg : 'transparent')};
    color: ${(p) => p.theme.color.ok};
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 150ms, background 150ms;
`;

export const TodoText = styled.span`
    flex: 1;
`;

export const DeleteButton = styled.button`
    color: ${(p) => p.theme.color.mutedSoft};
    font-size: 16px;
    padding: 0 4px;
    opacity: 0.5;
    transition: opacity 100ms, color 100ms;

    &:hover {
        opacity: 1;
        color: ${(p) => p.theme.color.fail};
    }
`;

export const TodoFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    border-top: 1px solid ${(p) => p.theme.color.rule};
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.muted};
`;

export const TodoItemRow = styled.div`
    display: flex;
    align-items: center;
`;

export const TodoItemContent = styled.div`
    flex: 1;
`;

export const ClearButton = styled.button`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    color: ${(p) => p.theme.color.muted};
    text-decoration: underline;

    &:hover { color: ${(p) => p.theme.color.themeText}; }
`;

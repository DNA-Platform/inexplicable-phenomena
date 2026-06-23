import styled from 'styled-components';

export const ThreePane = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    background: ${(p) => p.theme.color.paper};
`;

export const ContentMain = styled.main`
    flex: 1;
    overflow-y: auto;
    background: ${(p) => p.theme.color.paper};
    display: flex;
    justify-content: flex-start;
`;

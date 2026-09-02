import React from 'react';
import type { ReactNode } from 'react';
import styledImport from 'styled-components';

export const dev = process.env.NODE_ENV !== 'production';

const seen = new Set<string>();

export function warn(message: string, once = true) {
    if (!dev) return;
    if (once) {
        if (seen.has(message)) return;
        seen.add(message);
    }
    console.warn(`$Chemistry: ${message}`);
}

export function error(message: string) {
    if (!dev) return;
    console.error(`$Chemistry: ${message}`);
}

const styled = ((styledImport as any).div ? styledImport : (styledImport as any).default) as typeof styledImport;

const Title = styled.div`
    font-weight: bold;
    color: #dc3545;
    margin-bottom: 8px;
    font-size: 13px;
`;

const Detail = styled.pre`
    white-space: pre-wrap;
    margin: 4px 0;
    color: #555;
`;

const Panel = styled.div`
    padding: 12px 16px;
    margin: 4px 0;
    background: #fff0f0;
    border: 2px solid #dc3545;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    line-height: 1.5;
    color: #333;
`;

const Warning = styled(Panel)`
    background: #fffbeb;
    border-color: #f59e0b;

    ${Title} {
        color: #b45309;
    }
`;

export function renderPanel(title: string, detail: string): ReactNode {
    return React.createElement(Panel, null,
        React.createElement(Title, null, `$Chemistry: ${title}`),
        React.createElement(Detail, null, detail)
    );
}

export function renderError(title: string, detail: string): ReactNode {
    if (!dev) return null;
    return renderPanel(title, detail);
}

export type $ExceptionMode = 'render' | 'silent' | 'throw';

export const $exceptions: {
    mode: $ExceptionMode;
    render?: (error: Error) => { view(): ReactNode };
} = { mode: dev ? 'render' : 'silent' };

export function renderException(error: Error): ReactNode {
    if ($exceptions.mode === 'silent') return null;
    const view = $exceptions.render?.(error).view();
    return view !== undefined ? view : renderPanel('Bond Constructor Failed', error.message);
}

export function renderWarning(title: string, detail: string): ReactNode {
    if (!dev) return null;
    return React.createElement(Warning, null,
        React.createElement(Title, null, `$Chemistry: ${title}`),
        React.createElement(Detail, null, detail)
    );
}

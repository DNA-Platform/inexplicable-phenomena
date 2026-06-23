import React from 'react';
import type { ReactNode } from 'react';

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

const panelStyle: React.CSSProperties = {
    padding: '12px 16px',
    margin: '4px 0',
    background: '#fff0f0',
    border: '2px solid #dc3545',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '12px',
    lineHeight: '1.5',
    color: '#333',
};

const titleStyle: React.CSSProperties = {
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: '8px',
    fontSize: '13px',
};

const detailStyle: React.CSSProperties = {
    whiteSpace: 'pre-wrap',
    margin: '4px 0',
    color: '#555',
};

const warnPanelStyle: React.CSSProperties = {
    ...panelStyle,
    background: '#fffbeb',
    border: '2px solid #f59e0b',
};

const warnTitleStyle: React.CSSProperties = {
    ...titleStyle,
    color: '#b45309',
};

export function renderError(title: string, detail: string): ReactNode {
    if (!dev) return null;
    return React.createElement('div', { style: panelStyle },
        React.createElement('div', { style: titleStyle }, `$Chemistry: ${title}`),
        React.createElement('pre', { style: detailStyle }, detail)
    );
}

export function renderWarning(title: string, detail: string): ReactNode {
    if (!dev) return null;
    return React.createElement('div', { style: warnPanelStyle },
        React.createElement('div', { style: warnTitleStyle }, `$Chemistry: ${title}`),
        React.createElement('pre', { style: detailStyle }, detail)
    );
}

import styledImport from 'styled-components';

export const styled = ((styledImport as { div?: unknown }).div
    ? styledImport
    : (styledImport as unknown as { default: typeof styledImport }).default) as typeof styledImport;

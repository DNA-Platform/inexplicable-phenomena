import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { renderPanel, renderWarning } from '@/implementation/dev';

describe('the dev panels are styled components — never a style attribute on HTML', () => {
    it('a panel renders through styled-components and carries no style attribute', () => {
        const { container } = render(<>{renderPanel('Bond Constructor Failed', 'a section opens with its title')}</>);
        const panel = container.firstElementChild as HTMLElement;
        expect(panel).not.toBeNull();
        expect(panel.getAttribute('style')).toBeNull();
        expect(panel.className).not.toBe('');
        expect(getComputedStyle(panel).borderRadius).toBe('4px');
        expect(panel.textContent).toContain('Bond Constructor Failed');
        expect(panel.querySelector('pre')?.getAttribute('style')).toBeNull();
    });

    it('a warning renders the same way, restyled by composition', () => {
        const { container } = render(<>{renderWarning('Same-type siblings', 'need keys')}</>);
        const panel = container.firstElementChild as HTMLElement;
        expect(panel).not.toBeNull();
        expect(panel.getAttribute('style')).toBeNull();
        expect(panel.className).not.toBe('');
        expect(panel.textContent).toContain('Same-type siblings');
    });
});

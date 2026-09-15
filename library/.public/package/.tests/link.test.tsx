import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { $, $Block, $check, styled } from '@dna-platform/chemistry';
import { $Section, $Format, Title, Heading, Paragraph, Reference, Fold, Section } from '@dna-platform/public';

class $BoxedFormat extends $Format {
    override selector: any = styled.aside;
    padding = '7px';
}
const BoxedFormat = $($BoxedFormat);

class $Boxed extends $Section {
    $Boxed(block: $Block) { super.$Section($check(block, $Block, '!').concat($check(BoxedFormat, '!'))); }
}
const Boxed = $($Boxed);

const drawn = (element: React.ReactNode) => {
    const held = $(element as never);
    const Drawn = $(held);
    return render(<Drawn />).container;
};

describe('a writing given a reference is drawn as a link', () => {
    it('ONE ANCHOR, ITS OWN ELEMENT — an a carrying the writing\'s classes and pd-meaning, the reference as its href, no anchor inside', () => {
        const host = drawn(<Section><Reference>https://example.org/</Reference><Heading>H</Heading><Paragraph>One.</Paragraph></Section>);
        const outer = host.firstElementChild!;
        expect(outer.tagName).toBe('A');
        expect(outer.getAttribute('href')).toBe('https://example.org/');
        expect(outer.classList.contains('pd-section')).toBe(true);
        expect(outer.classList.contains('pd-meaning')).toBe(true);
        expect(outer.querySelectorAll('a').length).toBe(0);
    });

    it('AND A FORMAT WORN BY IT IS THAT ANCHOR', () => {
        const host = drawn(<Boxed><Reference>https://example.org/</Reference><Heading>H</Heading><Paragraph>One.</Paragraph></Boxed>);
        const outer = host.firstElementChild!;
        expect(outer.tagName).toBe('A');
        expect(outer.getAttribute('href')).toBe('https://example.org/');
        expect(outer.classList.contains('pd-boxed')).toBe(true);
        expect(host.querySelectorAll('aside').length).toBe(0);
        expect(host.querySelectorAll('a').length).toBe(1);
    });

    it('A TITLE ELSEWHERE IS A NAME — inside a linked section it draws no anchor of its own', () => {
        const host = drawn(<Section><Reference>https://example.org/</Reference><Title>Name</Title><Paragraph>One.</Paragraph></Section>);
        expect(host.querySelectorAll('a').length).toBe(1);
        expect(host.querySelector('.pd-title')!.tagName).not.toBe('A');
    });

    it('A FOLDED WRITING CARRIES ITS ID ON ITS ELEMENT AND IS NOT A LINK', () => {
        const host = drawn(<Section><Fold>k</Fold><Heading>H</Heading><Paragraph>One.</Paragraph></Section>);
        const outer = host.firstElementChild!;
        expect(outer.tagName).toBe('SECTION');
        expect(outer.id).toBe('k');
        expect(host.querySelectorAll('a').length).toBe(0);
    });
});

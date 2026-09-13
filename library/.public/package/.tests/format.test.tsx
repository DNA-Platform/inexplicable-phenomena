import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { $, $Block, $check, styled } from '@dna-platform/chemistry';
import { $Section, $Format, Heading, Paragraph } from '@dna-platform/public';

let bonded = 0;
class $BoxedFormat extends $Format {
    override selector: any = styled.aside;
    padding = '7px';
    $BoxedFormat(block: $Block) { bonded++; super.$Format(block); }
}
const BoxedFormat = $($BoxedFormat);

class $Boxed extends $Section {
    $Boxed(block: $Block) { super.$Section($check(block, $Block, '!').concat($check(BoxedFormat, '!'))); }
}
const Boxed = $($Boxed);

class $Twice extends $Section {
    $Twice(block: $Block) { super.$Section($check(block, $Block, '!').concat($check(BoxedFormat, '!'), $check(BoxedFormat, '!'))); }
}
const Twice = $($Twice);

const drawn = (element: React.ReactNode) => {
    const held = $(element as never);
    const Drawn = $(held);
    return render(<Drawn />).container;
};

describe('a format worn by a writing is the element the writing draws', () => {
    it('ONE ELEMENT — the format\'s tag, carrying the format\'s class and the writing\'s classes, nothing around it', () => {
        bonded = 0;
        const host = drawn(<Boxed><Heading>H</Heading><Paragraph>One.</Paragraph></Boxed>);
        const outer = host.firstElementChild!;
        expect(outer.tagName).toBe('ASIDE');
        expect(outer.classList.contains('pd-boxed')).toBe(true);
        expect(outer.classList.contains('pd-section')).toBe(true);
        expect(host.querySelectorAll('section').length).toBe(0);
        expect(host.querySelector('[of]')).toBeNull();
        const css = [...document.querySelectorAll('style')].map(style => style.textContent).join('');
        expect(css).toContain('padding:7px');
    });

    it('and the format is bonded once', () => {
        bonded = 0;
        drawn(<Boxed><Heading>H</Heading><Paragraph>One.</Paragraph></Boxed>);
        expect(bonded).toBe(1);
    });

    it('AND A WRITING WEARING TWO FORMATS IS REFUSED', () => {
        const held = $(<Twice><Heading>H</Heading><Paragraph>One.</Paragraph></Twice> as never) as $Section;
        expect(() => held.specify()).toThrow(/worn alone/);
    });
});

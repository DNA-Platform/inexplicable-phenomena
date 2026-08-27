import { describe, it, expect } from 'vitest';
import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Letter } from '@/writing/Letter';
import { $Type } from '@/notation/Type';
import { $$ } from '@/utilities/Lib';

// A LEAF THAT IS NOT COMPOSED. It answers copy off its own state and never
// holds a block, which is why $Writing had no business owning one.
class $Smiley extends $Writing {
    $at = 0;
    faces = ['\u{1F642}', '\u{1F600}', '\u{1F60E}'];

    override get copy(): string { return this.faces[this.$at]; }

    turn(): void {
        this.$at = (this.$at + 1) % this.faces.length;
    }

    override view(): ReactNode {
        return <span data-at={this.$at} onClick={() => this.turn()}>{this.copy}</span>;
    }
}

class $Cats extends $Smiley {
    faces = ['\u{1F63A}', '\u{1F63C}'];
}

const Smiley = $($Smiley);
const Cats = $($Cats);
const Type = $($Type);
$($Letter);

const drawn = (something: ReactNode) => {
    let kept: $Writing | undefined;
    class $Kept extends $Writing {
        override view(): ReactNode {
            kept = this;
            return super.view();
        }
    }
    const Kept = $($Kept);
    class $Page extends $Chemical {
        view(): ReactNode {
            return (
                <Kept>
                    {something}
                    <Type>Letter</Type>
                </Kept>
            );
        }
    }
    const Page = $($Page);
    const host = document.createElement('div');
    act(() => { createRoot(host).render(<Page />); });
    if (!kept) throw new Error('nothing was drawn');
    return { host, writing: kept };
};

const click = (host: HTMLElement) => {
    act(() => { host.querySelector('span')!.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
};

describe('<Writing>{something}<Type>Letter</Type></Writing>', () => {
    it('carries a $Letter among its types, resolved from the name', () => {
        const { writing } = drawn(<Smiley />);
        expect(writing.specification.some(one => one instanceof $Letter)).toBe(true);
        expect(writing.specification.find(one => one instanceof $Letter)).toBeInstanceOf($Letter);
    });

    it('is a letter in the sense of $$, and the whole thing is the provider', () => {
        const { writing } = drawn(<Smiley />);
        const letter = $$(writing, $Letter);
        expect(letter.instance).toBe(writing);
        expect(letter.copy).toBe('\u{1F642}');
        expect([...letter.copy].length).toBe(1);
    });

    it('draws the smiley on the page, and not the word Letter', () => {
        expect(drawn(<Smiley />).host.textContent).toBe('\u{1F642}');
    });

    it('scrolls through the faces on the page when clicked', () => {
        const { host } = drawn(<Smiley />);
        click(host);
        expect(host.textContent).toBe('\u{1F600}');
        click(host);
        expect(host.textContent).toBe('\u{1F60E}');
        click(host);
        expect(host.textContent).toBe('\u{1F642}');
    });

    it('lets a subclass replace the faces and nothing else', () => {
        const { host } = drawn(<Cats />);
        expect(host.textContent).toBe('\u{1F63A}');
        click(host);
        expect(host.textContent).toBe('\u{1F63C}');
    });

    // THE DIVERGENCE, PINNED. The click writes to the derivative React drew;
    // the writing's block still holds the bonded smiley.
    it('does NOT carry the click back into the model', () => {
        const { host, writing } = drawn(<Smiley />);
        const letter = $$(writing, $Letter);
        click(host);
        expect(host.textContent).toBe('\u{1F600}');
        expect(letter.copy).toBe('\u{1F642}');
    });
});

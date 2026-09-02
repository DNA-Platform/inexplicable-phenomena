import { describe, it, expect } from 'vitest';
import { ReactNode, act } from 'react';
import { createRoot } from 'react-dom/client';
import { $, $Block } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Letter, TypeOfLetter } from '@/writing/Letter';
import { $$ } from '@/utilities/Lib';

class $Smiley extends $Writing {
    $at = 0;
    faces = ['\u{1F642}', '\u{1F600}', '\u{1F60E}'];

    override get copy(): string { return this.faces[this.$at]; }

    $Smiley(block: $Block) {
        super.$Writing(block);
        this._type = $(<TypeOfLetter />);
    }

    turn(): void {
        this.$at = (this.$at + 1) % this.faces.length;
    }

    override view(): ReactNode {
        return <span data-at={this.$at} onClick={() => this.turn()}>{this.copy}</span>;
    }
}

class $Cats extends $Smiley {
    override faces = ['\u{1F63A}', '\u{1F63C}'];

    $Cats(block: $Block) { super.$Smiley(block); }
}

const face = '\u{1F642}';
const cat = '\u{1F63A}';
const Smiley = $($Smiley);
const Cats = $($Cats);

const shown = (element: ReactNode): { writing: $Writing; host: HTMLElement } => {
    const writing = $(element as never) as $Writing;
    const host = window.document.createElement('div');
    act(() => { createRoot(host).render(element); });
    return { writing, host };
};

const click = (host: HTMLElement) => {
    act(() => { host.querySelector('span')!.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
};

describe('a leaf that is not composed, and provides its own type of Letter', () => {
    it('carries the letter type among its specification', () => {
        expect($$(shown(<Smiley>{face}</Smiley>).writing)($Letter)).toBe(true);
    });

    it('is a letter in the sense of the reading, and the whole thing is what it stands for', () => {
        const { writing } = shown(<Smiley>{face}</Smiley>);
        const one = $$(writing, $Letter);
        expect(one.copy).toBe(writing.copy);
        expect(one.copy).toBe('\u{1F642}');
        expect([...one.copy].length).toBe(1);
    });

    it('draws the smiley on the page, and NOT the word Letter', () => {
        expect(shown(<Smiley>{face}</Smiley>).host.textContent).toBe('\u{1F642}');
    });

    it('scrolls through the faces on the page when clicked', () => {
        const { host } = shown(<Smiley>{face}</Smiley>);
        click(host);
        expect(host.textContent).toBe('\u{1F600}');
        click(host);
        expect(host.textContent).toBe('\u{1F60E}');
        click(host);
        expect(host.textContent).toBe('\u{1F642}');
    });

    it('lets a subclass replace the faces and nothing else', () => {
        const { host } = shown(<Cats>{cat}</Cats>);
        expect(host.textContent).toBe('\u{1F63A}');
        click(host);
        expect(host.textContent).toBe('\u{1F63C}');
    });

    it('does NOT carry the click back into the model', () => {
        const { host, writing } = shown(<Smiley>{face}</Smiley>);
        const one = $$(writing, $Letter);
        click(host);
        expect(host.textContent).toBe('\u{1F600}');
        expect(one.copy).toBe('\u{1F642}');
    });
});

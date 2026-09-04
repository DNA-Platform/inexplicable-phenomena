import { describe, it, expect } from 'vitest';
import { ReactNode, act } from 'react';

import { $, $Block } from '@dna-platform/chemistry';
import { mounted } from './written';
import { $Writing } from '@/writing/Writing';
import { $Letter, TypeOfLetter } from '@/writing/Letter';
import { reflection } from '@/utilities/Reflection';

class $Smiley extends $Writing {
    $at = 0;
    faces = ['\u{1F642}', '\u{1F600}', '\u{1F60E}'];

    override get copy(): string { return this.faces[this.$at]; }

    $Smiley(block: $Block) {
        this.type ??= $(<TypeOfLetter />);
        super.$Writing(block);
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
    return { writing, host: mounted(element) };
};

const click = (host: HTMLElement) => {
    act(() => { host.querySelector('span')!.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
};

describe('a leaf that is not composed, and provides its own type of Letter', () => {
    it('carries the letter type among its specification', () => {
        expect(reflection.is(shown(<Smiley>{face}</Smiley>).writing, 'Letter')).toBe(true);
    });

    it('is a letter in the sense of the reading, and the whole thing is what it stands for', () => {
        const { writing } = shown(<Smiley>{face}</Smiley>);
        expect(reflection.is(writing, 'Letter')).toBe(true);
        expect(writing.copy).toBe('\u{1F642}');
        expect([...writing.copy].length).toBe(1);
    });

    it('draws the smiley on the page, and NOT the word Letter', () => {
        expect(shown(<Smiley>{face}</Smiley>).host.textContent).toBe('\u{1F642}');
    });

    it('scrolls through the faces on the page when clicked', () => {
        const { host } = shown(<Smiley>{face}</Smiley>);
        click(host.firstElementChild as HTMLElement);
        expect(host.textContent).toBe('\u{1F600}');
        click(host.firstElementChild as HTMLElement);
        expect(host.textContent).toBe('\u{1F60E}');
        click(host.firstElementChild as HTMLElement);
        expect(host.textContent).toBe('\u{1F642}');
    });

    it('lets a subclass replace the faces and nothing else', () => {
        const { host } = shown(<Cats>{cat}</Cats>);
        expect(host.textContent).toBe('\u{1F63A}');
        click(host.firstElementChild as HTMLElement);
        expect(host.textContent).toBe('\u{1F63C}');
    });

    it('does NOT carry the click back into the model', () => {
        const { host, writing } = shown(<Smiley>{face}</Smiley>);
        click(host.firstElementChild as HTMLElement);
        expect(host.textContent).toBe('\u{1F600}');
        expect(writing.copy).toBe('\u{1F642}');
    });
});

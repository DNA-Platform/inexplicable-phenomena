// The .latex demo's book. The paper is set as a LaTeX article by default and can be set as markdown
// instead, because the same document has both readings.
//
// THE TOGGLE IS ON THE BOOK AND TRICKLES DOWN, which is not a mechanism anyone had to add: a
// writing asks reflection.theme, which walks its parents for the nearest THEME ANNOTATION, and a
// book's block holds one. So replacing the annotation in the book's block re-dresses every writing
// beneath it — the trickle is the walk that was already there. And masthead() is the seam Doug put
// on $Book for what stands above a cover, so the switch has somewhere to be drawn without any
// wrapper.
import { ReactNode } from 'react';
import { $, $check, $Chemical, styled } from '@dna-platform/chemistry';
import { $Book, $Theme, Theme } from '@dna-platform/public';
import { Theme as Latex } from '@dna-platform/public/article';
import { Theme as Markdown } from '@dna-platform/public/markdown';

export default class $Aaronson extends $Book {
    $setting = 'latex';

    // A THEME IS SWAPPED, NOT MUTATED. The block is a field, so writing it is what re-renders; the
    // filter takes the theme that stands there out and the concat puts the other in its place.
    wears(setting: string, which: unknown): void {
        this.$setting = setting;
        this._block = this._block.filter(part => !(part instanceof $Theme)).concat($check(which as never, '!'));
    }

    override masthead(): ReactNode {
        return <Switch>
            <Choice chosen={this.$setting === 'latex' ? 'yes' : undefined} onClick={() => this.wears('latex', Latex)}>LaTeX</Choice>
            <Choice chosen={this.$setting === 'markdown' ? 'yes' : undefined} onClick={() => this.wears('markdown', Markdown)}>Markdown</Choice>
        </Switch>;
    }
}

// A STYLED CHEMICAL WITH NO VIEW HOLDS WHAT IT IS GIVEN — chemistry's own promise, so neither of
// these needs a view and neither adds an element the page did not ask for.
class $Switch extends $Chemical {
    override selector: any = styled.nav;
    display = 'flex';
    gap = '.35rem';
    justifyContent = 'flex-end';
    marginBottom = '1.5rem';
}

class $Choice extends $Chemical {
    override selector: any = styled.button;
    // AN ORDINARY DOM PROP IS DECLARED WITH A $ AND HANDED IN WITHOUT ONE — chemistry's blend, the
    // same shape as its own $href test.
    $chosen: string | undefined = undefined;
    $onClick: (() => void) | undefined = undefined;
    fontFamily = 'inherit';
    fontSize = '.8rem';
    padding = '.3rem .7rem';
    borderRadius = '6px';
    cursor = 'pointer';
    get border() { return this.$chosen ? '1px solid currentColor' : '1px solid transparent'; }
    get opacity() { return this.$chosen ? '1' : '.55'; }
    background = 'transparent';
    color = 'inherit';
}

export const Aaronson = $($Aaronson);
const Switch = $($Switch);
const Choice = $($Choice);

$(Aaronson, Theme)(Latex);

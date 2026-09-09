// The .latex demo's book. The paper is set as a LaTeX article by default and can be set as markdown
// instead, because the same document has both readings and nothing about the document changes.
//
// THE ONLY DIFFERENCE BETWEEN THE TWO IS WHICH $dresses WAS CALLED LAST. A theme registers itself
// in place of the base theme, so $check(Theme, '!') is handed whichever one registered; the book
// then re-places its theme annotation, and reflection.theme — which walks a writing's parents for
// the nearest theme — re-dresses everything beneath it. The trickle is the walk that was already
// there, and masthead() is the seam $Book carries for what stands above a cover.
import { ReactNode } from 'react';
import { $, $check, $Chemical, styled } from '@dna-platform/chemistry';
import { $Book, $Theme, Theme } from '@dna-platform/public';
import { $Theme as $Latex } from '@dna-platform/public/article';
import { $Theme as $Markdown } from '@dna-platform/public/markdown';

export default class $Aaronson extends $Book {
    $setting = 'latex';

    wears(setting: string, sheet: { $dresses(within: never): void }): void {
        this.$setting = setting;
        sheet.$dresses(Aaronson as never);
        this._block = this._block.filter(part => !(part instanceof $Theme)).concat($check(Theme, '!'));
    }

    override masthead(): ReactNode {
        return <Switch>
            <Choice chosen={this.$setting === 'latex' ? 'yes' : undefined} onClick={() => this.wears('latex', $Latex)}>LaTeX</Choice>
            <Choice chosen={this.$setting === 'markdown' ? 'yes' : undefined} onClick={() => this.wears('markdown', $Markdown)}>Markdown</Choice>
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
    // AN ORDINARY DOM PROP IS DECLARED WITH A $ AND HANDED IN WITHOUT ONE — chemistry's blend.
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

$Latex.$dresses(Aaronson as never);

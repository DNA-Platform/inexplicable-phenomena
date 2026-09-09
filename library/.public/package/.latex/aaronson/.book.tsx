// The paper is set as a LaTeX article, and can be set as markdown instead, because the same
// document has both readings and nothing about the document changes.
//
// THESE TWO LINES BELONG IN $Book AND ARE HERE BECAUSE THEY CANNOT YET LIVE THERE — a book cannot
// find its own component, so it cannot register a sheet for itself; the finding is written where
// the member would go.
import { ReactNode } from 'react';
import { $, $check, $Chemical, styled } from '@dna-platform/chemistry';
import { $Book, $Theme, Theme } from '@dna-platform/public';
import { Header, $Theme as $Latex } from '@dna-platform/public/article';
import { $Theme as $Markdown } from '@dna-platform/public/markdown';

export default class $Aaronson extends $Book {
    $setting = 'latex';

    wears(setting: string, sheet: typeof $Latex): void {
        this.$setting = setting;
        sheet.$dresses(Aaronson);
        this._block = this._block.filter(part => !(part instanceof $Theme)).concat($check(Theme, '!'));
    }

    override masthead(): ReactNode {
        return <Header>
            P versus NP
            <Switch>
                <Choice key="latex" chosen={this.$setting === 'latex' ? 'yes' : undefined} onClick={() => this.wears('latex', $Latex)}>LaTeX</Choice>
                <Choice key="markdown" chosen={this.$setting === 'markdown' ? 'yes' : undefined} onClick={() => this.wears('markdown', $Markdown)}>Markdown</Choice>
            </Switch>
        </Header>;
    }
}

class $Switch extends $Chemical {
    override selector: any = styled.nav;
    display = 'flex';
    gap = '.35rem';
}

class $Choice extends $Chemical {
    override selector: any = styled.button;
    $chosen: string | undefined = undefined;
    $onClick: (() => void) | undefined = undefined;
    fontFamily = 'inherit';
    fontSize = '.8rem';
    padding = '.3rem .7rem';
    borderRadius = '6px';
    cursor = 'pointer';
    background = 'transparent';
    color = 'inherit';
    get border() { return this.$chosen ? '1px solid currentColor' : '1px solid transparent'; }
    get opacity() { return this.$chosen ? '1' : '.55'; }
}

export const Aaronson = $($Aaronson);
const Switch = $($Switch);
const Choice = $($Choice);

$Latex.$dresses(Aaronson);

// The paper is set as a LaTeX article, and can be set as markdown instead, because the same
// document has both readings and nothing about the document changes. THE BOOK'S FILE CARRIES WHAT
// IS THE BOOK'S OWN — its chapter, its document, and the registrations that wire them — Doug: "get
// rid of .chapter entirely, everything goes into .book… in the $register of your book, you are
// expected to wire up your document." A theme is registered once as a singleton and switched by
// registering another; what a registration reaches, it re-draws.
import { ReactNode } from 'react';
import { $, $Chemical, styled } from '@dna-platform/chemistry';
import { $Book, $Chapter, $Document, Document } from '@dna-platform/public';
import { Header, $ArticleTheme } from '@dna-platform/public/article';
import { $MarkdownTheme } from '@dna-platform/public/markdown';

export class $AaronsonChapter extends $Chapter { }

export class $AaronsonDocument extends $Document { }

export default class $Aaronson extends $Book {
    $setting = 'latex';

    override header(): ReactNode {
        return <Header>
            P versus NP
            <Switch>
                <Choice key="latex" chosen={this.$setting === 'latex' ? 'yes' : undefined} onClick={() => this.set('latex', $ArticleTheme)}>LaTeX</Choice>
                <Choice key="markdown" chosen={this.$setting === 'markdown' ? 'yes' : undefined} onClick={() => this.set('markdown', $MarkdownTheme)}>Markdown</Choice>
            </Switch>
        </Header>;
    }

    protected set(setting: string, sheet: typeof $ArticleTheme): void {
        this.$setting = setting;
        sheet.$register(Aaronson);
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
export const AaronsonDocument = $($AaronsonDocument);
const Switch = $($Switch);
const Choice = $($Choice);

$ArticleTheme.$register(Aaronson);
$(Aaronson, Document)(AaronsonDocument);

import React, { type ReactNode } from 'react';
import 'katex/dist/katex.min.css';
import { Highlight, themes } from 'prism-react-renderer';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { $Sheet, Sheet, type $SheetViews } from './page/sheet';
import { SourceDrawer } from './page/faces/drawer';
import {
    Backdrop, ControlBar, ControlChip, ControlRule,
    Stage, SheetPane, SourcePane, ClassesDrawer, ClassTabs, ClassTab, ClassCode,
} from './page/page';
import latexSource from './page/latex.tsx?raw';
import sentenceSource from '@/writing/Sentence.tsx?raw';
import sectionSource from '@/writing/Section.tsx?raw';
import sheetSource from './page/sheet.tsx?raw';

const classSources: Record<string, string> = {
    '$Latex': latexSource,
    '$Sentence': sentenceSource,
    '$Section': sectionSource,
    '$Sheet': sheetSource,
};

class $ThePage extends $Chemical {
    sheet!: $Sheet;

    showing: $SheetViews = 'book';
    editing = false;
    classes = false;
    tab = '$Latex';

    $ThePage(sheet: $Sheet) {
        this.sheet = $check(sheet, $Sheet);
    }

    // The bar's own list, in the order the chips have always read. The names are
    // the ones @look gives the sheet's five views; keeping them here is what
    // Doug asked for — the menu is the demonstration's business, not the
    // framework's, and the sheet answers to any one of them by name.
    protected looks: $SheetViews[] = ['book', 'github', 'night', 'reading', 'compare'];

    // WHICH LOOK IS SHOWING IS THE SHEET'S STATE, not the page's, so there is
    // one sheet behind every chip and the source you type survives switching.
    // Writing it in a handler re-reacts the sheet, and because the sheet is a
    // bonded child, finalize walks the composition tree up and repaints the bar.
    view(): ReactNode {
        const looks = this.looks;
        const showing = this.showing;
        const Standing = $(this.sheet);
        return (
            <Backdrop>
                <ControlBar>
                    {looks.map(name => (
                        <ControlChip key={name} $active={showing === name} onClick={() => { this.showing = name; }}>
                            {name}
                        </ControlChip>
                    ))}
                    <ControlRule />
                    <ControlChip $active={this.editing} onClick={() => { this.editing = !this.editing; }}>
                        edit
                    </ControlChip>
                    <ControlChip $active={this.classes} onClick={() => { this.classes = !this.classes; }}>
                        the classes
                    </ControlChip>
                    <ControlRule />
                    <ControlChip as="a" href="/books" style={{ textDecoration: 'none' }}>
                        the books →
                    </ControlChip>
                </ControlBar>
                <Stage $editing={this.editing}>
                    {this.editing && (
                        <SourcePane
                            value={this.sheet.$source}
                            spellCheck={false}
                            onChange={e => { this.sheet.$source = e.target.value; }}
                        />
                    )}
                    <SheetPane><Standing look={showing} /></SheetPane>
                </Stage>
                {this.classes && <SourceDrawer />}
            </Backdrop>
        );
    }
}

const ThePage = $($ThePage);

export function ThePageDemo() {
    return (
        <ThePage>
            <Sheet />
        </ThePage>
    );
}


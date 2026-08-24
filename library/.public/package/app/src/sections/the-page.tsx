import React, { type ReactNode } from 'react';
import 'katex/dist/katex.min.css';
import { Highlight, themes } from 'prism-react-renderer';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { $Sheet, Sheet } from './page/sheet';
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
    showing = 'book';
    editing = false;
    classes = false;
    tab = '$Latex';

    $ThePage(sheet: $Sheet) {
        this.sheet = $check(sheet, $Sheet);
    }

    view(): ReactNode {
        const lenses = this.sheet.perspectives;
        const active = lenses.find(p => p.name === this.showing) ?? lenses.find(p => p.default)!;
        return (
            <Backdrop>
                <ControlBar>
                    {lenses.map(p => (
                        <ControlChip key={p.name} $active={this.showing === p.name} onClick={() => { this.showing = p.name; }}>
                            {p.name}
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
                    <SheetPane>{active.render()}</SheetPane>
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


import React, { ReactNode } from 'react';
import { $, $Chemical } from '@/index';
import {
    StudyRoom, Sheet, SheetTitle, SheetMeta, Notes, Note, Pin, Chip, Strokes,
    Controls, Btn, Tally, Hint,
} from './case.styled';

// PERSISTENCE WITHOUT THE BASE CLASS — plain chemicals wearing the flag.
// The kept note and the loose note share one class; the flag and a pid are
// the ONLY difference between them, and the refresh shows which is which.
class $Note extends $Chemical {
    strokes = 0;

    stroke() { this.strokes++; }

    get label(): string { return 'ordinary'; }
    get kept(): boolean { return false; }

    override view(): ReactNode {
        return (
            <Note $kept={this.kept} data-face={this.kept ? 'kept' : 'loose'} data-strokes={this.strokes}>
                {this.kept && <Pin />}
                <Chip $kept={this.kept}>{this.label}</Chip>
                <Strokes>{Array.from({ length: Math.min(this.strokes, 24) }, (_, at) => <Tally key={at} />)}</Strokes>
                <Btn data-act={this.kept ? 'stroke-kept' : 'stroke-loose'} onClick={() => this.stroke()}>+ stroke</Btn>
            </Note>
        );
    }
}

class $KeptNote extends $Note {
    $KeptNote() {
        this.$pid = 'Study.kept';
        this.persist = true;
    }

    override get label(): string { return 'persist'; }
    override get kept(): boolean { return true; }
}

class $LooseNote extends $Note { }

class $Manuscript extends $Chemical {
    drafts = 1;
    kept?: $KeptNote;
    loose?: $LooseNote;

    $Manuscript() {
        this.$pid = 'Study.manuscript';
        this.persist = true;
    }

    revise() { this.drafts++; }
    stampBoth() { this.kept?.stroke(); this.loose?.stroke(); }

    override view(): ReactNode {
        return (
            <div>
                <StudyRoom data-face="manuscript" data-drafts={this.drafts}>
                    <Sheet>
                        <SheetTitle>Draft {this.drafts}</SheetTitle>
                        <SheetMeta>kept {this.kept?.strokes ?? 0} · loose {this.loose?.strokes ?? 0}</SheetMeta>
                        <Controls>
                            <Btn data-act="revise" onClick={() => this.revise()}>revise the draft</Btn>
                            <Btn data-act="stamp" onClick={() => this.stampBoth()}>stamp both notes</Btn>
                        </Controls>
                    </Sheet>
                    <Notes>
                        <KeptNote on={() => this.kept} />
                        <LooseNote on={() => this.loose} />
                    </Notes>
                </StudyRoom>
                <Hint>two notes, one class — the flag is the only difference · refresh and see which one remembers</Hint>
            </div>
        );
    }
}

const KeptNote = $($KeptNote);
const LooseNote = $($LooseNote);

export default $($Manuscript);

import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { $Type, TypedSpecification, $Writing } from './Writing';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition$, $Composition } from './Composition';
import { ReactNode } from 'react';
import { $Sentence, Sentence } from './Sentence';
import { parser } from '@/utilities/Parser';
import { Prose } from '@/encyclopedia/Prose';
import { $Reference, $TypeOfReference, ReferenceSpecification, prints, type $Reference$ } from '@/reference/Reference';
import { $Path } from '@/reference/Path';
import { $$ } from '@/utilities/Lib';

export class $Paragraph extends $Composition<$Sentence> implements $Composition$<$Sentence> {

    $Paragraph(block: $Block) {
        super.$Composition(block);
        this._type = $(<TypeOfParagraph />);
    }

    override frame(): ReactNode {
        return <Prose>{super.frame()}</Prose>;
    }

    protected override reduce(held: (string | $Writing)[]): $Sentence[] {
        const lines: (string | $Writing)[][] = [[]];
        for (const token of held) {
            if (typeof token !== 'string' || !token.includes('\n')) {
                lines[lines.length - 1].push(token);
                continue;
            }
            token.split('\n').forEach((piece, at, pieces) => {
                if (at < pieces.length - 1) {
                    lines[lines.length - 1].push(piece + '\n');
                    lines.push([]);
                } else if (piece !== '') {
                    lines[lines.length - 1].push(piece);
                }
            });
        }
        return lines
            .filter(line => line.some(token => typeof token !== 'string' || token.trim() !== ''))
            .map(line => $(<Sentence>{parser.elements(line)}</Sentence>) as $Sentence);
    }
}

export class $$Paragraph extends $Reference implements $Reference$<$Paragraph> {
    $$Paragraph(block: $Block) {
        super.$Reference(block);
        this._type = $(<TypeOf$Paragraph />);
    }

    override async read(): Promise<$Paragraph> {
        return $$(await super.read(), $Paragraph);
    }
}

export class $TypeOfParagraph extends $Type {
    resolve = false;
    override nests = true;
    override code = 'Ph';
    override get writtenAs(): new () => $Writing { return $Sentence; }

    override get canonicalForm(): typeof $Writing { return $Paragraph; }

    constructor() {
        super();
        this[cache]('Paragraph');
    }

    protected override specification: Specification<$Writing> = new ParagraphSpecification();
}

export class $TypeOf$Paragraph extends $TypeOfReference {
    override get canonicalForm(): typeof $Writing { return $$Paragraph; }

    constructor() {
        super();
        this[cache]('$Paragraph');
    }

    protected override specification: Specification<$Writing> = new $ParagraphSpecification();
}

export class ParagraphSpecification extends TypedSpecification<$Writing> {
    protected patterns = {
        divided: /\n[^\S\n]*\n/u
    };

    @specify('a paragraph is unbroken by a blank line')
    $noBlankLine(writing: $Writing): void {
        $check(!this.patterns.divided.test(writing.copy), 'a paragraph is unbroken by a blank line, and this one carries one');
    }
}

export class $ParagraphSpecification extends ReferenceSpecification {
    @specify('a reference to a paragraph lands on one')
    $landsOnIt(writing: $Writing): void {
        const path = (writing.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path);
        const step = path?.copy.split('/').pop();
        $check(!!step && step.startsWith('Ph:'),
            'a reference to a paragraph lands on one, and this path lands on something else');
        const held = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.parenthetical);
        $check(held === undefined || $$(held)($Paragraph),
            'a reference to a paragraph lands on one, and what it holds is not one');
    }
}

export const Paragraph = $($Paragraph);
export const TypeOfParagraph = $($TypeOfParagraph);
export const TypeOf$Paragraph = $($TypeOf$Paragraph);
prints.set('Ph', $$Paragraph);

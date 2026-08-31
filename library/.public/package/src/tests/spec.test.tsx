import { describe, it, expect } from 'vitest';
import { Children, ComponentType, Fragment, ReactElement, ReactNode, createElement, isValidElement } from 'react';
import { $Chemical } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Type } from '@/notation/Type';
import { $$ } from '@/utilities/Lib';
import { ChaptersSpec as BookChaptersSpec, $ChaptersSpec as $BookChaptersSpec } from './.spec/book/ChaptersSpec';
import { WritingSpec as BookWritingSpec, $WritingSpec as $BookWritingSpec } from './.spec/book/WritingSpec';
import { SectionsSpec as ChapterSectionsSpec, $SectionsSpec as $ChapterSectionsSpec } from './.spec/chapter/SectionsSpec';
import { WritingSpec as ChapterWritingSpec, $WritingSpec as $ChapterWritingSpec } from './.spec/chapter/WritingSpec';
import { ParagraphsSpec as DocumentParagraphsSpec, $ParagraphsSpec as $DocumentParagraphsSpec } from './.spec/document/ParagraphsSpec';
import { SectionsSpec as DocumentSectionsSpec, $SectionsSpec as $DocumentSectionsSpec } from './.spec/document/SectionsSpec';
import { WritingSpec as DocumentWritingSpec, $WritingSpec as $DocumentWritingSpec } from './.spec/document/WritingSpec';
import { DocumentsSpec as FileDocumentsSpec, $DocumentsSpec as $FileDocumentsSpec } from './.spec/file/DocumentsSpec';
import { WritingSpec as FileWritingSpec, $WritingSpec as $FileWritingSpec } from './.spec/file/WritingSpec';
import { DerivedSpecSmiley as LetterDerivedSpecSmiley, $DerivedSpecSmiley as $LetterDerivedSpecSmiley } from './.spec/letter/DerivedSpec-Smiley';
import { GraphemeSpec as LetterGraphemeSpec, $GraphemeSpec as $LetterGraphemeSpec } from './.spec/letter/GraphemeSpec';
import { KindSpec as LetterKindSpec, $KindSpec as $LetterKindSpec } from './.spec/letter/KindSpec';
import { TextSpec as LetterTextSpec, $TextSpec as $LetterTextSpec } from './.spec/letter/TextSpec';
import { WritingSpec as LetterWritingSpec, $WritingSpec as $LetterWritingSpec } from './.spec/letter/WritingSpec';
import { DerivedSpecTitle as ParagraphDerivedSpecTitle, $DerivedSpecTitle as $ParagraphDerivedSpecTitle } from './.spec/paragraph/DerivedSpec-Title';
import { SentencesSpec as ParagraphSentencesSpec, $SentencesSpec as $ParagraphSentencesSpec } from './.spec/paragraph/SentencesSpec';
import { TextSpec as ParagraphTextSpec, $TextSpec as $ParagraphTextSpec } from './.spec/paragraph/TextSpec';
import { WritingSpec as ParagraphWritingSpec, $WritingSpec as $ParagraphWritingSpec } from './.spec/paragraph/WritingSpec';
import { ParagraphsSpec as SectionParagraphsSpec, $ParagraphsSpec as $SectionParagraphsSpec } from './.spec/section/ParagraphsSpec';
import { TextSpec as SectionTextSpec, $TextSpec as $SectionTextSpec } from './.spec/section/TextSpec';
import { WritingSpec as SectionWritingSpec, $WritingSpec as $SectionWritingSpec } from './.spec/section/WritingSpec';
import { StopSpec as SentenceStopSpec, $StopSpec as $SentenceStopSpec } from './.spec/sentence/StopSpec';
import { WordsSpec as SentenceWordsSpec, $WordsSpec as $SentenceWordsSpec } from './.spec/sentence/WordsSpec';
import { WritingSpec as SentenceWritingSpec, $WritingSpec as $SentenceWritingSpec } from './.spec/sentence/WritingSpec';
import { KindSpec as WordKindSpec, $KindSpec as $WordKindSpec } from './.spec/word/KindSpec';
import { LettersSpec as WordLettersSpec, $LettersSpec as $WordLettersSpec } from './.spec/word/LettersSpec';
import { MixedSpec as WordMixedSpec, $MixedSpec as $WordMixedSpec } from './.spec/word/MixedSpec';
import { TextSpec as WordTextSpec, $TextSpec as $WordTextSpec } from './.spec/word/TextSpec';
import { WritingSpec as WordWritingSpec, $WritingSpec as $WordWritingSpec } from './.spec/word/WritingSpec';
import { Writing, built, drawn, shown } from './written';

// EVERY SPEC IS DRAWN, SPECIFIED AND COMPOSED.
//
// COMPOSING does not assert a part COUNT, and that is deliberate rather than weak:
// above word the parse is not built, so a paragraph written as prose composes
// nothing yet and a paragraph written as sentences composes them. What is asserted
// is that reading the parts does not throw and that every part is writing. A typechecked example proves it
// compiles, a drawn one proves the model survives a paint, and specifying it proves
// the example is writing the library would accept rather than merely writing it can
// render. Composing it proves the example has parts to read.
const specs: [string, ComponentType, new () => $Chemical][] = [
    ['book/ChaptersSpec', BookChaptersSpec, $BookChaptersSpec],
    ['book/WritingSpec', BookWritingSpec, $BookWritingSpec],
    ['chapter/SectionsSpec', ChapterSectionsSpec, $ChapterSectionsSpec],
    ['chapter/WritingSpec', ChapterWritingSpec, $ChapterWritingSpec],
    ['document/ParagraphsSpec', DocumentParagraphsSpec, $DocumentParagraphsSpec],
    ['document/SectionsSpec', DocumentSectionsSpec, $DocumentSectionsSpec],
    ['document/WritingSpec', DocumentWritingSpec, $DocumentWritingSpec],
    ['file/DocumentsSpec', FileDocumentsSpec, $FileDocumentsSpec],
    ['file/WritingSpec', FileWritingSpec, $FileWritingSpec],
    ['letter/DerivedSpec-Smiley', LetterDerivedSpecSmiley, $LetterDerivedSpecSmiley],
    ['letter/GraphemeSpec', LetterGraphemeSpec, $LetterGraphemeSpec],
    ['letter/KindSpec', LetterKindSpec, $LetterKindSpec],
    ['letter/TextSpec', LetterTextSpec, $LetterTextSpec],
    ['letter/WritingSpec', LetterWritingSpec, $LetterWritingSpec],
    ['paragraph/DerivedSpec-Title', ParagraphDerivedSpecTitle, $ParagraphDerivedSpecTitle],
    ['paragraph/SentencesSpec', ParagraphSentencesSpec, $ParagraphSentencesSpec],
    ['paragraph/TextSpec', ParagraphTextSpec, $ParagraphTextSpec],
    ['paragraph/WritingSpec', ParagraphWritingSpec, $ParagraphWritingSpec],
    ['section/ParagraphsSpec', SectionParagraphsSpec, $SectionParagraphsSpec],
    ['section/TextSpec', SectionTextSpec, $SectionTextSpec],
    ['section/WritingSpec', SectionWritingSpec, $SectionWritingSpec],
    ['sentence/StopSpec', SentenceStopSpec, $SentenceStopSpec],
    ['sentence/WordsSpec', SentenceWordsSpec, $SentenceWordsSpec],
    ['sentence/WritingSpec', SentenceWritingSpec, $SentenceWritingSpec],
    ['word/KindSpec', WordKindSpec, $WordKindSpec],
    ['word/LettersSpec', WordLettersSpec, $WordLettersSpec],
    ['word/MixedSpec', WordMixedSpec, $WordMixedSpec],
    ['word/TextSpec', WordTextSpec, $WordTextSpec],
    ['word/WritingSpec', WordWritingSpec, $WordWritingSpec]
];

const roots = (Spec: new () => $Chemical): ReactElement[] => {
    const view = new Spec().view() as ReactElement;
    if (!isValidElement(view))
        throw new Error('a specification draws nothing');
    if (view.type !== Fragment)
        return [view];
    return Children.toArray((view.props as { children?: ReactNode }).children)
        .filter(isValidElement) as ReactElement[];
};

// Writing that carries its type rather than being an instance of one only knows what
// it is once it has been PAINTED, because found() reads the block's elements. So the
// bare-writing examples are drawn to get their writing and the rest are simply built.
const rooted = (one: ReactElement): $Writing =>
    one.type === Writing
        ? drawn((one.props as { children?: ReactNode }).children).writing
        : built<$Writing>(one as ReactNode);

const composed = (writing: $Writing): $Writing[] => {
    const asked = writing as $Writing & { parts?: () => $Writing[] };
    if (asked.parts)
        return asked.parts();
    const type = writing.type as $Type | undefined;
    if (type === undefined)
        return [];
    const bound = $$(writing, type.canonicalForm as new () => $Writing) as $Writing & { parts?: () => $Writing[] };
    return bound.parts ? bound.parts() : [];
};

describe('every specification draws', () => {
    for (const [name, Spec] of specs)
        it(name, () => {
            expect(() => shown(createElement(Spec))).not.toThrow();
        });

    it('and there are as many as the folders hold', () => {
        expect(specs.length).toBe(29);
    });
});

describe('every specification SPECIFIES — the example is writing the library accepts', () => {
    for (const [name, , Spec] of specs)
        it(name, () => {
            for (const one of roots(Spec))
                expect(() => rooted(one).specify()).not.toThrow();
        });
});

describe('every specification COMPOSES — the example has parts to read', () => {
    for (const [name, , Spec] of specs)
        it(name, () => {
            for (const one of roots(Spec)) {
                const writing = rooted(one);
                expect(() => composed(writing)).not.toThrow();
                expect(composed(writing).every(part => part instanceof $Writing)).toBe(true);
            }
        });
});

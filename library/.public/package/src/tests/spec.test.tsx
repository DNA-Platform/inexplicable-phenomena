import { describe, it, expect } from 'vitest';
import { Children, ComponentType, Fragment, ReactElement, ReactNode, createElement, isValidElement } from 'react';
import { $Chemical } from '@dna-platform/chemistry';
import { $Writing, $Type } from '@/writing/Writing';
import { $$ } from '@/utilities/Lib';
import { BookChaptersSpec, $BookChaptersSpec, BookWritingSpec, $BookWritingSpec } from './.spec/book/Book';
import { ChapterSectionsSpec, $ChapterSectionsSpec, ChapterWritingSpec, $ChapterWritingSpec } from './.spec/book/Chapter';
import { PathLettersSpec, $PathLettersSpec, PathTextSpec, $PathTextSpec, PathWritingSpec, $PathWritingSpec } from './.spec/reference/Path';
import { ReferenceLettersSpec, $ReferenceLettersSpec, ReferencePathSpec, $ReferencePathSpec, ReferenceWritingSpec, $ReferenceWritingSpec } from './.spec/reference/Reference';
import { AttributeDeclaredSpecFriend, $AttributeDeclaredSpecFriend } from './.spec/writing/Attribute';
import { DocumentParagraphsSpec, $DocumentParagraphsSpec, DocumentSectionsSpec, $DocumentSectionsSpec, DocumentWritingSpec, $DocumentWritingSpec } from './.spec/writing/Document';
import { FileDocumentsSpec, $FileDocumentsSpec, FileWritingSpec, $FileWritingSpec } from './.spec/writing/File';
import { LetterDerivedSpecSmiley, $LetterDerivedSpecSmiley, LetterGraphemeSpec, $LetterGraphemeSpec, LetterKindSpec, $LetterKindSpec, LetterTextSpec, $LetterTextSpec, LetterWritingSpec, $LetterWritingSpec } from './.spec/writing/Letter';
import { ParagraphDerivedSpecTitle, $ParagraphDerivedSpecTitle, ParagraphSentencesSpec, $ParagraphSentencesSpec, ParagraphTextSpec, $ParagraphTextSpec, ParagraphWritingSpec, $ParagraphWritingSpec } from './.spec/writing/Paragraph';
import { PhraseLettersSpec, $PhraseLettersSpec, PhraseTextSpec, $PhraseTextSpec, PhraseWordsSpec, $PhraseWordsSpec, PhraseWritingSpec, $PhraseWritingSpec } from './.spec/writing/Phrase';
import { SectionParagraphsSpec, $SectionParagraphsSpec, SectionTextSpec, $SectionTextSpec, SectionWritingSpec, $SectionWritingSpec } from './.spec/writing/Section';
import { SentenceStopSpec, $SentenceStopSpec, SentenceWordsSpec, $SentenceWordsSpec, SentenceWritingSpec, $SentenceWritingSpec } from './.spec/writing/Sentence';
import { WordKindSpec, $WordKindSpec, WordLettersSpec, $WordLettersSpec, WordMixedSpec, $WordMixedSpec, WordTextSpec, $WordTextSpec, WordWritingSpec, $WordWritingSpec } from './.spec/writing/Word';
import { WritingMeansSpec, $WritingMeansSpec, WritingPlainSpec, $WritingPlainSpec } from './.spec/writing/Writing';
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
    ['book/Book.ChaptersSpec', BookChaptersSpec, $BookChaptersSpec],
    ['book/Book.WritingSpec', BookWritingSpec, $BookWritingSpec],
    ['book/Chapter.SectionsSpec', ChapterSectionsSpec, $ChapterSectionsSpec],
    ['book/Chapter.WritingSpec', ChapterWritingSpec, $ChapterWritingSpec],
    ['reference/Path.LettersSpec', PathLettersSpec, $PathLettersSpec],
    ['reference/Path.TextSpec', PathTextSpec, $PathTextSpec],
    ['reference/Path.WritingSpec', PathWritingSpec, $PathWritingSpec],
    ['reference/Reference.LettersSpec', ReferenceLettersSpec, $ReferenceLettersSpec],
    ['reference/Reference.PathSpec', ReferencePathSpec, $ReferencePathSpec],
    ['reference/Reference.WritingSpec', ReferenceWritingSpec, $ReferenceWritingSpec],
    ['writing/Attribute.DeclaredSpecFriend', AttributeDeclaredSpecFriend, $AttributeDeclaredSpecFriend],
    ['writing/Document.ParagraphsSpec', DocumentParagraphsSpec, $DocumentParagraphsSpec],
    ['writing/Document.SectionsSpec', DocumentSectionsSpec, $DocumentSectionsSpec],
    ['writing/Document.WritingSpec', DocumentWritingSpec, $DocumentWritingSpec],
    ['writing/File.DocumentsSpec', FileDocumentsSpec, $FileDocumentsSpec],
    ['writing/File.WritingSpec', FileWritingSpec, $FileWritingSpec],
    ['writing/Letter.DerivedSpecSmiley', LetterDerivedSpecSmiley, $LetterDerivedSpecSmiley],
    ['writing/Letter.GraphemeSpec', LetterGraphemeSpec, $LetterGraphemeSpec],
    ['writing/Letter.KindSpec', LetterKindSpec, $LetterKindSpec],
    ['writing/Letter.TextSpec', LetterTextSpec, $LetterTextSpec],
    ['writing/Letter.WritingSpec', LetterWritingSpec, $LetterWritingSpec],
    ['writing/Paragraph.DerivedSpecTitle', ParagraphDerivedSpecTitle, $ParagraphDerivedSpecTitle],
    ['writing/Paragraph.SentencesSpec', ParagraphSentencesSpec, $ParagraphSentencesSpec],
    ['writing/Paragraph.TextSpec', ParagraphTextSpec, $ParagraphTextSpec],
    ['writing/Paragraph.WritingSpec', ParagraphWritingSpec, $ParagraphWritingSpec],
    ['writing/Phrase.LettersSpec', PhraseLettersSpec, $PhraseLettersSpec],
    ['writing/Phrase.TextSpec', PhraseTextSpec, $PhraseTextSpec],
    ['writing/Phrase.WordsSpec', PhraseWordsSpec, $PhraseWordsSpec],
    ['writing/Phrase.WritingSpec', PhraseWritingSpec, $PhraseWritingSpec],
    ['writing/Section.ParagraphsSpec', SectionParagraphsSpec, $SectionParagraphsSpec],
    ['writing/Section.TextSpec', SectionTextSpec, $SectionTextSpec],
    ['writing/Section.WritingSpec', SectionWritingSpec, $SectionWritingSpec],
    ['writing/Sentence.StopSpec', SentenceStopSpec, $SentenceStopSpec],
    ['writing/Sentence.WordsSpec', SentenceWordsSpec, $SentenceWordsSpec],
    ['writing/Sentence.WritingSpec', SentenceWritingSpec, $SentenceWritingSpec],
    ['writing/Word.KindSpec', WordKindSpec, $WordKindSpec],
    ['writing/Word.LettersSpec', WordLettersSpec, $WordLettersSpec],
    ['writing/Word.MixedSpec', WordMixedSpec, $WordMixedSpec],
    ['writing/Word.TextSpec', WordTextSpec, $WordTextSpec],
    ['writing/Word.WritingSpec', WordWritingSpec, $WordWritingSpec],
    ['writing/Writing.MeansSpec', WritingMeansSpec, $WritingMeansSpec],
    ['writing/Writing.PlainSpec', WritingPlainSpec, $WritingPlainSpec]
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
        expect(specs.length).toBe(42);
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

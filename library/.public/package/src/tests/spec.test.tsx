import { describe, it, expect } from 'vitest';
import { Children, ComponentType, Fragment, ReactElement, ReactNode, createElement, isValidElement } from 'react';
import { $Chemical } from '@dna-platform/chemistry';
import { $Writing, $Type } from '@/writing/Writing';
import { reflection } from '@/utilities/Reflection';
import { BookChaptersExample, $BookChaptersExample, BookWritingExample, $BookWritingExample } from './.spec/book/Book';
import { ChapterSectionsExample, $ChapterSectionsExample, ChapterWritingExample, $ChapterWritingExample } from './.spec/book/Chapter';
import { PathLettersExample, $PathLettersExample, PathTextExample, $PathTextExample, PathWritingExample, $PathWritingExample } from './.spec/reference/Path';
import { ReferenceHoldsExample, $ReferenceHoldsExample, ReferenceLettersExample, $ReferenceLettersExample, ReferencePathExample, $ReferencePathExample, ReferenceWritingExample, $ReferenceWritingExample } from './.spec/reference/Reference';
import { LabelDeclaredExample, $LabelDeclaredExample, LabelEmptyExample, $LabelEmptyExample } from './.spec/writing/Label';
import { RefMarkdownExample, $RefMarkdownExample, RefPathExample, $RefPathExample, RefHeldExample, $RefHeldExample, RefSentenceExample, $RefSentenceExample } from './.spec/reference/Ref';
import { ReferenceCardListExample, $ReferenceCardListExample, ReferenceCardTraitExample, $ReferenceCardTraitExample } from './.spec/reference/ReferenceCard';
import { ListLinesExample, $ListLinesExample, ListWritingExample, $ListWritingExample, ListNestedExample, $ListNestedExample, ListTypedExample, $ListTypedExample } from './.spec/writing/List';
import { TableRowsExample, $TableRowsExample, TableWritingExample, $TableWritingExample, TableCellsExample, $TableCellsExample, TableTypedExample, $TableTypedExample, TableTraitExample, $TableTraitExample } from './.spec/writing/Table';
import { LetterReferenceExample, $LetterReferenceExample } from './.spec/writing/Letter';
import { WordReferenceExample, $WordReferenceExample } from './.spec/writing/Word';
import { SentenceReferenceExample, $SentenceReferenceExample } from './.spec/writing/Sentence';
import { ParagraphReferenceExample, $ParagraphReferenceExample } from './.spec/writing/Paragraph';
import { SectionReferenceExample, $SectionReferenceExample } from './.spec/writing/Section';
import { ChapterReferenceExample, $ChapterReferenceExample } from './.spec/book/Chapter';
import { BookReferenceExample, $BookReferenceExample } from './.spec/book/Book';
import { CoverKindExample, $CoverKindExample } from './.spec/book/Cover';
import { SynopsisKindExample, $SynopsisKindExample } from './.spec/book/Synopsis';
import { TableOfContentsKindExample, $TableOfContentsKindExample } from './.spec/book/TableOfContents';
import { IndexSectionExample, $IndexSectionExample } from './.spec/book/Index';
import { PageFoldReferenceExample, $PageFoldReferenceExample } from './.spec/book/PageFold';
import { BookmarkReferenceExample, $BookmarkReferenceExample } from './.spec/book/Bookmark';
import { HighlightPairExample, $HighlightPairExample } from './.spec/book/Highlight';
import { ReferencesSectionExample, $ReferencesSectionExample } from './.spec/reference/References';
import { CompositionConfiguredExample, $CompositionConfiguredExample } from './.spec/writing/Composition';
import { LetterDerivedSmileyExample, $LetterDerivedSmileyExample, LetterGraphemeExample, $LetterGraphemeExample, LetterKindExample, $LetterKindExample, LetterTextExample, $LetterTextExample, LetterWritingExample, $LetterWritingExample } from './.spec/writing/Letter';
import { ParagraphDerivedTitleExample, $ParagraphDerivedTitleExample, ParagraphSentencesExample, $ParagraphSentencesExample, ParagraphTextExample, $ParagraphTextExample, ParagraphWritingExample, $ParagraphWritingExample, ParagraphNestedExample, $ParagraphNestedExample } from './.spec/writing/Paragraph';
import { PhraseSentenceExample, $PhraseSentenceExample, PhraseTextExample, $PhraseTextExample, PhraseWordsExample, $PhraseWordsExample, PhraseWritingExample, $PhraseWritingExample } from './.spec/writing/Phrase';
import { SectionParagraphsExample, $SectionParagraphsExample, SectionTextExample, $SectionTextExample, SectionWritingExample, $SectionWritingExample, SectionNestedExample, $SectionNestedExample } from './.spec/writing/Section';
import { SentenceStopExample, $SentenceStopExample, SentenceWordsExample, $SentenceWordsExample, SentenceWritingExample, $SentenceWritingExample, SentenceNestedExample, $SentenceNestedExample } from './.spec/writing/Sentence';
import { WordKindExample, $WordKindExample, WordLettersExample, $WordLettersExample, WordMixedExample, $WordMixedExample, WordTextExample, $WordTextExample, WordWritingExample, $WordWritingExample, WordNestedExample, $WordNestedExample } from './.spec/writing/Word';
import { WritingMeansExample, $WritingMeansExample, WritingPlainExample, $WritingPlainExample } from './.spec/writing/Writing';
import { HeadingKindExample, $HeadingKindExample } from './.spec/writing/Heading';
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
    ['book/Book.ChaptersExample', BookChaptersExample, $BookChaptersExample],
    ['book/Book.WritingExample', BookWritingExample, $BookWritingExample],
    ['book/Chapter.SectionsExample', ChapterSectionsExample, $ChapterSectionsExample],
    ['book/Chapter.WritingExample', ChapterWritingExample, $ChapterWritingExample],
    ['reference/Path.LettersExample', PathLettersExample, $PathLettersExample],
    ['reference/Path.TextExample', PathTextExample, $PathTextExample],
    ['reference/Path.WritingExample', PathWritingExample, $PathWritingExample],
    ['reference/Reference.HoldsExample', ReferenceHoldsExample, $ReferenceHoldsExample],
    ['reference/Reference.LettersExample', ReferenceLettersExample, $ReferenceLettersExample],
    ['reference/Reference.PathExample', ReferencePathExample, $ReferencePathExample],
    ['reference/Reference.WritingExample', ReferenceWritingExample, $ReferenceWritingExample],
    ['writing/Label.DeclaredExample', LabelDeclaredExample, $LabelDeclaredExample],
    ['writing/Label.EmptyExample', LabelEmptyExample, $LabelEmptyExample],
    ['reference/Ref.MarkdownExample', RefMarkdownExample, $RefMarkdownExample],
    ['reference/Ref.PathExample', RefPathExample, $RefPathExample],
    ['reference/Ref.HeldExample', RefHeldExample, $RefHeldExample],
    ['reference/Ref.SentenceExample', RefSentenceExample, $RefSentenceExample],
    ['writing/Composition.ConfiguredExample', CompositionConfiguredExample, $CompositionConfiguredExample],
    ['writing/Letter.DerivedSmileyExample', LetterDerivedSmileyExample, $LetterDerivedSmileyExample],
    ['writing/Letter.GraphemeExample', LetterGraphemeExample, $LetterGraphemeExample],
    ['writing/Letter.KindExample', LetterKindExample, $LetterKindExample],
    ['writing/Letter.TextExample', LetterTextExample, $LetterTextExample],
    ['writing/Letter.WritingExample', LetterWritingExample, $LetterWritingExample],
    ['writing/Paragraph.DerivedTitleExample', ParagraphDerivedTitleExample, $ParagraphDerivedTitleExample],
    ['writing/Paragraph.SentencesExample', ParagraphSentencesExample, $ParagraphSentencesExample],
    ['writing/Paragraph.TextExample', ParagraphTextExample, $ParagraphTextExample],
    ['writing/Paragraph.WritingExample', ParagraphWritingExample, $ParagraphWritingExample],
    ['writing/Paragraph.NestedExample', ParagraphNestedExample, $ParagraphNestedExample],
    ['writing/Phrase.SentenceExample', PhraseSentenceExample, $PhraseSentenceExample],
    ['writing/Phrase.TextExample', PhraseTextExample, $PhraseTextExample],
    ['writing/Phrase.WordsExample', PhraseWordsExample, $PhraseWordsExample],
    ['writing/Phrase.WritingExample', PhraseWritingExample, $PhraseWritingExample],
    ['writing/Section.ParagraphsExample', SectionParagraphsExample, $SectionParagraphsExample],
    ['writing/Section.TextExample', SectionTextExample, $SectionTextExample],
    ['writing/Section.WritingExample', SectionWritingExample, $SectionWritingExample],
    ['writing/Section.NestedExample', SectionNestedExample, $SectionNestedExample],
    ['writing/Sentence.StopExample', SentenceStopExample, $SentenceStopExample],
    ['writing/Sentence.WordsExample', SentenceWordsExample, $SentenceWordsExample],
    ['writing/Sentence.WritingExample', SentenceWritingExample, $SentenceWritingExample],
    ['writing/Sentence.NestedExample', SentenceNestedExample, $SentenceNestedExample],
    ['writing/Word.KindExample', WordKindExample, $WordKindExample],
    ['writing/Word.LettersExample', WordLettersExample, $WordLettersExample],
    ['writing/Word.MixedExample', WordMixedExample, $WordMixedExample],
    ['writing/Word.TextExample', WordTextExample, $WordTextExample],
    ['writing/Word.WritingExample', WordWritingExample, $WordWritingExample],
    ['writing/Word.NestedExample', WordNestedExample, $WordNestedExample],
    ['writing/Writing.MeansExample', WritingMeansExample, $WritingMeansExample],
    ['writing/Writing.PlainExample', WritingPlainExample, $WritingPlainExample],
    ['reference/ReferenceCard.ListExample', ReferenceCardListExample, $ReferenceCardListExample],
    ['reference/ReferenceCard.TraitExample', ReferenceCardTraitExample, $ReferenceCardTraitExample],
    ['writing/List.LinesExample', ListLinesExample, $ListLinesExample],
    ['writing/List.WritingExample', ListWritingExample, $ListWritingExample],
    ['writing/List.NestedExample', ListNestedExample, $ListNestedExample],
    ['writing/List.TypedExample', ListTypedExample, $ListTypedExample],
    ['writing/Table.RowsExample', TableRowsExample, $TableRowsExample],
    ['writing/Table.WritingExample', TableWritingExample, $TableWritingExample],
    ['writing/Table.CellsExample', TableCellsExample, $TableCellsExample],
    ['writing/Table.TypedExample', TableTypedExample, $TableTypedExample],
    ['writing/Table.TraitExample', TableTraitExample, $TableTraitExample],
    ['writing/Heading.KindExample', HeadingKindExample, $HeadingKindExample],
    ['writing/Letter.ReferenceExample', LetterReferenceExample, $LetterReferenceExample],
    ['writing/Word.ReferenceExample', WordReferenceExample, $WordReferenceExample],
    ['writing/Sentence.ReferenceExample', SentenceReferenceExample, $SentenceReferenceExample],
    ['writing/Paragraph.ReferenceExample', ParagraphReferenceExample, $ParagraphReferenceExample],
    ['writing/Section.ReferenceExample', SectionReferenceExample, $SectionReferenceExample],
    ['book/Chapter.ReferenceExample', ChapterReferenceExample, $ChapterReferenceExample],
    ['book/Book.ReferenceExample', BookReferenceExample, $BookReferenceExample],
    ['book/Cover.KindExample', CoverKindExample, $CoverKindExample],
    ['book/Synopsis.KindExample', SynopsisKindExample, $SynopsisKindExample],
    ['book/TableOfContents.KindExample', TableOfContentsKindExample, $TableOfContentsKindExample],
    ['reference/Index.SectionExample', IndexSectionExample, $IndexSectionExample],
    ['book/PageFold.ReferenceExample', PageFoldReferenceExample, $PageFoldReferenceExample],
    ['book/Bookmark.ReferenceExample', BookmarkReferenceExample, $BookmarkReferenceExample],
    ['book/Highlight.PairExample', HighlightPairExample, $HighlightPairExample],
    ['reference/References.SectionExample', ReferencesSectionExample, $ReferencesSectionExample]
];

const roots = (Example: new () => $Chemical): ReactElement[] => {
    const view = new Example().view() as ReactElement;
    if (!isValidElement(view))
        throw new Error('a specification draws nothing');
    if (view.type !== Fragment)
        return [view];
    return Children.toArray((view.props as { children?: ReactNode }).children)
        .filter(isValidElement) as ReactElement[];
};

const rooted = (one: ReactElement): $Writing =>
    one.type === Writing
        ? drawn((one.props as { children?: ReactNode }).children).writing
        : built<$Writing>(one as ReactNode);

const composed = (writing: $Writing): $Writing[] => {
    const asked = writing as $Writing & { parts?: () => $Writing[] };
    return asked.parts ? asked.parts() : [];
};

describe('every specification draws', () => {
    for (const [name, Example] of specs)
        it(name, () => {
            expect(() => shown(createElement(Example))).not.toThrow();
        });

    it('and there are as many as the folders hold', () => {
        expect(specs.length).toBe(75);
    });
});

describe('every specification SPECIFIES — the example is writing the library accepts', () => {
    for (const [name, , Example] of specs)
        it(name, () => {
            for (const one of roots(Example))
                expect(() => rooted(one).specify()).not.toThrow();
        });
});

describe('every specification COMPOSES — the example has parts to read', () => {
    for (const [name, , Example] of specs)
        it(name, () => {
            for (const one of roots(Example)) {
                const writing = rooted(one);
                expect(() => composed(writing)).not.toThrow();
                expect(composed(writing).every(part => part instanceof $Writing)).toBe(true);
            }
        });
});

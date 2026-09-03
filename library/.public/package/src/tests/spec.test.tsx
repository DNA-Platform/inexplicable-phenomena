import { describe, it, expect } from 'vitest';
import { Children, ComponentType, Fragment, ReactElement, ReactNode, createElement, isValidElement } from 'react';
import { $Chemical } from '@dna-platform/chemistry';
import { $Writing, $Type } from '@/writing/Writing';
import { reflection } from '@/utilities/Reflection';
import { BookChaptersSpec, $BookChaptersSpec, BookWritingSpec, $BookWritingSpec } from './.spec/book/Book';
import { ChapterSectionsSpec, $ChapterSectionsSpec, ChapterWritingSpec, $ChapterWritingSpec } from './.spec/book/Chapter';
import { PathLettersSpec, $PathLettersSpec, PathTextSpec, $PathTextSpec, PathWritingSpec, $PathWritingSpec } from './.spec/reference/Path';
import { ReferenceHoldsSpec, $ReferenceHoldsSpec, ReferenceLettersSpec, $ReferenceLettersSpec, ReferencePathSpec, $ReferencePathSpec, ReferenceWritingSpec, $ReferenceWritingSpec } from './.spec/reference/Reference';
import { TraitDeclaredSpecFriend, $TraitDeclaredSpecFriend, TraitPureSpec, $TraitPureSpec } from './.spec/writing/Trait';
import { RefMarkdownSpec, $RefMarkdownSpec, RefPathSpec, $RefPathSpec, RefHeldSpec, $RefHeldSpec, RefSentenceSpec, $RefSentenceSpec } from './.spec/reference/Ref';
import { ReferenceCardListSpec, $ReferenceCardListSpec, ReferenceCardTraitSpec, $ReferenceCardTraitSpec } from './.spec/reference/ReferenceCard';
import { ListLinesSpec, $ListLinesSpec, ListWritingSpec, $ListWritingSpec, ListNestedSpec, $ListNestedSpec, ListTypedSpec, $ListTypedSpec } from './.spec/writing/List';
import { TableRowsSpec, $TableRowsSpec, TableWritingSpec, $TableWritingSpec, TableCellsSpec, $TableCellsSpec, TableTypedSpec, $TableTypedSpec, TableTraitSpec, $TableTraitSpec } from './.spec/writing/Table';
import { LetterReferenceSpec, $LetterReferenceSpec } from './.spec/writing/Letter';
import { WordReferenceSpec, $WordReferenceSpec } from './.spec/writing/Word';
import { SentenceReferenceSpec, $SentenceReferenceSpec } from './.spec/writing/Sentence';
import { ParagraphReferenceSpec, $ParagraphReferenceSpec } from './.spec/writing/Paragraph';
import { SectionReferenceSpec, $SectionReferenceSpec } from './.spec/writing/Section';
import { ChapterReferenceSpec, $ChapterReferenceSpec } from './.spec/book/Chapter';
import { BookReferenceSpec, $BookReferenceSpec } from './.spec/book/Book';
import { CoverKindSpec, $CoverKindSpec } from './.spec/book/Cover';
import { SynopsisKindSpec, $SynopsisKindSpec } from './.spec/book/Synopsis';
import { TableOfContentsKindSpec, $TableOfContentsKindSpec } from './.spec/book/TableOfContents';
import { IndexSectionSpec, $IndexSectionSpec } from './.spec/book/Index';
import { PageFoldReferenceSpec, $PageFoldReferenceSpec } from './.spec/book/PageFold';
import { BookmarkReferenceSpec, $BookmarkReferenceSpec } from './.spec/book/Bookmark';
import { HighlightPairSpec, $HighlightPairSpec } from './.spec/book/Highlight';
import { ReferencesSectionSpec, $ReferencesSectionSpec } from './.spec/reference/References';
import { CompositionConfiguredSpec, $CompositionConfiguredSpec } from './.spec/writing/Composition';
import { LetterDerivedSpecSmiley, $LetterDerivedSpecSmiley, LetterGraphemeSpec, $LetterGraphemeSpec, LetterKindSpec, $LetterKindSpec, LetterTextSpec, $LetterTextSpec, LetterWritingSpec, $LetterWritingSpec } from './.spec/writing/Letter';
import { ParagraphDerivedSpecTitle, $ParagraphDerivedSpecTitle, ParagraphSentencesSpec, $ParagraphSentencesSpec, ParagraphTextSpec, $ParagraphTextSpec, ParagraphWritingSpec, $ParagraphWritingSpec, ParagraphNestedSpec, $ParagraphNestedSpec } from './.spec/writing/Paragraph';
import { PhraseSentenceSpec, $PhraseSentenceSpec, PhraseTextSpec, $PhraseTextSpec, PhraseWordsSpec, $PhraseWordsSpec, PhraseWritingSpec, $PhraseWritingSpec } from './.spec/writing/Phrase';
import { SectionParagraphsSpec, $SectionParagraphsSpec, SectionTextSpec, $SectionTextSpec, SectionWritingSpec, $SectionWritingSpec, SectionNestedSpec, $SectionNestedSpec } from './.spec/writing/Section';
import { SentenceStopSpec, $SentenceStopSpec, SentenceWordsSpec, $SentenceWordsSpec, SentenceWritingSpec, $SentenceWritingSpec, SentenceNestedSpec, $SentenceNestedSpec } from './.spec/writing/Sentence';
import { WordKindSpec, $WordKindSpec, WordLettersSpec, $WordLettersSpec, WordMixedSpec, $WordMixedSpec, WordTextSpec, $WordTextSpec, WordWritingSpec, $WordWritingSpec, WordNestedSpec, $WordNestedSpec } from './.spec/writing/Word';
import { WritingMeansSpec, $WritingMeansSpec, WritingPlainSpec, $WritingPlainSpec } from './.spec/writing/Writing';
import { TitleKindSpec, $TitleKindSpec } from './.spec/writing/Title';
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
    ['reference/Reference.HoldsSpec', ReferenceHoldsSpec, $ReferenceHoldsSpec],
    ['reference/Reference.LettersSpec', ReferenceLettersSpec, $ReferenceLettersSpec],
    ['reference/Reference.PathSpec', ReferencePathSpec, $ReferencePathSpec],
    ['reference/Reference.WritingSpec', ReferenceWritingSpec, $ReferenceWritingSpec],
    ['writing/Trait.DeclaredSpecFriend', TraitDeclaredSpecFriend, $TraitDeclaredSpecFriend],
    ['writing/Trait.PureSpec', TraitPureSpec, $TraitPureSpec],
    ['reference/Ref.MarkdownSpec', RefMarkdownSpec, $RefMarkdownSpec],
    ['reference/Ref.PathSpec', RefPathSpec, $RefPathSpec],
    ['reference/Ref.HeldSpec', RefHeldSpec, $RefHeldSpec],
    ['reference/Ref.SentenceSpec', RefSentenceSpec, $RefSentenceSpec],
    ['writing/Composition.ConfiguredSpec', CompositionConfiguredSpec, $CompositionConfiguredSpec],
    ['writing/Letter.DerivedSpecSmiley', LetterDerivedSpecSmiley, $LetterDerivedSpecSmiley],
    ['writing/Letter.GraphemeSpec', LetterGraphemeSpec, $LetterGraphemeSpec],
    ['writing/Letter.KindSpec', LetterKindSpec, $LetterKindSpec],
    ['writing/Letter.TextSpec', LetterTextSpec, $LetterTextSpec],
    ['writing/Letter.WritingSpec', LetterWritingSpec, $LetterWritingSpec],
    ['writing/Paragraph.DerivedSpecTitle', ParagraphDerivedSpecTitle, $ParagraphDerivedSpecTitle],
    ['writing/Paragraph.SentencesSpec', ParagraphSentencesSpec, $ParagraphSentencesSpec],
    ['writing/Paragraph.TextSpec', ParagraphTextSpec, $ParagraphTextSpec],
    ['writing/Paragraph.WritingSpec', ParagraphWritingSpec, $ParagraphWritingSpec],
    ['writing/Paragraph.NestedSpec', ParagraphNestedSpec, $ParagraphNestedSpec],
    ['writing/Phrase.SentenceSpec', PhraseSentenceSpec, $PhraseSentenceSpec],
    ['writing/Phrase.TextSpec', PhraseTextSpec, $PhraseTextSpec],
    ['writing/Phrase.WordsSpec', PhraseWordsSpec, $PhraseWordsSpec],
    ['writing/Phrase.WritingSpec', PhraseWritingSpec, $PhraseWritingSpec],
    ['writing/Section.ParagraphsSpec', SectionParagraphsSpec, $SectionParagraphsSpec],
    ['writing/Section.TextSpec', SectionTextSpec, $SectionTextSpec],
    ['writing/Section.WritingSpec', SectionWritingSpec, $SectionWritingSpec],
    ['writing/Section.NestedSpec', SectionNestedSpec, $SectionNestedSpec],
    ['writing/Sentence.StopSpec', SentenceStopSpec, $SentenceStopSpec],
    ['writing/Sentence.WordsSpec', SentenceWordsSpec, $SentenceWordsSpec],
    ['writing/Sentence.WritingSpec', SentenceWritingSpec, $SentenceWritingSpec],
    ['writing/Sentence.NestedSpec', SentenceNestedSpec, $SentenceNestedSpec],
    ['writing/Word.KindSpec', WordKindSpec, $WordKindSpec],
    ['writing/Word.LettersSpec', WordLettersSpec, $WordLettersSpec],
    ['writing/Word.MixedSpec', WordMixedSpec, $WordMixedSpec],
    ['writing/Word.TextSpec', WordTextSpec, $WordTextSpec],
    ['writing/Word.WritingSpec', WordWritingSpec, $WordWritingSpec],
    ['writing/Word.NestedSpec', WordNestedSpec, $WordNestedSpec],
    ['writing/Writing.MeansSpec', WritingMeansSpec, $WritingMeansSpec],
    ['writing/Writing.PlainSpec', WritingPlainSpec, $WritingPlainSpec],
    ['reference/ReferenceCard.ListSpec', ReferenceCardListSpec, $ReferenceCardListSpec],
    ['reference/ReferenceCard.TraitSpec', ReferenceCardTraitSpec, $ReferenceCardTraitSpec],
    ['writing/List.LinesSpec', ListLinesSpec, $ListLinesSpec],
    ['writing/List.WritingSpec', ListWritingSpec, $ListWritingSpec],
    ['writing/List.NestedSpec', ListNestedSpec, $ListNestedSpec],
    ['writing/List.TypedSpec', ListTypedSpec, $ListTypedSpec],
    ['writing/Table.RowsSpec', TableRowsSpec, $TableRowsSpec],
    ['writing/Table.WritingSpec', TableWritingSpec, $TableWritingSpec],
    ['writing/Table.CellsSpec', TableCellsSpec, $TableCellsSpec],
    ['writing/Table.TypedSpec', TableTypedSpec, $TableTypedSpec],
    ['writing/Table.TraitSpec', TableTraitSpec, $TableTraitSpec],
    ['writing/Title.KindSpec', TitleKindSpec, $TitleKindSpec],
    ['writing/Letter.ReferenceSpec', LetterReferenceSpec, $LetterReferenceSpec],
    ['writing/Word.ReferenceSpec', WordReferenceSpec, $WordReferenceSpec],
    ['writing/Sentence.ReferenceSpec', SentenceReferenceSpec, $SentenceReferenceSpec],
    ['writing/Paragraph.ReferenceSpec', ParagraphReferenceSpec, $ParagraphReferenceSpec],
    ['writing/Section.ReferenceSpec', SectionReferenceSpec, $SectionReferenceSpec],
    ['book/Chapter.ReferenceSpec', ChapterReferenceSpec, $ChapterReferenceSpec],
    ['book/Book.ReferenceSpec', BookReferenceSpec, $BookReferenceSpec],
    ['book/Cover.KindSpec', CoverKindSpec, $CoverKindSpec],
    ['book/Synopsis.KindSpec', SynopsisKindSpec, $SynopsisKindSpec],
    ['book/TableOfContents.KindSpec', TableOfContentsKindSpec, $TableOfContentsKindSpec],
    ['reference/Index.SectionSpec', IndexSectionSpec, $IndexSectionSpec],
    ['book/PageFold.ReferenceSpec', PageFoldReferenceSpec, $PageFoldReferenceSpec],
    ['book/Bookmark.ReferenceSpec', BookmarkReferenceSpec, $BookmarkReferenceSpec],
    ['book/Highlight.PairSpec', HighlightPairSpec, $HighlightPairSpec],
    ['reference/References.SectionSpec', ReferencesSectionSpec, $ReferencesSectionSpec]
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

const rooted = (one: ReactElement): $Writing =>
    one.type === Writing
        ? drawn((one.props as { children?: ReactNode }).children).writing
        : built<$Writing>(one as ReactNode);

const composed = (writing: $Writing): $Writing[] => {
    const asked = writing as $Writing & { parts?: () => $Writing[] };
    return asked.parts ? asked.parts() : [];
};

describe('every specification draws', () => {
    for (const [name, Spec] of specs)
        it(name, () => {
            expect(() => shown(createElement(Spec))).not.toThrow();
        });

    it('and there are as many as the folders hold', () => {
        expect(specs.length).toBe(75);
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

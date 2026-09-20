import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Composition$, $Composition } from '@/writing/Composition';
import { $Catalogue, $TypeOfCatalogue } from '@/reference/Catalogue';
import { $Type } from '@/writing/Type';
import { $Document, $$Document, $TypeOfDocument, doc } from './Document';
import { $Path, Path as path } from '@/reference/Path';
import { $Section } from '@/writing/Section';

export interface $Chapter$ extends $Composition$ {
    readonly title: $Section | undefined;
    readonly name: string;
}

export class $Chapter extends $Composition implements $Chapter$ {
    get title(): $Section | undefined { return this.searchPartsForOne<$Document>($TypeOfDocument)?.title(); }
    get name(): string { return html.text(this.title?.heading()?._block).trim(); }

    // A CHAPTER WEARS ITS OWN NAME AS ITS ID, printed title or not. The library addresses a chapter
    // as `/book/#chapter`, and the compiler writes that fragment for every chapter without knowing
    // whether its title prints — Doug, 2026-09-20: "The compiler just cares that things are in the
    // right file." So the element that always draws, the chapter's, is what answers to it; a title
    // with `print={false}` is filtered out before it is viewed and could never have.
    protected override get id(): string | undefined {
        const name = this.name;

        return name === '' ? undefined : reflection.slug(name);
    }

    // A CHAPTER GIVES ITS DOCUMENT ITS ADDRESS, and the address is the TITLE — Doug, 2026-09-15: "it
    // needs to point to the document. We need chapters to give their document #{title} and the title
    // would point there wherever it is." A book gives each chapter a mention pathed by POSITION,
    // which is the library's address and not a URL; a document is reached by what it is called, so
    // a title pointing at it lands on the chapter whose element wears that id.
    $Chapter(block: $Block) {
        super.$Composition(this.addType(block, $TypeOfChapter));
    }

    // A CHAPTER HOLDS ONLY ANNOTATIONS AND WRITES ITS DOCUMENT IN PRINT, its own specification says,
    // so its parts are the one writing it prints — and the chapter gives that document its address
    // as it hands it over. Doug, 2026-09-15: "it needs to point to the document. We need chapters to
    // give their document #{title} and the title would point there wherever it is." A book addresses
    // its chapters by POSITION, which is the library's own address; a document is reached by what it
    // is CALLED, and the chapter's own element wears that id. It is given here rather than at the
    // bond because a chapter has not printed yet when it is bound.
    override parts(): $Writing[] {
        const printed = reflection.printed(this);
        const titled = printed.find((part): part is $Document => reflection.is(part, $TypeOfDocument))?.title()?.heading();
        const Mention = $(doc);
        const Path = $(path);
        const at = `#${reflection.slug(html.text(titled?._block))}`;
        for (const part of printed) part._mention ??= $<$$Document>(<Mention />, $<$Path>(<Path>{at}</Path>), part);

        return printed;
    }
}

export class $$Chapter extends $Catalogue {
    $$Chapter(block: $Block) {
        super.$Catalogue(this.addType(block, $TypeOfChapterMention));
    }
}

export class $TypeOfChapter extends $Type {
    protected override specification: Specification<$Writing> = new ChapterSpecification();
}

export class $TypeOfChapterMention extends $TypeOfCatalogue { }

export class ChapterSpecification extends WritingSpecification {
    @specify('a chapter writes its document in print')
    override $saysSomething(): boolean | void {
        return false;
    }

    @specify('the document a chapter prints specifies')
    override $holdsSpecifiedParts(writing: $Writing): void {
        this.specified(reflection.printed(writing));
    }

    // A CHAPTER VALIDATES ITS TITLE — Doug, 2026-09-15: "If the created one is bad, then we wrote a
    // bad chapter. Have chapter validate the title then rather than any header or something like
    // that." So the demand stands here, on the chapter, and asks nothing about what a document opens
    // with: a chapter is titled by the section that is its title, and a chapter titled by nothing is
    // a chapter written wrong.
    @specify('a chapter is titled')
    $isTitled(writing: $Writing): void {
        const printed = reflection.printed(writing).find((part): part is $Document => reflection.is(part, $TypeOfDocument));
        $check(printed?.title()?.heading() !== undefined, 'a chapter is titled, and this one is titled by nothing');
    }

    @specify('a chapter holds only annotations')
    $holdsOnlyAnnotations(writing: $Writing): void {
        $check(this.beside(writing).every(part => reflection.annotation(part)),
            'a chapter holds only annotations, and this one holds something else');
    }
}

export const Chapter = $($Chapter);
export const chapter = $($$Chapter);
export const TypeOfChapter = $($TypeOfChapter);
export const TypeOfChapterMention = $($TypeOfChapterMention);

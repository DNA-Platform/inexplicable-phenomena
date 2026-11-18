import { ElementType, ReactNode } from 'react';
import { $, $check, $Chemical, selection } from '@dna-platform/chemistry';
import { $Annotation, $Append, $Book, $Chapter, $Content, $Format, $Paragraph, $Section, $Word, $Writing, AnnotationSpecification, Code as code, ContainerProps, Given, html, specify } from '@dna-platform/public';

// THE LISTING IS HIS, Doug, 2026-11-17, Sprint 131: "the code should probably look identical to what's in mine, but
// the container for the specification might not" — measured off his manual the same day and carried into the theme's
// listing part: JetBrains Mono at 12 on 20.4, the ink on the night, the four colours, the numbers in their column, his
// light palette behind the bar's switch. The modes and the options are annotations said of the book, as his panel's
// states are: a word on the bar sets the book's edit, the book wears the mode's class, and the sheet decides what
// shows, so a flip costs one paint and draws nothing twice.
export class OfABookSpecification extends AnnotationSpecification {
    @specify('this is said of a book')
    $saidOfABook(writing: $Writing): void {
        $check(writing instanceof $Book, 'this is said of a book, and this is not one');
    }
}

// ONE MODE AT A TIME, Doug, 2026-11-17: "a full screen versus page mode for the reference manual like you do for the
// code", "So it can be book like and editor like". The page is the book-like mode, the chapter at the measure with the
// listing as its plate; the editor is the full screen, the table as the tree, the words beside it, the file's page at
// the right. A mode said later suppresses the one said earlier, so the book's own default yields to a press.
export class $Mode extends $Annotation {
    specification = new OfABookSpecification();

    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Mode)
                writing.annotations.express(annotation, false);
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }
}

export class $PageMode extends $Mode {
    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-page-mode');
    }
}

export class $EditorMode extends $Mode {
    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-editor-mode');
    }
}

export class $Option extends $Annotation {
    specification = new OfABookSpecification();

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }
}

// THE WORDS PUT AWAY, as his words tab does: the tree and the file stand alone.
export class $WordsAway extends $Option {
    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-words-away');
    }
}

export class $LightCode extends $Option {
    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-light-code');
    }
}

export class $WrappedCode extends $Option {
    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-wrapped-code');
    }
}

export class $UnnumberedCode extends $Option {
    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-unnumbered-code');
    }
}

// A SWITCH TOGGLES ONE ANNOTATION OF THE BOOK; pressed when the book carries it, or, inverted, when it does not, so
// that words reads pressed while the words show and lines while the numbers do.
export class $Switch extends $Word {
    $annotation: Given<$Annotation> | undefined = undefined;
    $inverse = false;
    get on(): boolean {
        const chosen = this.$annotation !== undefined && [this.book!.$is].flat().includes(this.$annotation);
        return chosen !== this.$inverse;
    }

    $Switch(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'button');
    }

    override container(props: ContainerProps): ReactNode {
        return super.container({ type: 'button', 'aria-pressed': this.on, onClick: () => this.press(), ...props });
    }

    press(): void {
        const book = this.book!;
        const chosen = this.$annotation;
        if (chosen === undefined) return;
        const annotations = [book.$is].flat();
        book.$is = annotations.includes(chosen)
            ? annotations.filter(annotation => annotation !== chosen)
            : [chosen, ...annotations];
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-switch');
    }
}

// A TAB CHOOSES ONE OF A FAMILY; pressed when the book's edit holds it, or, while the edit holds none of the family,
// when the book says it at its define, which is how a manual reads the editor pressed before any press.
export class $Tab extends $Switch {
    $family: Given<$Annotation>[] = [];
    override get on(): boolean {
        const book = this.book!;
        const own = this.$annotation;
        if (own === undefined) return false;
        const chosen = [book.$is].flat();
        if (chosen.some(annotation => this.$family.includes(annotation))) return chosen.includes(own);
        return book.annotations.expressed(own) !== undefined;
    }

    override press(): void {
        const book = this.book!;
        const own = this.$annotation;
        if (own === undefined) return;
        const annotations = [book.$is].flat().filter(annotation => !this.$family.includes(annotation));
        book.$is = [own, ...annotations];
    }
}

export const languages: Record<string, string> = { tsx: 'typescript', ts: 'typescript', mjs: 'javascript', js: 'javascript', css: 'css', html: 'xml', svg: 'xml', json: 'json', md: 'markdown' };

export const fileNameOf = (file: $Append): string => `${file.$identifier}${file.$type}`;

// An annotation added is prepended, so a chapter's appends are found newest first; the written order is the reverse.
export const filesOf = (chapter: $Chapter | undefined): $Append[] => [...(chapter?.annotations.find($Append) ?? [])].reverse();

// THE FACE, Doug, 2026-11-17: JetBrains Mono from Google Fonts, as his page takes it.
export const face = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap';

export const editorOf = (writing: $Writing): $Editor | undefined => writing.book?.annotations.expressed($Editor);

// THE LISTING, the package's Code figure dressed: one tab per file the chapter appends, or the one file it names, the
// open file numbered by the figure in the pane beneath the bar. CODE ANYWHERE IT IS NEEDED, Doug, 2026-11-17: "It is
// important to be able to write code anywhere it is needed" — a listing stands in any chapter of any book, and its
// dress follows the file, never the book's kind. AN APPENDED HTML HAS TWO FACES, his ruling lifted by Sprint 130's
// room the same day, "the reference manual should have this code": the listing of its source, and the page itself
// run in a frame, which in the editor mode is the full screen. The open file is the book's editor's, one for the
// book, so the chapter's plate, the file's page and the tree agree on it.
export class $Listing extends $Paragraph {
    $identifier = '';
    $type = '';
    $running = false;
    get files(): $Append[] {
        const appends = filesOf(this.chapter);
        if (this.$identifier === '') return appends;
        return appends.filter(append => append.$identifier === this.$identifier && (this.$type === '' || append.$type === this.$type));
    }
    get openFile(): $Append | undefined {
        const files = this.files;
        const wanted = editorOf(this)?.$openFile;
        return wanted !== undefined && files.includes(wanted) ? wanted : files[0];
    }
    get runs(): boolean { return this.openFile?.$type === '.html'; }

    $Listing(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'div');
    }

    override write(): ReactNode {
        const file = this.openFile;
        if (file === undefined) return null;
        const Bar = $(listingBar);
        const Code = $(code);
        const language = languages[file.$type.replace(/^\./u, '')] ?? '';
        return (
            <>
                <link
                    rel="stylesheet"
                    href={face}
                />
                <Bar listing={this} />
                <div className="pd-pane">
                    {this.$running && this.runs ? (
                        <iframe
                            className="pd-run"
                            sandbox="allow-scripts"
                            srcDoc={html.copy(file.text)}
                            title={fileNameOf(file)}
                        />
                    ) : (
                        <Code
                            identifier={file.$identifier}
                            type={file.$type}
                            language={language}
                            numbered
                        />
                    )}
                </div>
            </>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-listing');
    }
}

// THE BAR AS DRAWN, Doug, 2026-11-17: "I like the bar" — the file tabs, run for a page, then light, wrap and lines,
// then words, the page and the editor.
export class $ListingBar extends $Paragraph {
    $listing: $Listing | undefined = undefined;

    $ListingBar(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'div');
    }

    override write(): ReactNode {
        const listing = this.$listing;
        if (listing === undefined) return null;
        const FileTab = $(fileTab);
        const Run = $(run);
        const Switch = $(switchOf);
        const Tab = $(tab);
        return (
            <>
                {listing.files.map(file => (
                    <FileTab
                        key={fileNameOf(file)}
                        listing={listing}
                        file={file}
                    />
                ))}
                {listing.runs ? (
                    <span className="pd-faces">
                        <Run listing={listing} />
                    </span>
                ) : null}
                <span className="pd-options">
                    <Switch annotation={lightCode}>
                        light
                    </Switch>
                    <Switch annotation={wrappedCode}>
                        wrap
                    </Switch>
                    <Switch
                        annotation={unnumberedCode}
                        inverse
                    >
                        lines
                    </Switch>
                </span>
                <span className="pd-modes">
                    <Switch
                        annotation={wordsAway}
                        inverse
                    >
                        words
                    </Switch>
                    <Tab
                        annotation={pageMode}
                        family={modes}
                    >
                        the page
                    </Tab>
                    <Tab
                        annotation={editorMode}
                        family={modes}
                    >
                        the editor
                    </Tab>
                </span>
            </>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-listing-bar');
    }
}

export class $FileTab extends $Word {
    $listing: $Listing | undefined = undefined;
    $file: $Append | undefined = undefined;
    get on(): boolean { return this.$file !== undefined && this.$listing?.openFile === this.$file; }

    $FileTab(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'button');
    }

    override container(props: ContainerProps): ReactNode {
        return super.container({ type: 'button', 'aria-pressed': this.on, onClick: () => this.press(), ...props });
    }

    press(): void {
        const listing = this.$listing;
        if (listing === undefined || this.$file === undefined) return;
        const editor = editorOf(listing);
        if (editor !== undefined) editor.$openFile = this.$file;
        listing.$running = false;
    }

    override write(): ReactNode {
        return (
            <>
                <span className="pd-mark">
                    ‹›
                </span>
                {this.$file === undefined ? '' : fileNameOf(this.$file)}
            </>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-file-tab');
    }
}

export class $Run extends $Word {
    $listing: $Listing | undefined = undefined;

    $Run(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'button');
    }

    override container(props: ContainerProps): ReactNode {
        return super.container({ type: 'button', 'aria-pressed': this.$listing?.$running === true, onClick: () => this.press(), ...props });
    }

    press(): void {
        const listing = this.$listing;
        if (listing !== undefined) listing.$running = !listing.$running;
    }

    override write(): ReactNode {
        return 'run';
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-run-switch');
    }
}

// THE EDITOR, said of every book by the library's book class, before Paginated so its layer is the book's nearest:
// the format whose layer is the grid of the editor view, the table of contents as the tree at the left, the open
// chapter's words beside it, the file's page at the right the window's height, three pages of one sheet. Doug,
// 2026-11-17: "the editor view does use the table as the file tree", "Not bookish with shading. Paperish as in
// unfinished", "The white paper and the vscode with UI options is absolutely breathtaking in contrast" — no shadow,
// no rule but the running heads' hairlines. The book wears editing while the editor mode is on and the open chapter
// holds a listing; a chapter without a file reads as the page whatever the mode, so a book is never gridded around
// an empty right-hand page. The editor holds the book's open file, which the tree's leaves and the file tabs set.
export class $Editor extends $Format {
    specification = new OfABookSpecification();
    $openFile: $Append | undefined = undefined;
    override style: ElementType = selection.div`
        &:has(> .pd-book.pa-editing) { display: grid; grid-template-columns: 13rem minmax(0, 36rem) minmax(0, 1fr); align-items: start; min-height: 100vh; }
        &:has(> .pd-book.pa-editing.pa-words-away) { grid-template-columns: 13rem minmax(0, 1fr); }
        & > .pd-book.pa-editing { display: contents; }
        & > .pd-book.pa-editing > * { grid-column: 2; box-sizing: border-box; min-width: 0; padding-inline: 1.5rem; }
        & > .pd-book.pa-editing > .pd-running-head { padding-block-start: calc(2 * ${({ theme }) => theme.space}); }
        & > .pd-book.pa-editing.pa-words-away > :not(.pd-file-page):not(.pd-container:has(> .pa-table-of-contents)) { display: none; }
        & > .pd-book.pa-editing .pa-page.pa-open > .pd-listing { display: none; }
        & > .pd-book.pa-editing > .pd-container:has(> .pa-table-of-contents) { grid-column: 1; grid-row: 1 / span 99; position: sticky; top: 0; height: 100vh; overflow: auto; padding: calc(2 * ${({ theme }) => theme.space}) ${({ theme }) => theme.space} ${({ theme }) => theme.space} 1.5rem; font-size: .86em; scrollbar-width: thin; scrollbar-color: transparent transparent; }
        & > .pd-book.pa-editing > .pd-container:has(> .pa-table-of-contents):hover { scrollbar-color: color-mix(in srgb, ${({ theme }) => theme.ink} 25%, transparent) transparent; }
        & > .pd-book.pa-editing .pa-table-of-contents.pa-page:not(.pa-open) { display: block; }
        & > .pd-book.pa-editing .pa-table-of-contents { margin-block: 0; }
        & > .pd-book.pa-editing .pa-table-of-contents > .pd-title, & > .pd-book.pa-editing .pa-table-of-contents .pd-paragraph:has(> .pa-parenthetical), & > .pd-book.pa-editing .pa-table-of-contents .pa-parenthetical { display: none; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-section { margin-block: 0 ${({ theme }) => theme.space}; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-heading { margin-block: 0 1rem; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-paragraph { margin: 0 0 .25rem -1.5rem; padding: .15rem 0 .15rem calc(1.5rem - 2px); border-inline-start: 2px solid transparent; color: color-mix(in srgb, ${({ theme }) => theme.ink} 72%, ${({ theme }) => theme.paper}); }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-paragraph.pa-open { border-inline-start-color: ${({ theme }) => theme.link}; color: ${({ theme }) => theme.ink}; }
        & > .pd-book.pa-editing .pa-table-of-contents .pa-reference { color: inherit; text-decoration: none; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-leaf { display: flex; }
        & > .pd-book.pa-editing > .pd-file-page { display: grid; grid-column: 3; grid-row: 1 / span 99; grid-template-rows: auto minmax(0, 1fr); position: sticky; top: 0; height: 100vh; padding: calc(2 * ${({ theme }) => theme.space}) 2rem ${({ theme }) => theme.space}; margin-block: 0; background: ${({ theme }) => theme.paper}; }
        & > .pd-book.pa-editing > .pd-file-page .pd-listing { margin: 0; min-height: 0; }
        & > .pd-book.pa-editing > .pd-file-page .pd-pane { max-height: none; }
        & > .pd-book.pa-editing > .pd-file-page .pd-run { height: 100%; }
        .pd-file-page { display: none; }
        .pd-file-head { display: flex; justify-content: flex-end; align-items: center; gap: .6em; margin: 0 0 ${({ theme }) => theme.space}; padding-block-end: calc(${({ theme }) => theme.space} / 4); border-block-end: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 30%, ${({ theme }) => theme.paper}); font-size: calc(0.7 * ${({ theme }) => theme.size}); letter-spacing: 0.08em; text-transform: uppercase; }
        .pd-file-head .pd-file-label { color: color-mix(in srgb, ${({ theme }) => theme.ink} 60%, ${({ theme }) => theme.paper}); }
        .pd-file-head .pd-file-name { font: 500 12px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0; text-transform: none; color: ${({ theme }) => theme.ink}; }
        .pd-leaf { display: none; align-items: center; gap: .4rem; margin: 0 0 .45rem 1rem; font: 400 12px 'JetBrains Mono', ui-monospace, monospace; color: color-mix(in srgb, ${({ theme }) => theme.ink} 55%, ${({ theme }) => theme.paper}); text-decoration: none; }
        .pd-leaf .pd-mark { color: #9aa4b3; }
        .pd-leaf.pa-open { color: ${({ theme }) => theme.link}; }
        .pd-leaf.pa-open .pd-mark { color: ${({ theme }) => theme.link}; }
        .pa-appendix .pd-leaf { display: flex; }
        @media (max-width: 640px) {
            &:has(> .pd-book.pa-editing), &:has(> .pd-book.pa-editing.pa-words-away) { display: block; }
            & > .pd-book.pa-editing { display: block; }
            & > .pd-book.pa-editing > * { padding-inline: 0; }
            & > .pd-book.pa-editing > .pd-container:has(> .pa-table-of-contents) { display: none; }
            & > .pd-book.pa-editing.pa-words-away > :not(.pd-file-page):not(.pd-container:has(> .pa-table-of-contents)) { display: revert; }
            & > .pd-book.pa-editing > .pd-file-page { position: static; height: auto; padding: 0 0 ${({ theme }) => theme.space}; }
            & > .pd-book.pa-editing > .pd-file-page .pd-pane { max-height: 70vh; }
        }
    `;

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-editor');
        if (!(writing instanceof $Book)) return;
        const open = writing.bookmark ?? writing.cover;
        if (writing.annotations.expressed($EditorMode) !== undefined && open !== undefined && open.text.find($Listing).length > 0)
            writing.classes.add(this, 'pa-editing');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }
}

// THE FILE'S PAGE, drawn by the book after its chapters and shown by the editor's layer at the right: a head naming
// the file in the running head's voice, and the open chapter's listing beneath it the height of the page.
export class $FilePage extends $Paragraph {
    $FilePage(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'div');
    }

    override write(): ReactNode {
        const book = this.book;
        if (book === undefined) return null;
        const open = book.bookmark ?? book.cover;
        const written = open?.text.find($Listing)[0];
        if (open === undefined || written === undefined) return null;
        const files = filesOf(open);
        const wanted = editorOf(this)?.$openFile;
        const file = wanted !== undefined && files.includes(wanted) ? wanted : files[0];
        const Listing = $(listing);
        return (
            <>
                <div className="pd-file-head">
                    <span className="pd-file-label">
                        The file beside the chapter
                    </span>
                    <span className="pd-file-name">
                        {file === undefined ? '' : fileNameOf(file)}
                    </span>
                </div>
                <Listing
                    chapter={open}
                    identifier={written.$identifier}
                    type={written.$type}
                />
            </>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-file-page');
    }
}

// A BRANCH, said of each entry of the table of contents by the book at its bond, as the binder's explorer did: it
// finds the chapter the entry means, marks the entry while that chapter is open, and hangs the chapter's files
// beneath it as leaves, each a press that opens the chapter in the editor turned to that file. The written table
// catalogues chapters and nothing else; the leaves are the view's, shown in the tree and under an appendix's rows.
export class $Branch extends $Format {
    get meant(): $Chapter | undefined {
        const identifier = this.parent?.annotations.expressed($Content)?.identifier;
        if (identifier === undefined || identifier === '') return undefined;
        return this.book?.text.find($Chapter).find(chapter => chapter.mention?.identifier === identifier);
    }

    $Branch(...chemicals: $Chemical[]) {
        this.$Format(...chemicals);
        this.style = ({ className, children }: { className?: string; children?: ReactNode }) => {
            const chapter = this.meant;
            const files = chapter === undefined || chapter.text.find($Listing).length === 0 ? [] : filesOf(chapter);
            const wanted = editorOf(this)?.$openFile;
            const current = wanted !== undefined && files.includes(wanted) ? wanted : files[0];
            const open = this.book?.bookmark === chapter;
            return (
                <div className={className}>
                    {children}
                    {files.map(file => (
                        <a
                            key={fileNameOf(file)}
                            className={open && current === file ? 'pd-leaf pa-open' : 'pd-leaf'}
                            href={chapter?.mention?.identifier}
                            onClick={() => this.press(file)}
                        >
                            <span className="pd-mark">
                                ‹›
                            </span>
                            {fileNameOf(file)}
                        </a>
                    ))}
                </div>
            );
        };
    }

    press(file: $Append): void {
        const book = this.book;
        if (book === undefined) return;
        const editor = editorOf(this);
        if (editor !== undefined) editor.$openFile = file;
        const annotations = [book.$is].flat().filter(annotation => !modes.includes(annotation));
        book.$is = [editorMode, ...annotations];
    }

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-branch');
        const book = this.book;
        const chapter = this.meant;
        if (book === undefined) return;
        const open = chapter !== undefined && book.bookmark === chapter;
        const lit = [...writing.classes].includes('pa-open');
        if (open && !lit) writing.classes.add(book, 'pa-open');
        if (!open && lit) writing.classes.revert(book);
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }
}

// THE APPENDIX, Doug, 2026-11-17: "it uses reference manual components, and is like a special part of a book that
// can refer to code that is specific to the book", "By default yeah it can be another part of the table, since it's
// kind of different" — said of a section of the table of contents whose heading is the part's name and whose rows
// are the part's chapters; the theme sets it at the table's foot in the smaller voice, and the branch hangs each
// row's files beneath it, so an appendix reads as its own reference manual inside the book it is in.
export class $Appendix extends $Annotation {
    specification = new AppendixSpecification();

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-appendix');
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }
}

export class AppendixSpecification extends AnnotationSpecification {
    @specify('an appendix is said of a section')
    $saidOfASection(writing: $Writing): void {
        $check(writing instanceof $Section, 'an appendix is said of a section of the table of contents, and this is not a section');
    }
}

export const PageMode = $($PageMode);
export const EditorMode = $($EditorMode);
export const WordsAway = $($WordsAway);
export const LightCode = $($LightCode);
export const WrappedCode = $($WrappedCode);
export const UnnumberedCode = $($UnnumberedCode);
export const Switch = $($Switch);
export const Tab = $($Tab);
export const Listing = $($Listing);
export const ListingBar = $($ListingBar);
export const FileTab = $($FileTab);
export const Run = $($Run);
export const Editor = $($Editor);
export const FilePage = $($FilePage);
export const Branch = $($Branch);
export const Appendix = $($Appendix);
export const modes: Given<$Annotation>[] = [PageMode, EditorMode];
const pageMode = PageMode;
const editorMode = EditorMode;
const wordsAway = WordsAway;
const lightCode = LightCode;
const wrappedCode = WrappedCode;
const unnumberedCode = UnnumberedCode;
const switchOf = Switch;
const tab = Tab;
const listing = Listing;
const listingBar = ListingBar;
const fileTab = FileTab;
const run = Run;

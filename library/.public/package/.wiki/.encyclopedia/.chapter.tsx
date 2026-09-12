import { ReactNode } from 'react';
import { $, $Block, $check, select, styled } from '@dna-platform/chemistry';
import { $Chapter, $Format, $Document, $Section, $Paragraph, $IndexCard, $Ref, $Theme$, html } from '@dna-platform/public';

export default class $WikipediaChapter extends $Chapter { }

// A field's resting edge is the link colour lightened against the paper, so a
// theme that changes what a link looks like changes every border drawn from one.
const edge = (theme: $Theme$) => `color-mix(in srgb, ${theme.link} 76%, ${theme.paper})`;

// An icon drawn into a data URI cannot inherit, so the theme is painted into it.
const painted = (svg: string, colour: string) =>
    `url("data:image/svg+xml,${svg.replaceAll('{ink}', encodeURIComponent(colour))}")`;

const chevron = (colour: string) => painted("%3Csvg width='12' height='8' viewBox='-1 -1 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='none' stroke='{ink}' stroke-width='1.11' d='M.56.55 5 4.9 9.44.54'/%3E%3C/svg%3E", colour);

const magnifier = (colour: string) => painted("%3Csvg width='22' height='22' viewBox='-1 -1 22 22' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='{ink}' d='M7.5 13c3.04 0 5.5-2.46 5.5-5.5S10.54 2 7.5 2 2 4.46 2 7.5 4.46 13 7.5 13zm4.55.46A7.432 7.432 0 0 1 7.5 15C3.36 15 0 11.64 0 7.5S3.36 0 7.5 0C11.64 0 15 3.36 15 7.5c0 1.71-.57 3.29-1.54 4.55l6.49 6.49-1.41 1.41-6.49-6.49z'/%3E%3C/svg%3E", colour);

const translation = (colour: string) => painted("%3Csvg width='22' height='22' viewBox='-1 -1 22 22' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='{ink}' fill-rule='evenodd' d='M20 18h-1.44a.61.61 0 0 1-.4-.12.81.81 0 0 1-.23-.31L17 15h-5l-1 2.54a.77.77 0 0 1-.22.3.59.59 0 0 1-.4.14H9l4.55-11.47h1.89zm-3.53-4.31L14.89 9.5a11.62 11.62 0 0 1-.39-1.24q-.09.37-.19.69l-.19.56-1.58 4.19zm-6.3-1.58a13.43 13.43 0 0 1-2.91-1.41 11.46 11.46 0 0 0 2.81-5.37H12V4H7.31a4 4 0 0 0-.2-.56C6.87 2.79 6.6 2 6.6 2l-1.47.5s.4.89.6 1.5H0v1.33h2.15A11.23 11.23 0 0 0 5 10.7a17.19 17.19 0 0 1-5 2.1q.56.82.87 1.38a23.28 23.28 0 0 0 5.22-2.51 15.64 15.64 0 0 0 3.56 1.77zM3.63 5.33h4.91a8.11 8.11 0 0 1-2.45 4.45 9.11 9.11 0 0 1-2.46-4.45z'/%3E%3C/svg%3E", colour);

const caret = (colour: string) => painted("%3Csvg width='14' height='14' viewBox='-1 -1 14 14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='{ink}' d='M10.085 2.943 6.05 6.803l-3.947-3.86L1.05 3.996l5 5 5-5z'/%3E%3C/svg%3E", colour);

export const editions = [
    { name: 'Afrikaans', url: 'https://af.wikipedia.org/' },
    { name: 'Shqip', url: 'https://sq.wikipedia.org/' },
    { name: 'العربية', url: 'https://ar.wikipedia.org/' },
    { name: 'Asturianu', url: 'https://ast.wikipedia.org/' },
    { name: 'Azərbaycanca', url: 'https://az.wikipedia.org/' },
    { name: 'Български', url: 'https://bg.wikipedia.org/' },
    { name: '閩南語 / Bân-lâm-gú', url: 'https://nan.wikipedia.org/' },
    { name: 'বাংলা', url: 'https://bn.wikipedia.org/' },
    { name: 'Беларуская', url: 'https://be.wikipedia.org/' },
    { name: 'Català', url: 'https://ca.wikipedia.org/' },
    { name: 'Čeština', url: 'https://cs.wikipedia.org/' },
    { name: 'Cymraeg', url: 'https://cy.wikipedia.org/' },
    { name: 'Dansk', url: 'https://da.wikipedia.org/' },
    { name: 'Deutsch', url: 'https://de.wikipedia.org/' },
    { name: 'Eesti', url: 'https://et.wikipedia.org/' },
    { name: 'Ελληνικά', url: 'https://el.wikipedia.org/' },
    { name: 'English', url: 'https://en.wikipedia.org/' },
    { name: 'Español', url: 'https://es.wikipedia.org/' },
    { name: 'Esperanto', url: 'https://eo.wikipedia.org/' },
    { name: 'Euskara', url: 'https://eu.wikipedia.org/' },
    { name: 'فارسی', url: 'https://fa.wikipedia.org/' },
    { name: 'Français', url: 'https://fr.wikipedia.org/' },
    { name: 'Galego', url: 'https://gl.wikipedia.org/' },
    { name: '한국어', url: 'https://ko.wikipedia.org/' },
    { name: 'Hausa', url: 'https://ha.wikipedia.org/' },
    { name: 'Հայերեն', url: 'https://hy.wikipedia.org/' },
    { name: 'हिन्दी', url: 'https://hi.wikipedia.org/' },
    { name: 'Hrvatski', url: 'https://hr.wikipedia.org/' },
    { name: 'Bahasa Indonesia', url: 'https://id.wikipedia.org/' },
    { name: 'Italiano', url: 'https://it.wikipedia.org/' },
    { name: 'עברית', url: 'https://he.wikipedia.org/' },
    { name: 'ქართული', url: 'https://ka.wikipedia.org/' },
    { name: 'Ladin', url: 'https://lld.wikipedia.org/' },
    { name: 'Latina', url: 'https://la.wikipedia.org/' },
    { name: 'Latviešu', url: 'https://lv.wikipedia.org/' },
    { name: 'Lietuvių', url: 'https://lt.wikipedia.org/' },
    { name: 'Magyar', url: 'https://hu.wikipedia.org/' },
    { name: 'Македонски', url: 'https://mk.wikipedia.org/' },
    { name: 'Malagasy', url: 'https://mg.wikipedia.org/' },
    { name: 'मराठी', url: 'https://mr.wikipedia.org/' },
    { name: 'مصرى', url: 'https://arz.wikipedia.org/' },
    { name: 'Bahasa Melayu', url: 'https://ms.wikipedia.org/' },
    { name: 'Bahaso Minangkabau', url: 'https://min.wikipedia.org/' },
    { name: 'မြန်မာဘာသာ', url: 'https://my.wikipedia.org/' },
    { name: 'Nederlands', url: 'https://nl.wikipedia.org/' },
    { name: '日本語', url: 'https://ja.wikipedia.org/' },
    { name: 'Norsk (bokmål)', url: 'https://no.wikipedia.org/' },
    { name: 'Norsk (nynorsk)', url: 'https://nn.wikipedia.org/' },
    { name: 'Нохчийн', url: 'https://ce.wikipedia.org/' },
    { name: 'Oʻzbekcha / Ўзбекча', url: 'https://uz.wikipedia.org/' },
    { name: 'Polski', url: 'https://pl.wikipedia.org/' },
    { name: 'Português', url: 'https://pt.wikipedia.org/' },
    { name: 'Қазақша / Qazaqşa / قازاقشا', url: 'https://kk.wikipedia.org/' },
    { name: 'Română', url: 'https://ro.wikipedia.org/' },
    { name: 'Simple English', url: 'https://simple.wikipedia.org/' },
    { name: 'Sinugboanong Binisaya', url: 'https://ceb.wikipedia.org/' },
    { name: 'Slovenčina', url: 'https://sk.wikipedia.org/' },
    { name: 'Slovenščina', url: 'https://sl.wikipedia.org/' },
    { name: 'Српски / Srpski', url: 'https://sr.wikipedia.org/' },
    { name: 'Srpskohrvatski / Српскохрватски', url: 'https://sh.wikipedia.org/' },
    { name: 'Suomi', url: 'https://fi.wikipedia.org/' },
    { name: 'Svenska', url: 'https://sv.wikipedia.org/' },
    { name: 'Kiswahili', url: 'https://sw.wikipedia.org/' },
    { name: 'தமிழ்', url: 'https://ta.wikipedia.org/' },
    { name: 'Татарча / Tatarça', url: 'https://tt.wikipedia.org/' },
    { name: 'తెలుగు', url: 'https://te.wikipedia.org/' },
    { name: 'ภาษาไทย', url: 'https://th.wikipedia.org/' },
    { name: 'Тоҷикӣ', url: 'https://tg.wikipedia.org/' },
    { name: 'تۆرکجه', url: 'https://azb.wikipedia.org/' },
    { name: 'Türkçe', url: 'https://tr.wikipedia.org/' },
    { name: 'Українська', url: 'https://uk.wikipedia.org/' },
    { name: 'اردو', url: 'https://ur.wikipedia.org/' },
    { name: 'Tiếng Việt', url: 'https://vi.wikipedia.org/' },
    { name: 'Winaray', url: 'https://war.wikipedia.org/' },
    { name: '中文', url: 'https://zh.wikipedia.org/' },
    { name: 'Русский', url: 'https://ru.wikipedia.org/' },
    { name: '粵語', url: 'https://yue.wikipedia.org/' },
];

export const globe = 'https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg';

export class $WikipediaDocument extends $Document { }

export class $Editions extends $WikipediaDocument {
    $Editions(block: $Block) {
        super.$Document($check(block, $Block, '!').concat($check(editionsFormatLook, '!')));
    }
}

export class $EditionList extends $Section {
    $EditionList(block: $Block) {
        super.$Section($check(block, $Block, '!').concat($check(editionListFormatLook, '!')));
    }
}

// The editions stand in the page for the picker to read, and the reader meets
// them through the picker rather than as a list.
export class $EditionListFormat extends $Format {
    selector = styled.div;
    display = 'none';
}

export class $Foundation extends $WikipediaDocument {
    $Foundation(block: $Block) {
        super.$Document($check(block, $Block, '!').concat($check(foundationFormatLook, '!')));
    }
}

export class $Projects extends $WikipediaDocument {
    $Projects(block: $Block) {
        super.$Document($check(block, $Block, '!').concat($check(projectsFormatLook, '!')));
    }
}

export class $Licence extends $WikipediaDocument {
    $Licence(block: $Block) {
        super.$Document($check(block, $Block, '!').concat($check(licenceFormatLook, '!')));
    }
}

export class $Logo extends $Paragraph {
    $src = '';
    $width = '';

    override print(): ReactNode {
        return <img src={this.$src} width={this.$width} alt={html.text(this._block)} />;
    }
}

export class $Languages extends $Section {
    $globe = '';

    $Languages(block: $Block) {
        super.$Section($check(block, $Block, '!').concat($check(ringFormatLook, '!')));
    }
}

export class $Language extends $Paragraph {
    $at = 1;

    $Language(block: $Block) {
        super.$Paragraph($check(block, $Block, '!').concat($check(languageFormatLook, '!')));
    }
}

export class $Project extends $IndexCard {
    override view(): ReactNode {
        const Card = $(CardFormat);
        const Block = $(this._block);
        return <Card><Block /></Card>;
    }
}

export class $PortalDocumentFormat extends $Format {
    selector = styled.div;
    width = '100%';
}

export class $BackMatterFormat extends $PortalDocumentFormat {
    fontSize = '0.93em';
    lineHeight = '1.5';
    paddingTop = '3.2em';
    get borderTop() { return `1px solid ${this.theme.shade}`; }
}

export class $EditionsFormat extends $PortalDocumentFormat {
    gridColumn = '1 / -1';
    textAlign = 'center';
    backgroundRepeat = 'no-repeat';
    backgroundSize = 'min(88%, 32.86em) 1px';
    backgroundPosition = 'center 1.43em';
    @select('h2.pd-heading') pill_fontSize = '1em';
    pill_fontWeight = '700';
    pill_lineHeight = '1.57';
    pill_boxSizing = 'border-box';
    pill_width = '21.43em';
    pill_margin = '0 auto';
    pill_padding = '0.43em 2.86em';
    pill_borderRadius = '0.14em';
    get pill_backgroundImage() { return `${translation(this.theme.link)}, ${caret(this.theme.link)}`; }
    pill_backgroundRepeat = 'no-repeat, no-repeat';
    pill_backgroundSize = '1.57em 1.57em, 1em 1em';
    pill_backgroundPosition = '0.86em center, calc(100% - 0.86em) center';
    @select('p') prose_display = 'none';
    get backgroundImage() { return `linear-gradient(${this.theme.rule}, ${this.theme.rule})`; }
    get pill_color() { return this.theme.link; }
    get pill_backgroundColor() { return this.theme.quiet; }
    get pill_border() { return `1px solid ${this.theme.rule}`; }
    get pill_fontFamily() { return this.theme.body; }
}

export class $FoundationFormat extends $BackMatterFormat {
    @select('.pd-document') document_display = 'block';
    document_maxWidth = '26.9em';
    document_margin = '0 auto';
    @select('.pd-section') section_display = 'block';
    section_position = 'relative';
    section_padding = '0 1.54em 0 4.6em';
    section_marginBottom = '2.46em';
    @select('p:has(img)') icon_position = 'absolute';
    icon_left = '0.62em';
    icon_top = '0';
    @select('h2.pd-heading') hosted_fontSize = '1em';
    hosted_fontWeight = '400';
    hosted_borderBottom = 'none';
    hosted_margin = '0';
    @select('p') text_margin = '0';
    @select('.pd-ref') links_margin = '0 0.8em 0 0';
    get hosted_color() { return this.theme.pale; }
    get text_color() { return this.theme.pale; }
    get hosted_fontFamily() { return this.theme.body; }
}

export class $ProjectsFormat extends $BackMatterFormat {
    textAlign = 'left';
    @select('.pd-document') projects_display = 'grid';
    projects_gridTemplateColumns = 'repeat(auto-fit, minmax(max(30%, 10em), 1fr))';
    @select('.pd-document > .pd-section:not(.pd-index-card)') intro_display = 'none';
}

export class $LicenceFormat extends $BackMatterFormat {
    gridColumn = '1 / -1';
    textAlign = 'center';
    paddingTop = '1em';
    @select('h2.pd-heading') licence_display = 'inline';
    licence_fontSize = '1em';
    licence_fontWeight = '400';
    licence_border = 'none';
    licence_margin = '0';
    @select('p') line_display = 'inline';
    line_margin = '0';
    @select('.pd-ref') link_margin = '0 0 0 0.8em';
    @select('.pd-ref::before') bullet_content = "'•'";
    bullet_marginRight = '0.8em';
    get licence_color() { return this.theme.pale; }
    get licence_fontFamily() { return this.theme.body; }
}

export class $RingFormat extends $Format {
    $globe = '';
    selector = styled.div;
    position = 'relative';
    height = '23.21em';
    width = '100%';
    maxWidth = '39em';
    margin = '1.21em auto 0';
    backgroundRepeat = 'no-repeat';
    backgroundPosition = 'center 4.36em';
    backgroundSize = '14.29em';
    @select('> .pd-section') section_display = 'contents';
    @select('@media (max-width: 480px)') narrow_order = '1';
    narrow_height = 'auto';
    narrow_display = 'grid';
    narrow_gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
    narrow_gap = '1.14em 0';
    narrow_paddingTop = '0';
    narrow_backgroundImage = 'none';
    get backgroundImage() { return `url(${this.$globe})`; }

    protected override handed(): Record<string, unknown> {
        return { globe: (this.parent as $Languages | undefined)?.$globe ?? '' };
    }
}

export class $LanguageFormat extends $Format {
    $at = 1;
    selector = styled.div;
    position = 'absolute';
    width = '11.14em';
    textAlign = 'center';
    @select('a') link_display = 'block';
    link_fontSize = '1.23em';
    link_fontWeight = '700';
    link_lineHeight = '1.5';
    link_textDecoration = 'none';
    @select('p') line_margin = '0';
    line_fontSize = '0.93em';
    get line_color() { return this.theme.pale; }
    @select('@media (max-width: 480px)') narrow_position = 'static';
    narrow_width = 'auto';
    narrow_padding = '0 1.14em';
    narrow_lineHeight = '1.4';
    get top() { return `${Math.floor((this.$at - 1) / 2) * 20}%`; }
    get left() { return `${(this.$at % 2 === 1 ? [4.43, 0.57, -0.21, 0.57, 4.43] : [23.43, 27.29, 28.07, 27.29, 23.43])[Math.floor((this.$at - 1) / 2)]}em`; }
    get link_color() { return this.theme.link; }

    protected override handed(): Record<string, unknown> {
        return { at: (this.parent as $Language | undefined)?.$at ?? 1 };
    }
}

export class $CardFormat extends $Format {
    selector = styled.div;
    position = 'relative';
    alignSelf = 'start';
    display = 'grid';
    justifyContent = 'start';
    gridTemplateColumns = 'auto max-content';
    gridTemplateRows = '1fr auto auto 1fr';
    gap = '0 0.23em';
    padding = '1em';
    minHeight = '4.9em';
    lineHeight = '1.5';
    @select('p') line_margin = '0';
    @select('p:first-child') logoLine_gridRow = '1 / -1';
    @select('.pd-title') nameLine_gridRow = '2';
    @select('p:last-child') lastLine_gridRow = '3';
    get lastLine_color() { return this.theme.pale; }
    @select('img') logo_display = 'block';
    logo_width = '50px';
    logo_height = '47px';
    logo_objectFit = 'contain';
    @select('.pd-reference') meaning_display = 'none';
    @select('.pd-title a') link_textDecoration = 'none';
    @select('.pd-title > a::after') reach_content = "''";
    reach_position = 'absolute';
    reach_inset = '0';
    @select('h2.pd-heading') name_fontSize = '1.075em';
    name_fontWeight = '400';
    name_lineHeight = '1.5';
    name_border = 'none';
    name_margin = '0';
    name_padding = '0';
    @select('&:hover h2.pd-heading') hover_textDecoration = 'underline';
    get name_fontFamily() { return this.theme.body; }
    get name_color() { return this.theme.link; }
}

export class $Search extends $Section {
    $language = 'en';

    override view(): ReactNode {
        const Form = $(SearchFormat);

        return (
            <Form action="//www.wikipedia.org/search-redirect.php">
                <input type="hidden" name="family" value="wikipedia" />
                <div>
                    <input name="search" type="search" size={20} dir="auto" autoComplete="off" aria-label={html.text(this._block)} autoFocus />
                    <span>{this.$language.toUpperCase()}</span>
                    <select name="language" value={this.$language} onChange={event => this.$language = event.target.value}>
                        {editions.map(edition => {
                            const code = edition.url.split('/')[2].split('.')[0];

                            return <option key={code} value={code} lang={code}>{edition.name}</option>;
                        })}
                    </select>
                </div>
                <button type="submit">Search</button>
                <input type="hidden" name="go" value="Go" />
            </Form>
        );
    }
}

export class $SearchFormat extends $Format {
    selector = styled.form;
    $action: string | undefined = undefined;
    display = 'flex';
    justifyContent = 'center';
    width = '100%';
    maxWidth = '38.57em';
    padding = '0.43em 0 0.86em';
    margin = '0 auto';
    @select('div') field_position = 'relative';
    field_flex = '0 1 28.14em';
    field_minWidth = '0';
    @select('input[name=search]') input_boxSizing = 'border-box';
    input_width = '100%';
    input_height = '2.75em';
    input_fontSize = '1.143em';
    input_padding = '0.5em 4em 0.5em 0.75em';
    input_borderRight = 'none';
    input_borderRadius = '0.125em 0 0 0.125em';
    input_appearance = 'none';
    input_outline = 'none';
    @select('span') code_position = 'absolute';
    code_top = '0';
    code_right = '0';
    code_height = '100%';
    code_display = 'flex';
    code_alignItems = 'center';
    code_padding = '0 2.36em 0 0.71em';
    code_fontSize = '1em';
    code_pointerEvents = 'none';
    code_backgroundRepeat = 'no-repeat';
    code_backgroundSize = '0.857em 0.571em';
    code_backgroundPosition = 'right 0.86em center';
    @select('select') picker_position = 'absolute';
    picker_top = '0';
    picker_right = '0';
    picker_width = '4.57em';
    picker_height = '100%';
    picker_margin = '0';
    picker_padding = '0';
    picker_border = 'none';
    picker_opacity = '0';
    picker_appearance = 'none';
    picker_cursor = 'pointer';
    picker_outline = 'none';
    @select('button') button_width = '3.5em';
    button_padding = '0';
    button_borderRadius = '0 0.125em 0.125em 0';
    button_cursor = 'pointer';
    button_fontSize = '1.143em';
    button_color = 'transparent';
    button_backgroundRepeat = 'no-repeat';
    button_backgroundSize = '1.375em 1.375em';
    button_backgroundPosition = 'center';
    get input_border() { return `1px solid ${edge(this.theme)}`; }
    @select('input[name=search]:focus') get focus_borderColor() { return this.theme.link; }
    get focus_boxShadow() { return `inset 0 0 0 1px ${this.theme.link}`; }
    get input_fontFamily() { return this.theme.body; }
    get input_lineHeight() { return this.theme.leading; }
    get input_background() { return this.theme.paper; }
    get input_color() { return this.theme.ink; }
    get code_fontFamily() { return this.theme.body; }
    get code_color() { return this.theme.ink; }
    get code_backgroundImage() { return chevron(this.theme.pale); }
    get button_backgroundColor() { return this.theme.link; }
    get button_border() { return `1px solid ${edge(this.theme)}`; }
    get button_backgroundImage() { return magnifier(this.theme.paper); }
}

export const Document = $($WikipediaDocument);
export const Editions = $($Editions);
export const EditionList = $($EditionList);
export const EditionListFormat = $($EditionListFormat);
export const Foundation = $($Foundation);
export const Projects = $($Projects);
export const Licence = $($Licence);
export const Logo = $($Logo);
export const Languages = $($Languages);
export const Language = $($Language);
export const Project = $($Project);
export const PortalDocumentFormat = $($PortalDocumentFormat);
export const BackMatterFormat = $($BackMatterFormat);
export const EditionsFormat = $($EditionsFormat);
export const FoundationFormat = $($FoundationFormat);
export const ProjectsFormat = $($ProjectsFormat);
export const LicenceFormat = $($LicenceFormat);
export const RingFormat = $($RingFormat);
export const LanguageFormat = $($LanguageFormat);
export const CardFormat = $($CardFormat);
export const Search = $($Search);
export const SearchFormat = $($SearchFormat);
const editionsFormatLook = EditionsFormat;
const editionListFormatLook = EditionListFormat;
const foundationFormatLook = FoundationFormat;
const projectsFormatLook = ProjectsFormat;
const licenceFormatLook = LicenceFormat;
const ringFormatLook = RingFormat;
const languageFormatLook = LanguageFormat;

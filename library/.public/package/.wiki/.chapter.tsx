import { ReactNode } from 'react';
import { $, select, styled } from '@dna-platform/chemistry';
import { $Format, $Ref, $Section, html } from '@dna-platform/public';

export class $BookLink extends $Ref { }
export class $SubjectLink extends $Ref { }
export class $AuthorLink extends $Ref { }
export class $OutwardLink extends $Ref { }

const languages: [string, string][] = [
    ['af', 'Afrikaans'], ['sq', 'Shqip'], ['ar', 'العربية'], ['ast', 'Asturianu'], ['az', 'Azərbaycanca'],
    ['bg', 'Български'], ['nan', '閩南語 / Bân-lâm-gú'], ['bn', 'বাংলা'], ['be', 'Беларуская'], ['ca', 'Català'],
    ['cs', 'Čeština'], ['cy', 'Cymraeg'], ['da', 'Dansk'], ['de', 'Deutsch'], ['et', 'Eesti'], ['el', 'Ελληνικά'],
    ['en', 'English'], ['es', 'Español'], ['eo', 'Esperanto'], ['eu', 'Euskara'], ['fa', 'فارسی'], ['fr', 'Français'],
    ['gl', 'Galego'], ['ko', '한국어'], ['ha', 'Hausa'], ['hy', 'Հայերեն'], ['hi', 'हिन्दी'], ['hr', 'Hrvatski'],
    ['id', 'Bahasa Indonesia'], ['it', 'Italiano'], ['he', 'עברית'], ['ka', 'ქართული'], ['lld', 'Ladin'],
    ['la', 'Latina'], ['lv', 'Latviešu'], ['lt', 'Lietuvių'], ['hu', 'Magyar'], ['mk', 'Македонски'], ['mg', 'Malagasy'],
    ['mr', 'मराठी'], ['arz', 'مصرى'], ['ms', 'Bahasa Melayu'], ['min', 'Bahaso Minangkabau'], ['my', 'မြန်မာဘာသာ'],
    ['nl', 'Nederlands'], ['ja', '日本語'], ['no', 'Norsk (bokmål)'], ['nn', 'Norsk (nynorsk)'], ['ce', 'Нохчийн'],
    ['uz', 'Oʻzbekcha / Ўзбекча'], ['pl', 'Polski'], ['pt', 'Português'], ['kk', 'Қазақша / Qazaqşa / قازاقشا'],
    ['ro', 'Română'], ['simple', 'Simple English'], ['ceb', 'Sinugboanong Binisaya'], ['sk', 'Slovenčina'],
    ['sl', 'Slovenščina'], ['sr', 'Српски / Srpski'], ['sh', 'Srpskohrvatski / Српскохрватски'], ['fi', 'Suomi'],
    ['sv', 'Svenska'], ['sw', 'Kiswahili'], ['ta', 'தமிழ்'], ['tt', 'Татарча / Tatarça'], ['te', 'తెలుగు'],
    ['th', 'ภาษาไทย'], ['tg', 'Тоҷикӣ'], ['azb', 'تۆرکجه'], ['tr', 'Türkçe'], ['uk', 'Українська'], ['ur', 'اردو'],
    ['vi', 'Tiếng Việt'], ['war', 'Winaray'], ['zh', '中文'], ['ru', 'Русский'], ['yue', '粵語'],
];

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
                        {languages.map(([code, named]) => <option key={code} value={code} lang={code}>{named}</option>)}
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
    width = '100%';
    maxWidth = '38.57em';
    padding = '0.43em 0 0.86em';
    margin = '0 auto';
    @select('div') field_position = 'relative';
    @select('div') field_flex = '1';
    @select('div') field_minWidth = '0';
    @select('input[name=search]') input_boxSizing = 'border-box';
    @select('input[name=search]') input_width = '100%';
    @select('input[name=search]') input_height = '2.75em';
    @select('input[name=search]') input_fontSize = '1.143em';
    @select('input[name=search]') input_padding = '0.5em 4em 0.5em 0.75em';
    @select('input[name=search]') input_border = '1px solid #6485d1';
    @select('input[name=search]') input_borderRight = 'none';
    @select('input[name=search]') input_borderRadius = '0.125em 0 0 0.125em';
    @select('input[name=search]') input_appearance = 'none';
    @select('input[name=search]') input_outline = 'none';
    @select('input[name=search]:focus') focus_borderColor = '#3366cc';
    @select('input[name=search]:focus') focus_boxShadow = 'inset 0 0 0 1px #3366cc';
    @select('input[name=search]::placeholder') placeholder_color = 'transparent';
    @select('span') code_position = 'absolute';
    @select('span') code_top = '0';
    @select('span') code_right = '0';
    @select('span') code_height = '100%';
    @select('span') code_display = 'flex';
    @select('span') code_alignItems = 'center';
    @select('span') code_padding = '0 2.36em 0 0.71em';
    @select('span') code_fontSize = '1em';
    @select('span') code_pointerEvents = 'none';
    @select('span') code_backgroundImage = "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='-1 -1 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='none' stroke='%23505356' stroke-width='1.11' d='M.56.55 5 4.9 9.44.54'/%3E%3C/svg%3E\")";
    @select('span') code_backgroundRepeat = 'no-repeat';
    @select('span') code_backgroundSize = '0.857em 0.571em';
    @select('span') code_backgroundPosition = 'right 0.86em center';
    @select('select') picker_position = 'absolute';
    @select('select') picker_top = '0';
    @select('select') picker_right = '0';
    @select('select') picker_width = '4.57em';
    @select('select') picker_height = '100%';
    @select('select') picker_margin = '0';
    @select('select') picker_padding = '0';
    @select('select') picker_border = 'none';
    @select('select') picker_background = 'transparent';
    @select('select') picker_color = 'transparent';
    @select('select') picker_appearance = 'none';
    @select('select') picker_cursor = 'pointer';
    @select('select') picker_outline = 'none';
    @select('button') button_width = '3.5em';
    @select('button') button_padding = '0';
    @select('button') button_border = '1px solid #6485d1';
    @select('button') button_borderRadius = '0 0.125em 0.125em 0';
    @select('button') button_cursor = 'pointer';
    @select('button') button_fontSize = '1.143em';
    @select('button') button_color = 'transparent';
    @select('button') button_backgroundImage = "url(\"data:image/svg+xml,%3Csvg width='22' height='22' viewBox='-1 -1 22 22' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' d='M7.5 13c3.04 0 5.5-2.46 5.5-5.5S10.54 2 7.5 2 2 4.46 2 7.5 4.46 13 7.5 13zm4.55.46A7.432 7.432 0 0 1 7.5 15C3.36 15 0 11.64 0 7.5S3.36 0 7.5 0C11.64 0 15 3.36 15 7.5c0 1.71-.57 3.29-1.54 4.55l6.49 6.49-1.41 1.41-6.49-6.49z'/%3E%3C/svg%3E\")";
    @select('button') button_backgroundRepeat = 'no-repeat';
    @select('button') button_backgroundSize = '1.375em 1.375em';
    @select('button') button_backgroundPosition = 'center';
    @select('input[name=search]') get input_fontFamily() { return this.theme.body; }
    @select('input[name=search]') get input_lineHeight() { return this.theme.leading; }
    @select('input[name=search]') get input_background() { return this.theme.paper; }
    @select('input[name=search]') get input_color() { return this.theme.ink; }
    @select('span') get code_fontFamily() { return this.theme.body; }
    @select('span') get code_color() { return this.theme.ink; }
    @select('button') get button_backgroundColor() { return this.theme.link; }
}

export const BookLink = $($BookLink);
export const SubjectLink = $($SubjectLink);
export const AuthorLink = $($AuthorLink);
export const OutwardLink = $($OutwardLink);
export const Search = $($Search);
export const SearchFormat = $($SearchFormat);

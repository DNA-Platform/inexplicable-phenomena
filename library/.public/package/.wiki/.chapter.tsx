import { ReactNode } from 'react';
import { $, select, styled } from '@dna-platform/chemistry';
import { $Format, $Ref, $Section, html } from '@dna-platform/public';

export class $BookLink extends $Ref { }
export class $SubjectLink extends $Ref { }
export class $AuthorLink extends $Ref { }
export class $OutwardLink extends $Ref { }

export class $Search extends $Section {
    $language = 'en';

    override view(): ReactNode {
        const Form = $(SearchFormat);

        return (
            <Form action={`https://${this.$language}.wikipedia.org/w/index.php`}>
                <input name="search" placeholder={html.text(this._block)} autoFocus />
                <span>{this.$language.toUpperCase()}</span>
                <button>Search</button>
            </Form>
        );
    }
}

export class $SearchFormat extends $Format {
    selector = styled.form;
    $action: string | undefined = undefined;
    display = 'flex';
    width = '100%';
    maxWidth = '32.14em';
    margin = '0 auto';
    @select('input') input_flex = '1';
    @select('input') input_minWidth = '0';
    @select('input') input_fontSize = '1.143em';
    @select('input') input_padding = '0.5em 0.25em 0.5em 0.75em';
    @select('input') input_border = '1px solid #6485d1';
    @select('input') input_borderRight = 'none';
    @select('input') input_borderRadius = '0.125em 0 0 0.125em';
    @select('input') input_outline = 'none';
    @select('input:focus') focus_borderColor = '#3366cc';
    @select('input:focus') focus_boxShadow = 'inset 0 0 0 1px #3366cc';
    @select('input::placeholder') placeholder_color = 'transparent';
    @select('span') language_display = 'flex';
    @select('span') language_alignItems = 'center';
    @select('span') language_padding = '0 2.64em 0 0.71em';
    @select('span') language_borderTop = '1px solid #6485d1';
    @select('span') language_borderBottom = '1px solid #6485d1';
    @select('span') language_backgroundImage = "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='-1 -1 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='none' stroke='%23505356' stroke-width='1.11' d='M.56.55 5 4.9 9.44.54'/%3E%3C/svg%3E\")";
    @select('span') language_backgroundRepeat = 'no-repeat';
    @select('span') language_backgroundSize = '0.857em 0.571em';
    @select('span') language_backgroundPosition = 'right 1.29em center';
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
    @select('input') get input_fontFamily() { return this.theme.body; }
    @select('input') get input_lineHeight() { return this.theme.leading; }
    @select('input') get input_background() { return this.theme.paper; }
    @select('input') get input_color() { return this.theme.ink; }
    @select('span') get language_color() { return this.theme.ink; }
    @select('button') get button_backgroundColor() { return this.theme.link; }
}

export const BookLink = $($BookLink);
export const SubjectLink = $($SubjectLink);
export const AuthorLink = $($AuthorLink);
export const OutwardLink = $($OutwardLink);
export const Search = $($Search);
export const SearchFormat = $($SearchFormat);

import { ReactNode } from 'react';
import { $, $Block, $check, select, styled } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Paragraph$, $Paragraph, $TypeOfParagraph, ParagraphSpecification } from '@/writing/Paragraph';

export interface $Search$ extends $Paragraph$ { }

// THE FIELD AN ENCYCLOPEDIA IS ENTERED BY, and it is WRITING: what it says is what it offers to
// find — "Search Wikipedia" — so it is a paragraph whose copy stands in the field. That is why it
// can be written into the bar at all; a control that says nothing is not part of a page's text and
// a section drops it. Where it goes is the book's, and the browser submits it.
export class $Search extends $Paragraph implements $Search$ {
    $where = '/';
    $said = 'Search';

    $Search(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfSearch).concat($check(searchStyle, '!')));
    }

    override view(): ReactNode {
        const hint = html.text(this._block);

        return reflection.formatted(this, <form className={this.className} action={this.$where} role="search">
            <input type="search" name="search" placeholder={hint} aria-label={hint} />
            <button type="submit">{this.$said}</button>
        </form>);
    }
}

export class $TypeOfSearch extends $TypeOfParagraph {
    protected override specification: Specification<$Writing> = new SearchSpecification();
}

export class SearchSpecification extends ParagraphSpecification {
}

export class $SearchFormat extends $Format {
    override selector: any = styled.form;
    display = 'flex';
    alignItems = 'stretch';
    boxSizing = 'border-box';

    @select('input') field_flex = '1 1 auto';
    field_minWidth = '0';
    field_boxSizing = 'border-box';
    field_font = 'inherit';
    @select('button') press_flex = '0 0 auto';
    press_boxSizing = 'border-box';
    press_font = 'inherit';
    press_cursor = 'pointer';
}

export const Search = $($Search);
export const TypeOfSearch = $($TypeOfSearch);
export const SearchFormat = $($SearchFormat);
const searchStyle = SearchFormat;

import { ReactNode } from 'react';
import { $, $Block, $check, select, styled } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Format, $TypeOfFormat } from '@/writing/Format';
import { $Control$, $Control, $TypeOfControl, ControlSpecification } from './Control';

export interface $Search$ extends $Control$ { }

// THE FIELD A LIBRARY IS ENTERED BY. Its copy is what it offers to find, which is its description,
// and the field shows it as its own prompt; where it sends the reader is the book's to say, and the
// browser submits it.
export class $Search extends $Control implements $Search$ {
    $where = '/';
    $said = 'Search';

    $Search(block: $Block) {
        super.$Control(this.addType(block, $TypeOfSearch).concat($check(searchStyle, '!')));
    }

    override view(): ReactNode {
        const described = html.text(this._block);

        const Format = $(this.searchForOne<$SearchFormat>($TypeOfFormat)!);

        return (
            <Format className={this.className} action={this.$where} role="search">
                <input className="pd-field" type="search" name="search" placeholder={described} aria-label={described} />
                <button className="pd-button" type="submit">{this.$said}</button>
            </Format>
        );
    }
}

export class $TypeOfSearch extends $TypeOfControl {
    protected override specification: Specification<$Writing> = new SearchSpecification();
}

export class SearchSpecification extends ControlSpecification {
}

export class $SearchFormat extends $Format {
    override selector: any = styled.form;
    $action = '';
    $role = '';
    display = 'flex';
    alignItems = 'stretch';
    boxSizing = 'border-box';

    @select('> .pd-field') field_flex = '1 1 auto';
    field_minWidth = '0';
    field_boxSizing = 'border-box';
    field_font = 'inherit';
    @select('> .pd-button') button_flex = '0 0 auto';
    button_boxSizing = 'border-box';
    button_font = 'inherit';
    button_cursor = 'pointer';
}

export const Search = $($Search);
export const TypeOfSearch = $($TypeOfSearch);
export const SearchFormat = $($SearchFormat);
const searchStyle = SearchFormat;

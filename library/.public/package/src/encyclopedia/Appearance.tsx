import { ReactNode } from 'react';
import { $, $Chemical, select, styled } from '@dna-platform/chemistry';

export class $Appearance extends $Chemical {
    override selector: any = styled.aside;
    $className = 'pd-appearance';
    $text = 'Standard';
    $width = 'Standard';
    $colour = 'Light';

    boxSizing = 'border-box';
    width = '100%';
    padding = '0 0 1rem';
    fontSize = '0.875rem';

    view(): ReactNode {
        return <>
            <h3>Appearance</h3>
            {this.said('Text', this.$text, ['Small', 'Standard', 'Large'], one => { this.$text = one; })}
            {this.said('Width', this.$width, ['Standard', 'Wide'], one => { this.$width = one; })}
            {this.said('Color', this.$colour, ['Automatic', 'Light', 'Dark'], one => { this.$colour = one; })}
        </>;
    }

    protected said(of: string, chosen: string, among: string[], choose: (one: string) => void): ReactNode {
        return <div key={of}>
            <h4>{of}</h4>
            {among.map(one => (
                <label key={one}>
                    <input type="radio" name={of} value={one} checked={one === chosen} onChange={() => choose(one)} />
                    <span>{one}</span>
                </label>
            ))}
        </div>;
    }

    @select('h3') name_margin = '0 0 0.5rem';
    name_fontSize = '1rem';
    name_fontWeight = '700';
    @select('div') group_margin = '0 0 1rem';
    @select('h4') label_margin = '0 0 0.5rem';
    label_paddingBottom = '0.35rem';
    label_fontSize = '0.875rem';
    label_fontWeight = '400';
    @select('label') choice_display = 'flex';
    choice_alignItems = 'center';
    choice_gap = '0.6rem';
    choice_padding = '0.35rem 0';
    choice_cursor = 'pointer';
    @select('input') dot_margin = '0';
    dot_cursor = 'pointer';
    dot_width = '1rem';
    dot_height = '1rem';
}

export const Appearance = $($Appearance);

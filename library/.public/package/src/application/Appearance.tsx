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
    name_fontSize = '0.875rem';
    name_lineHeight = '1.6';
    name_fontWeight = '700';
    @select('div') group_margin = '0 0 1rem';
    @select('h4') label_margin = '6px 0';
    label_padding = '6px 0';
    label_fontSize = '0.875rem';
    label_fontWeight = '400';
    @select('label') choice_display = 'block';
    choice_position = 'relative';
    choice_padding = '0 0 4px 24px';
    choice_cursor = 'pointer';
    @select('input') dot_position = 'absolute';
    dot_left = '0';
    dot_top = '0';
    dot_margin = '1px 0 0';
    dot_cursor = 'pointer';
    dot_width = '18px';
    dot_height = '18px';
    dot_boxSizing = 'border-box';
    dot_appearance = 'none';
    dot_borderRadius = '50%';
    dot_border = '1px solid #72777d';
    dot_background = '#ffffff';
    dot_fontFamily = 'inherit';
    dot_color = 'inherit';
    @select('input:checked') chosen_borderWidth = '6px';
    chosen_borderColor = '#3366cc';
}

export const Appearance = $($Appearance);

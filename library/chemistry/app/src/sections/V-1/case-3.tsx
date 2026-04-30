import React from 'react';
import { $, $Chemical } from '@/index';
import {
    PropertyFrame, PropertyLabel, ToggleButton,
} from './case.styled';

// Single-letter $ prop name — was the sprint-24 fix where $v et al. were
// inert because isSpecial required length > 2.
class $SingleLetterDemo extends $Chemical {
    $v = false;
    toggle() { this.$v = !this.$v; }
    view() {
        return (
            <PropertyFrame>
                <PropertyLabel>$v</PropertyLabel>
                <ToggleButton $on={this.$v} onClick={this.toggle}>
                    {this.$v ? 'true' : 'false'}
                </ToggleButton>
            </PropertyFrame>
        );
    }
}

const SingleLetterDemo = $($SingleLetterDemo);

export default function Case3Demo() {
    return <SingleLetterDemo />;
}

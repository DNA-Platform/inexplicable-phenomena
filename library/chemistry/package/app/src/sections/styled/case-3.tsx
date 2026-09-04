import React from 'react';
import { $, $Chemical, styled } from '@/index';
import { ActionButton } from '../V-1/case.styled';

// The base holds its own width. Live, but nobody outside can reach it.
class $Bar extends $Chemical {
    selector = styled.div;
    margin = '0 0 10px';
    height = '24px';
    borderRadius = '4px';
    background = '#3366cc';
    width = '30%';

    view() {
        return <div />;
    }
}

const Bar = $($Bar);

// The subclass respells the same property with a $. One property, promoted —
// and a promoted property is a prop, so whoever draws it can drive it.
class $Meter extends $Bar {
    $width = '30%';
    override background = '#14866d';
}

const Meter = $($Meter);

class $Panel extends $Chemical {
    at = 30;

    wider() {
        this.at = Math.min(100, this.at + 20);
    }

    narrower() {
        this.at = Math.max(10, this.at - 20);
    }

    view() {
        return (
            <div data-demo="three">
                <Bar />
                <Meter width={`${this.at}%`} />
                <ActionButton onClick={this.narrower}>−</ActionButton>
                <ActionButton onClick={this.wider}>+</ActionButton>
            </div>
        );
    }
}

const Panel = $($Panel);

export default function Case3Demo() {
    return <Panel />;
}

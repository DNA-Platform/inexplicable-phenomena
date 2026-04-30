import React from 'react';
import { $, $Chemical } from '@/index';
import { CrossFrame, ChemicalBox, BoxLabel, ValueDisplay, Arrow } from './case.styled';
import { ActionButton } from '../V-1/case.styled';

class $Inner extends $Chemical {
    $value = 0;
    view() {
        return (
            <ChemicalBox>
                <BoxLabel>$Inner</BoxLabel>
                <ValueDisplay>{this.$value}</ValueDisplay>
            </ChemicalBox>
        );
    }
}

class $Outer extends $Chemical {
    inner = new $Inner();
    increment() { this.inner.$value++; }
    reset() { this.inner.$value = 0; }
    view() {
        const Inner = $(this.inner);
        return (
            <CrossFrame>
                <ChemicalBox>
                    <BoxLabel>$Outer</BoxLabel>
                    <ActionButton onClick={this.increment}>write inner.$value++</ActionButton>
                    <ActionButton onClick={this.reset}>reset to 0</ActionButton>
                </ChemicalBox>
                <Arrow>→</Arrow>
                <Inner />
            </CrossFrame>
        );
    }
}

const Outer = $($Outer);

export default function Case1Demo() {
    return <Outer />;
}

import React from 'react';
import { $, $Chemical } from '@/index';
import { CrossFrame, ChemicalBox, BoxLabel, ValueDisplay, Arrow } from './case.styled';
import { ActionButton } from '../V-1/case.styled';

class $Sibling extends $Chemical {
    $count = 0;
    view() {
        return (
            <ChemicalBox>
                <BoxLabel>sibling</BoxLabel>
                <ValueDisplay>{this.$count}</ValueDisplay>
            </ChemicalBox>
        );
    }
}

class $Parent extends $Chemical {
    left = new $Sibling();
    right = new $Sibling();
    writeLeft() { this.left.$count++; }
    writeRight() { this.right.$count++; }
    view() {
        const Left = $(this.left);
        const Right = $(this.right);
        return (
            <div>
                <CrossFrame>
                    <Left />
                    <Right />
                </CrossFrame>
                <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                    <ActionButton onClick={this.writeLeft}>write left.$count++</ActionButton>
                    <ActionButton onClick={this.writeRight}>write right.$count++</ActionButton>
                </div>
            </div>
        );
    }
}

const Parent = $($Parent);

export default function Case2Demo() {
    return <Parent />;
}

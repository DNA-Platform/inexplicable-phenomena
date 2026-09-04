import { $, styled } from '@dna-platform/chemistry';
import { $Style } from './Style';

export class $Columns extends $Style {
    selector = styled.div;
    columnCount = '3';
    columnGap = '2em';
    get columnRuleColor() { return this.theme.rule; }
}

export const Columns = $($Columns);

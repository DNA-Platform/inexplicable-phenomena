import { $, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $ColumnsFormat extends $Format {
    selector = styled.div;
    columnCount = '3';
    columnGap = '2em';
    get columnRuleColor() { return this.theme.rule; }
}

export const ColumnsFormat = $($ColumnsFormat);

import { $, select, styled } from '@dna-platform/chemistry';
import { $Style } from './Style';

export class $Anchor extends $Style {
    selector = styled.a;
    textDecoration = 'none';
    $href: string | undefined = undefined;
    $onClick: (() => void) | undefined = undefined;
    @select('&:hover') hover_textDecoration = 'underline';
    get color() { return this.theme.link; }
}

export const Anchor = $($Anchor);

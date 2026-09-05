import { $, select, styled } from '@dna-platform/chemistry';
import { $Format$, $Format } from '../writing/Format';

export interface $AnchorFormat$ extends $Format$ { }

export class $AnchorFormat extends $Format implements $AnchorFormat$ {
    selector = styled.a;
    textDecoration = 'none';
    $href: string | undefined = undefined;
    $onClick: (() => void) | undefined = undefined;
    @select('&:hover') hover_textDecoration = 'underline';
    get color() { return this.theme.link; }
}

export const AnchorFormat = $($AnchorFormat);

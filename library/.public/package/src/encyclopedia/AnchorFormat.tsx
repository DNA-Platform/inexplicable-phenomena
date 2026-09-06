import { $, select, styled } from '@dna-platform/chemistry';
import { $Format$, $Format } from '../writing/Format';

export interface $AnchorFormat$ extends $Format$ {
    showMeaning: boolean;
    clickableMeaning: boolean;
}

export class $AnchorFormat extends $Format implements $AnchorFormat$ {
    selector = styled.a;
    $href: string | undefined = undefined;
    $onClick: (() => void) | undefined = undefined;
    showMeaning = true;
    clickableMeaning = true;
    textDecoration = 'none';
    get color() { return this.showMeaning ? this.theme.link : 'inherit'; }
    get cursor() { return this.clickableMeaning ? 'pointer' : 'text'; }
    @select('&:hover') get hover_color() { return this.showMeaning ? '#3056a9' : 'inherit'; }
    @select('&:hover') get hover_textDecoration() { return this.showMeaning ? 'underline' : 'none'; }
}

export const AnchorFormat = $($AnchorFormat);

// CREATED 2026-09-09 · rating 2 · sketch. THE STRIP ABOVE THE DOCUMENT — what a reader's controls
// stand in, and what a PDF sits under when Chrome opens one.
//
// THIS REVERSES A DECISION RECORDED IN src/article.ts — "Margin was here and is deleted: it held
// header, sidebar and footer, and all three are the app's." Doug, 2026-09-09: *"I want a dark strip
// where the header is. You can add a header and the toggle can go in there. The header can be a
// component from the framework in the article abstraction."* Every paper wants it and no paper
// wants to write it. `$Header` is Doug's word; note $Cover already prints a <header> element, so
// two things here are called header and only one of them is writing.
//
// IT IS CHROME, NOT WRITING. A $Chemical rather than a $Writing, deliberately: it must not be
// parsed, must not be listed in a table of contents, and must not be stripped as an annotation. A
// styled chemical with no view holds what it is given, so the strip adds no element the page did
// not ask for.
//
// AND IT CARRIES NO COLOUR. Doug, the same day: *"developing a theme means all components ideally
// SHOULD look good in the style."* So this declares STRUCTURE — where the strip stands and how it
// arranges what it holds — and every theme dresses `.pd-header` in its own way. The class is a
// plain DOM prop handed in with a $, which is chemistry's blend, exactly as $Choice takes $onClick.
import { $, $Chemical, styled } from '@dna-platform/chemistry';

export class $Header extends $Chemical {
    override selector: any = styled.header;
    $className = 'pd-header';
    position = 'fixed';
    top = '0';
    left = '0';
    right = '0';
    zIndex = '10';
    boxSizing = 'border-box';
    display = 'flex';
    alignItems = 'center';
    justifyContent = 'space-between';
    gap = '1rem';
}

export const Header = $($Header);

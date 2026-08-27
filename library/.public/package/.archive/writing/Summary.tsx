import { $ } from '@dna-platform/chemistry';
import { $Section } from './Section';

// A SUMMARY IS A SECTION THAT ACCOUNTS FOR WHAT HOLDS IT, and being parenthetical
// is what it IS rather than something an author flags on it. This is the class
// that replaced `<Section parenthetical>`: parenthetical stopped being a prop
// because it is set as part of the component, not the view.
//
// NAME IS A PROXY, and it is the framework's own incumbent rather than a coinage
// — $Document.summary, $Cover.summary and the chapter's own bond all say it.
export class $Summary extends $Section {
    parenthetical = true;
}

export const Summary = $($Summary);

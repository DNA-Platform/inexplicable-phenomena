import { ReactNode } from 'react';
import { $, $Block, $check, select, styled } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Heading$, $Heading, $TypeOfHeading, HeadingSpecification } from '@/writing/Heading';
import { $Section$, $Section, $TypeOfSection, SectionSpecification } from '@/writing/Section';

export interface $Menu$ extends $Section$ { }

// A MENU IS A SECTION THAT OPENS. Its heading names it and the rest of it is what opening shows —
// which is <details> and <summary> exactly, so the open state belongs to the element and nothing
// here keeps it, nothing re-renders to show it, and it works before any script does. The main
// menu, the languages and a page's tools are one kind because they are one shape: a name, and what
// is under it. NOTHING IS OVERRIDDEN TO DRAW IT: a kind names its own tag and the base writes it.
export class $Menu extends $Section {
    override definition = 'details';

    $Menu(block: $Block) {
        super.$Section(this.addType(block, $TypeOfMenu).concat($check(menuStyle, '!')));
    }

    // WHAT OPENS IS ONE BOX. Drawn flat, every part a menu holds was taken out of the flow at the
    // same place and they stood on top of one another — three groups of tools in one stack. So the
    // name is drawn, and everything else is gathered into the panel that opens. The gathering is
    // held against the parts it was made from, which is what reflection.wrapped does for a section.
    override view(): ReactNode {
        const parts = this.parts();
        const named = parts.find(part => reflection.is(part, $TypeOfHeading));
        const Said = $(gathered(this, 'said', named === undefined ? [] : [named]));
        const Held = $(gathered(this, 'held', parts.filter(part => part !== named)));

        return reflection.formatted(this, <details className={this.className}>
            <Said />
            <div className="pd-panel"><Held /></div>
        </details>);
    }
}

const gatherings = new WeakMap<$Menu, Record<string, { parts: $Writing[], block: $Block }>>();
const gathered = (menu: $Menu, which: string, parts: $Writing[]): $Block => {
    const held = gatherings.get(menu) ?? {};
    const kept = held[which];
    if (kept !== undefined && kept.parts.length === parts.length && kept.parts.every((one, at) => one === parts[at])) return kept.block;
    const block = new $Block().concat(...parts);
    gatherings.set(menu, { ...held, [which]: { parts, block } });

    return block;
};

export class $TypeOfMenu extends $TypeOfSection {
    protected override specification: Specification<$Writing> = new MenuSpecification();
}

export class MenuSpecification extends SectionSpecification {
}

export interface $Summary$ extends $Heading$ { }

// THE HEADING OF A MENU, which is the word you press. It is a heading — a section opens with one,
// and this is that one — and the only thing it says differently is its tag, because <summary> is
// what makes the section above it open.
export class $Summary extends $Heading {
    $Summary(block: $Block) {
        super.$Heading(this.addType(block, $TypeOfSummary));
    }

    override view(): ReactNode {
        return reflection.formatted(this, <summary className={this.className}>{this.print()}</summary>);
    }
}

export class $TypeOfSummary extends $TypeOfHeading {
    protected override specification: Specification<$Writing> = new SummarySpecification();
}

export class SummarySpecification extends HeadingSpecification {
}

// ONLY THE STRUCTURE IS HERE: what opening shows is taken out of the flow, and the marker a
// browser draws beside a summary is taken off. Where a panel opens and what paints it are a
// theme's to say.
export class $MenuFormat extends $Format {
    override selector: any = styled.details;
    position = 'relative';

    @select('> .pd-summary') said_display = 'inline-flex';
    said_alignItems = 'center';
    said_gap = '0.35em';
    said_whiteSpace = 'nowrap';
    said_cursor = 'pointer';
    said_listStyle = 'none';
    said_userSelect = 'none';
    said_margin = '0';
    said_padding = '0';
    said_border = 'none';
    said_fontSize = 'inherit';
    said_fontWeight = 'inherit';
    said_fontFamily = 'inherit';
    @select('> .pd-summary::-webkit-details-marker') marker_display = 'none';
    @select('> .pd-panel') panel_position = 'absolute';
    panel_top = 'calc(100% + 0.4em)';
    panel_left = '0';
    panel_zIndex = '30';
    panel_boxSizing = 'border-box';
    panel_minWidth = '15em';
    panel_maxWidth = 'calc(100vw - 2em)';
    panel_maxHeight = '75vh';
    panel_overflowY = 'auto';
    @select('> .pd-panel > *') held_width = '100%';
    held_maxWidth = '100%';
    held_minWidth = '0';
    held_boxSizing = 'border-box';
    held_overflowWrap = 'anywhere';
}

export const Menu = $($Menu);
export const TypeOfMenu = $($TypeOfMenu);
export const Summary = $($Summary);
export const TypeOfSummary = $($TypeOfSummary);
export const MenuFormat = $($MenuFormat);
const menuStyle = MenuFormat;

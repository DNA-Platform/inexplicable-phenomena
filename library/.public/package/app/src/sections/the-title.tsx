import React, { type ReactNode } from 'react';
import styled from 'styled-components';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Section, Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { $Title, Title } from '@/writing/Title';
import { $Theme } from '@/writing/Theme';

// ONE TITLE, DRAWN FOUR WAYS, AND THE FOURTH IS THE POINT.
//
// A class holds its look as a component, and a component is injectable three
// ways — by prop at the call site, by subclass, and by registration in a scope.
// All three are mechanisms the framework already had; what changed is that the
// look is a HELD PROPERTY rather than a style object frozen at render.
//
// The fourth title is untouched and still the default. Without it the other
// three prove nothing: a page where everything is overridden cannot tell you
// whether the default survived being made reachable.
//
// A HAND-AUTHORED PAGE CANNOT FAKE THIS. The same class answers differently for
// three different reasons, and the reasons are visible in the source beside it.
//
// The look varied is $heading, because that is the one a title standing on its
// own reaches for. $Title keeps three — $opening, $heading, $rest — and picks
// $opening only when the chapter it stands in is its book's cover. The first
// draft of this page varied $opening and drew four identical headings, which is
// exactly what a demonstration is for.

// ─── one · BY PROP ──────────────────────────────────────────────────────────
// The property is named $heading on the class and handed in as `heading` here.
// The $ marks context the instance holds; it is never spelled at the call site,
// and `$heading={...}` silently does nothing at all.
const Stamped = styled.h2<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(1)};
    font-family: ${p => p.$theme.mono};
    color: ${p => p.$theme.accent};
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0;
`;

// ─── two · BY SUBCLASS ──────────────────────────────────────────────────────
// The property is reassigned on a subclass. This is polymorphism, and it is the
// shape Doug named: a property with a styled component can be overridden.
const Engraved = styled.h2<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(2)};
    color: ${p => p.$theme.ink};
    font-weight: ${p => p.$theme.weight(3)};
    letter-spacing: ${p => p.$theme.tracking(3)};
    line-height: ${p => p.$theme.leading(3)};
    margin: 0;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6), 0 2px 3px rgba(0, 0, 0, 0.18);
`;

class $Engraved extends $Title {
    override $heading = Engraved;
}
const EngravedTitle = $($Engraved);

// ─── three · BY SCOPE ───────────────────────────────────────────────────────
// A subclass registered against a scope. The parse builds a $Title and the
// scope substitutes this one — nothing at the call site says so.
const Ruled = styled.h2<{ $theme: $Theme }>`
    font-size: ${p => p.$theme.step(1)};
    color: ${p => p.$theme.faint};
    font-weight: 400;
    font-style: italic;
    letter-spacing: 0;
    margin: 0;
    padding-bottom: 0.2em;
    border-bottom: 2px solid ${p => p.$theme.accent};
`;

class $Ruled extends $Title {
    override $heading = Ruled;
}
const RuledTitle = $($Ruled);

// A SCOPE OF ITS OWN, and the demonstration turns on that. The first attempt
// registered against Section — the framework's own base — and the registration
// reached the whole page, including the fourth title. A registration that
// swallows the default proves nothing, because there is no default left to
// compare against. So the scope is a section of this page and no other.
class $Ruledom extends $Section {
}
const Ruledom = $($Ruledom);

// CONFIGURATION BELONGS BEFORE ANYTHING RENDERS. The first attempt registered
// inside view(), and the framework refused BY NAME — a drawing does not get to
// change the rules it is being drawn under.
$(Ruledom, Title)(RuledTitle);

const Field = styled.div`
    width: min(980px, 100%);
    padding: 32px 0;
`;

const Head = styled.div`
    font-size: 10.5px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #7a86b8;
    margin-bottom: 26px;
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: 8.5rem minmax(0, 1fr);
    gap: 20px;
    align-items: baseline;
    padding: 20px 0;
    border-top: 1px solid rgba(120, 130, 180, 0.28);
`;

const How = styled.div`
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #7a86b8;
    line-height: 1.6;
`;

const Note = styled.p`
    margin-top: 26px;
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 11.5px;
    line-height: 1.8;
    color: #9fd0ff;
`;

// The same words every time, so nothing but the drawing differs.
const words = 'The Change That Changes Nothing';

// THE SPECIMENS ARE BUILT ONCE, BEFORE ANYTHING RENDERS — and that is not a
// preference. A view() that CONSTRUCTS a chemical re-renders forever: each pass
// builds new chemicals, each new chemical is state the drawing depends on, and
// the drawing asks to be drawn again. The framework refuses configuration
// during a render by name, and refuses an invalid bond constructor by name, but
// this one it does not refuse at all — it simply never comes back.

// ONE · by prop. A $Title is handed the component it draws with.
const byProp = $(<Title heading={Stamped as never}>{words}</Title>) as $Title;

// TWO · by subclass. A $Title subclass reassigns the property.
const bySubclass = $(<EngravedTitle>{words}</EngravedTitle>) as $Title;

// THREE · by scope. A plain $Title, drawn by the registered subclass. Nothing
// at the call site says so, which is the whole of the difference from TWO.
const inScope = $(
    <Ruledom>
        {'# ' + words}
        <Paragraph>{'found by the parse, drawn by the scope'}</Paragraph>
    </Ruledom>
) as $Section;

// FOUR · untouched. The default, so the other three mean something.
const untouched = $(<Title>{words}</Title>) as $Title;

const ByProp = $(byProp) as never as React.ComponentType;
const BySubclass = $(bySubclass) as never as React.ComponentType;
const InScope = $(inScope) as never as React.ComponentType;
const Untouched = $(untouched) as never as React.ComponentType;

// A DEMONSTRATION PAGE IS NOT A PIECE OF WRITING. This began as a $Section and
// the framework said "$TheTitle is not valid after its bond constructor" — a
// section is writing and writing has copy, and a page of specimens has none.
class $TheTitle extends $Chemical {
    view(): ReactNode {
        return (
            <Field>
                <Head>One class · four drawings · three reasons</Head>
                <Row><How>one<br />by prop</How><div><ByProp /></div></Row>
                <Row><How>two<br />by subclass</How><div><BySubclass /></div></Row>
                <Row><How>three<br />by scope</How><div><InScope /></div></Row>
                <Row><How>four<br />untouched</How><div><Untouched /></div></Row>
                <Note>
                    {'Every one of these is a $Title. Nothing here reimplements set(), and no '}
                    {'inline style object exists anywhere in the framework — the look is a held '}
                    {'component, and a held component can be handed in, reassigned, or registered. '}
                    {'The fourth is the default and is what makes the other three legible.'}
                </Note>
            </Field>
        );
    }
}

const TheTitle = $($TheTitle);

export function TheTitleDemo(): React.ReactElement {
    return <TheTitle />;
}


import React from 'react';
import { $, $Chemical, children, styled } from '@/index';
import { ActionButton } from '../V-1/case.styled';

// A theme is an ordinary chemical. Nothing about it is special.
class $Theme extends $Chemical {
    paper = '#ffffff';
    ink = '#202122';
    rule = '#a2a9b1';
    link = '#3366cc';
    quiet = '#f8f9fa';
}

const Theme = $($Theme);

// Another theme is a subclass of it, so a scope can stand it in place.
class $Dusk extends $Theme {
    override paper = '#101418';
    override ink = '#e8eaed';
    override rule = '#3c4753';
    override link = '#8ab4f8';
    override quiet = '#1b2229';
}

const Dusk = $($Dusk);

// Every dress reads the theme it is handed. A getter is read per render, so
// each one follows a change; a bond-constructor assignment would take its
// value once and stay there.
class $Dressed extends $Chemical {
    $theme!: $Theme;
}

class $Page extends $Dressed {
    selector = styled.article;
    padding = '18px 20px';
    borderRadius = '8px';
    fontFamily = 'Georgia, serif';
    get background() { return this.$theme.paper; }
    get color() { return this.$theme.ink; }
    get border() { return `1px solid ${this.$theme.rule}`; }

    view() {
        return <article>{this[children]}</article>;
    }
}

const Page = $($Page);

class $Headline extends $Dressed {
    selector = styled.h2;
    margin = '0 0 0.3em';
    fontSize = '1.4em';
    fontWeight = 'normal';
    paddingBottom = '0.2em';
    get color() { return this.$theme.ink; }
    get borderBottom() { return `1px solid ${this.$theme.rule}`; }

    view() {
        return <h2>{this[children]}</h2>;
    }
}

const Headline = $($Headline);

class $Para extends $Dressed {
    selector = styled.p;
    margin = '0.6em 0';
    lineHeight = '1.6';
    get color() { return this.$theme.ink; }

    view() {
        return <p>{this[children]}</p>;
    }
}

const Para = $($Para);

class $Aside extends $Dressed {
    selector = styled.aside;
    margin = '0.8em 0 0';
    padding = '10px 12px';
    borderRadius = '4px';
    fontSize = '92%';
    get background() { return this.$theme.quiet; }
    get color() { return this.$theme.link; }
    get borderLeft() { return `4px solid ${this.$theme.link}`; }

    view() {
        return <aside>{this[children]}</aside>;
    }
}

const Aside = $($Aside);

class $Room extends $Chemical {
    theme!: $Theme;

    // The ask goes through $, so the scope decides which theme arrives.
    $Room() {
        const Asked = $(Theme);

        this.theme = $(<Asked />) as $Theme;
    }

    // The theme it holds says which it is wearing. Writing the theme is a write
    // to the room, so the room repaints and every dress reads the new one.
    flip() {
        this.theme = $(this.theme instanceof $Dusk ? <Theme /> : <Dusk />) as $Theme;
    }

    view() {
        const held = this.theme;

        return (
            <div data-demo="four">
                <Page theme={held}>
                    <Headline theme={held}>{this[children]}</Headline>
                    <Para theme={held}>
                        Four dresses, one theme. Each reads its colours through a getter,
                        so a single write restyles all of them at once.
                    </Para>
                    <Aside theme={held}>The rule, the link and the ground all move together.</Aside>
                </Page>
                <ActionButton onClick={this.flip}>switch theme</ActionButton>
            </div>
        );
    }
}

const Room = $($Room);

// A derived scope answers the same ask with $Dusk, and the room never knew.
const DuskRoom = $($, Room);

$(DuskRoom, Theme)(Dusk);

export default function Case4Demo() {
    return (
        <>
            <Room>Fetched in the bond constructor</Room>
            <DuskRoom>The same class, in a scope that answers $Dusk</DuskRoom>
        </>
    );
}

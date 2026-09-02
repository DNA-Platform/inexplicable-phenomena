import React from 'react';
import { $, $Atom, $Chemical } from '@/index';
import { Bench, Jar, Nucleus, Name, Readout, Controls, Plaque } from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

const elements = ['Hydrogen', 'Helium', 'Lithium', 'Carbon', 'Neon', 'Sodium', 'Argon', 'Gold'];

// $Undying — an ATOM: a singleton whose class is its aid, atomic from birth.
// Every write you make below reaches the hydration cache a microtask later,
// and a refresh forms it back from the store — nothing called by hand.
class $Undying extends $Atom {
    element = 0;
    charge = 0;
    hue = 190;

    transmute() { this.element = (this.element + 1) % elements.length; }
    energize() { this.charge++; this.hue = (this.hue + 23) % 360; }
    calm() { this.charge = Math.max(0, this.charge - 1); }
    toggle() { this.atomic = !this.atomic; }

    view() {
        return (
            <Jar $hue={this.hue} $dim={!this.atomic}>
                <Nucleus $hue={this.hue} $charge={this.charge} onClick={this.energize} />
                <Name>{elements[this.element]}</Name>
                <Readout>charge +{this.charge} · hue {this.hue}°</Readout>
                <Controls>
                    <button onClick={this.energize}>energize</button>
                    <button onClick={this.calm}>calm</button>
                    <button onClick={this.transmute}>transmute</button>
                    <button onClick={this.toggle}>{this.atomic ? 'let it die' : 'make it atomic'}</button>
                </Controls>
                <Plaque $on={this.atomic}>{this.atomic ? 'atomic — survives refresh' : 'mortal now — record cleared'}</Plaque>
            </Jar>
        );
    }
}

// $Mortal — the twin with the same controls and no persistence: an ordinary
// chemical, fully reactive, gone at every refresh.
class $Mortal extends $Chemical {
    element = 0;
    charge = 0;
    hue = 10;

    transmute() { this.element = (this.element + 1) % elements.length; }
    energize() { this.charge++; this.hue = (this.hue + 23) % 360; }
    calm() { this.charge = Math.max(0, this.charge - 1); }

    view() {
        return (
            <Jar $hue={this.hue}>
                <Nucleus $hue={this.hue} $charge={this.charge} onClick={this.energize} />
                <Name>{elements[this.element]}</Name>
                <Readout>charge +{this.charge} · hue {this.hue}°</Readout>
                <Controls>
                    <button onClick={this.energize}>energize</button>
                    <button onClick={this.calm}>calm</button>
                    <button onClick={this.transmute}>transmute</button>
                </Controls>
                <Plaque $on={false}>ordinary — forgets on refresh</Plaque>
            </Jar>
        );
    }
}

const Undying = $($Undying);
const Mortal = $($Mortal);

export default function Case1Demo() {
    return (
        <>
            <Bench>
                <Undying />
                <Mortal />
            </Bench>
            <VerdictSection>
                <VerdictRow $state="pass">
                    <VerdictDot $state="pass" />
                    ✓ energize, calm, transmute — every write on the left jar reaches localStorage ($Chemistry.hydration) a tick later
                </VerdictRow>
                <VerdictRow $state="pending">
                    <VerdictDot $state="pending" />
                    ○ REFRESH THE PAGE — the undying atom stands exactly as you left it; the mortal twin resets
                </VerdictRow>
                <VerdictRow $state="pending">
                    <VerdictDot $state="pending" />
                    ○ press "let it die", watch the record vanish from devtools, refresh — now both forget
                </VerdictRow>
            </VerdictSection>
        </>
    );
}

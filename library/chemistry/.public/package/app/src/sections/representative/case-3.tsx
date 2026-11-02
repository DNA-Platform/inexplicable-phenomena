import React from 'react';
import { $, $Chemical } from '@/index';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';
import { Frame, TravelRow, TravelLabel, TravelPick, Sameness, HouseRegistered } from './faces';

// ─── The framework ───────────────────────────────────────────────────────────
// A part registered SINGLE is one instance at every mount — for A, a B is THIS
// ONE C. The registrar makes one, bonds it once, and answers its component,
// which is the form $ already has for a held instance. What is written to it is
// what every room reads, and it outlives the rooms: close the wing and open it
// again, and the lamp is the same lamp.

class $Lamp extends $Chemical {
    lit = 0;
    view() { return null; }
}

class $Room extends $Chemical {
    $name = '';

    view() {
        const lamp = $(Lamp).$ as $Lamp;
        return <div data-room={this.$name}>{this.$name}: lit {lamp.lit}</div>;
    }
}

class $House extends $Chemical {
    view() {
        return <div style={{ display: 'grid', gap: 6 }}><Room name="east" /><Room name="west" /></div>;
    }
}

const Lamp = $($Lamp);
const Room = $($Room);
const House = $($House);

// ─── The wing's own scope, and its one lamp ─────────────────────────────────

const Wing = $($, House);
const One = $(Wing, Lamp)(Lamp, 'single');

// ─── The showcase ────────────────────────────────────────────────────────────

class $Study extends $Chemical {
    open = true;
    nudged = 0;

    // Writing the lamp is configuration of a value, not of a scope; the rooms
    // read it when they draw, so the repaint is asked for, as in the case above.
    light() {
        (One.$ as $Lamp).lit++;
    }

    nudge() {
        this.nudged++;
    }

    toggle() {
        this.open = !this.open;
    }

    view() {
        const lit = (One.$ as $Lamp).lit;
        const state = lit > 0 ? 'pass' : 'pending';
        return (
            <Frame>
                <TravelRow>
                    <TravelLabel>one lamp, registered single for this wing</TravelLabel>
                    <TravelPick onClick={() => this.light()}>light it</TravelPick>
                    <TravelPick onClick={() => this.nudge()}>now repaint</TravelPick>
                    <TravelPick onClick={() => this.toggle()}>{this.open ? 'close the wing' : 'open the wing'}</TravelPick>
                </TravelRow>

                {this.open ? <Wing /> : <div data-wing="closed">closed — no room is mounted, and the lamp keeps its count</div>}

                <HouseRegistered>{"$(Wing, Lamp)(Lamp, 'single')"}</HouseRegistered>

                <Sameness>
                    Both rooms ask for a lamp and are answered <b>the same one</b>. Press <b>light it</b> a few times,
                    then <b>now repaint</b>: both rooms read the one count, because there is one lamp. Then <b>close the
                    wing</b> and open it again — every room is remounted, and the count is still there, because the
                    instance was made once at registration and the rooms only borrow it.
                </Sameness>

                <VerdictSection>
                    <VerdictRow $state={state}>
                        <VerdictDot $state={state} />
                        {lit > 0
                            ? `✓ one lamp, lit ${lit}, read by every room and kept across a remount — its bond ran once, at registration`
                            : '○ light the lamp; both rooms will read the same count once repainted'}
                    </VerdictRow>
                </VerdictSection>
            </Frame>
        );
    }
}

const Study = $($Study);

export default function SingleRegistrationDemo() {
    return <Study />;
}

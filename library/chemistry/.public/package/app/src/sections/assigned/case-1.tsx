import React, { ReactNode } from 'react';
import { $, $Chemical } from '@/index';
import {
    Frame, Written, Rig, Owner, Who, Tie, Stage,
    Sample, Gone, Rotor, Keys, Key, Reading,
} from './case.styled';

// OWNERSHIP, DRAWN.
//
// The vessel makes what it is made of and then wires it: a catalyst in its bond
// constructor, a sample written into its view, and one line saying the sample
// belongs in two members at once —
//
//     on={[() => this.sample, () => this.catalyst.sample]}
//
// Both own it, and each owns a DIFFERENT feature of it: the vessel turns its
// form, the catalyst turns its charge. So the shape tells you whose hand moved.
//
// What separates them is what only the maker can do. The catalyst can act on the
// sample. The vessel can act on it, REVOKE the catalyst's hold on it, and END it.

class $Sample extends $Chemical {
    sides = 6;
    charge = 0;
    tint = 188;
    turn = 0;

    facet(by: number) { this.sides = Math.max(3, Math.min(12, this.sides + by)); }
    excite(by: number) { this.charge = Math.max(0, Math.min(100, this.charge + by)); this.tint = (this.tint + by) % 360; }
    spin() { this.turn += 30; }

    override view(): ReactNode {
        return (
            <Sample
                $sides={this.sides} $charge={this.charge} $tint={this.tint} $turn={this.turn}
                onClick={() => this.spin()}
            />
        );
    }
}
const Specimen = $($Sample);

// The catalyst never makes a sample. It is handed one, and excites it — and it
// keeps turning whether or not it still has one.
class $Catalyst extends $Chemical {
    sample?: $Sample;
    angle = 0;

    strike() {
        this.angle += 60;
        this.sample?.excite(12);
    }

    override view(): ReactNode {
        return <Rotor $angle={this.angle} $live={!!this.sample} onClick={() => this.strike()} />;
    }
}
const Catalyst = $($Catalyst);

class $Vessel extends $Chemical {
    sample?: $Sample;
    catalyst!: $Catalyst;
    holding = true;

    get bound(): boolean { return !!this.catalyst?.sample; }

    // The catalyst is the vessel's, so it is composed into it — which is what
    // carries the catalyst's writes back up to the vessel's own readings.
    $Vessel() {
        this.catalyst = $(<Catalyst />) as $Catalyst;
        this.catalyst.parent = this;
    }

    // REVOKE — the vessel takes the sample back out of the catalyst's member. The
    // catalyst cannot do this to the vessel, and that asymmetry is the ownership.
    bind(to: boolean) { this.catalyst.sample = to ? this.sample : undefined; }

    override view(): ReactNode {
        const Held = $(this.catalyst);
        return (
            <Frame>
                <Written>{'<Sample on={[() => this.sample, () => this.catalyst.sample]} />'}</Written>
                <Rig>
                    <Owner>
                        <Who>vessel</Who>
                        <Keys>
                            <Key disabled={!this.sample} onClick={() => this.sample?.facet(-1)}>−</Key>
                            <Key disabled={!this.sample} onClick={() => this.sample?.facet(+1)}>+</Key>
                        </Keys>
                        <Keys>
                            <Key $on={this.bound} disabled={!this.sample} onClick={() => this.bind(!this.bound)}>
                                {this.bound ? 'unbind' : 'bind'}
                            </Key>
                            <Key onClick={() => { this.holding = !this.holding; }}>
                                {this.holding ? 'end' : 'make'}
                            </Key>
                        </Keys>
                        <Reading>{this.sample ? `${this.sample.sides} facets` : 'nothing'}</Reading>
                    </Owner>

                    <Tie $live={!!this.sample} />

                    <Stage>
                        {this.holding
                            ? <Specimen on={[() => this.sample, () => this.catalyst.sample]} />
                            : <Gone />}
                    </Stage>

                    <Tie $live={this.bound} />

                    <Owner $right>
                        <Who>catalyst</Who>
                        <Held />
                        <Reading>{this.bound ? `charge ${this.sample?.charge ?? 0}` : 'no sample'}</Reading>
                    </Owner>
                </Rig>
            </Frame>
        );
    }
}
const Vessel = $($Vessel);

export default function AssignedCaseOne() {
    return <Vessel />;
}

import React, { ReactNode } from 'react';
import { $, $Chemical } from '@/index';
import {
    CalloutBody,
    NoteFrame, NoteLabel,
    DefinitionFrame, DefinitionLabel,
    RulesFrame, RulesLabel,
    PitfallFrame, PitfallLabel,
    DeepDiveFrame, DeepDiveLabel,
    InTheLabFrame, InTheLabLabel,
    SeeAlsoFrame, SeeAlsoLabel,
} from './callout.styled';

// $Callout is the abstract base. Each variant chemical mounts its own
// styled atoms; the styled-components read theme tokens directly. No
// color/accent props are plumbed.

export class $Callout extends $Chemical {}

export class $Note extends $Callout {
    view(): ReactNode {
        return (
            <NoteFrame>
                <NoteLabel>NOTE</NoteLabel>
                <CalloutBody>{this.children}</CalloutBody>
            </NoteFrame>
        );
    }
}

export class $Definition extends $Callout {
    view(): ReactNode {
        return (
            <DefinitionFrame>
                <DefinitionLabel>DEFINITION</DefinitionLabel>
                <CalloutBody>{this.children}</CalloutBody>
            </DefinitionFrame>
        );
    }
}

export class $Rules extends $Callout {
    view(): ReactNode {
        return (
            <RulesFrame>
                <RulesLabel>RULES</RulesLabel>
                <CalloutBody>{this.children}</CalloutBody>
            </RulesFrame>
        );
    }
}

export class $Pitfall extends $Callout {
    view(): ReactNode {
        return (
            <PitfallFrame>
                <PitfallLabel>PITFALL</PitfallLabel>
                <CalloutBody>{this.children}</CalloutBody>
            </PitfallFrame>
        );
    }
}

export class $DeepDive extends $Callout {
    view(): ReactNode {
        return (
            <DeepDiveFrame>
                <DeepDiveLabel>DEEP DIVE</DeepDiveLabel>
                <CalloutBody>{this.children}</CalloutBody>
            </DeepDiveFrame>
        );
    }
}

export class $InTheLab extends $Callout {
    view(): ReactNode {
        return (
            <InTheLabFrame>
                <InTheLabLabel>IN THE LAB</InTheLabLabel>
                <CalloutBody>{this.children}</CalloutBody>
            </InTheLabFrame>
        );
    }
}

export class $SeeAlso extends $Callout {
    view(): ReactNode {
        return (
            <SeeAlsoFrame>
                <SeeAlsoLabel>SEE ALSO</SeeAlsoLabel>
                <CalloutBody>{this.children}</CalloutBody>
            </SeeAlsoFrame>
        );
    }
}

export const Note = $($Note);
export const Definition = $($Definition);
export const Rules = $($Rules);
export const Pitfall = $($Pitfall);
export const DeepDive = $($DeepDive);
export const InTheLab = $($InTheLab);
export const SeeAlso = $($SeeAlso);

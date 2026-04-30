import React from 'react';
import { $, $Particle } from '@/index';
import {
    PlannedTag, PlannedDot,
    PendingTag, PendingDot,
    PassTag, PassDot,
    FailTag, FailDot,
    BrokenTag, BrokenDot,
} from './status.styled';

export class $Status extends $Particle {
    label = 'STATUS';
}

export class $Planned extends $Status {
    label = 'PLANNED';
    view() { return <PlannedTag><PlannedDot />{this.label}</PlannedTag>; }
}

export class $Pending extends $Status {
    label = 'PENDING';
    view() { return <PendingTag><PendingDot />{this.label}</PendingTag>; }
}

export class $Pass extends $Status {
    label = 'PASS';
    view() { return <PassTag><PassDot />{this.label}</PassTag>; }
}

export class $Fail extends $Status {
    label = 'FAIL';
    view() { return <FailTag><FailDot />{this.label}</FailTag>; }
}

export class $Broken extends $Status {
    label = 'BROKEN';
    view() { return <BrokenTag><BrokenDot />{this.label}</BrokenTag>; }
}

export const Planned = $($Planned);
export const Pending = $($Pending);
export const Pass = $($Pass);
export const Fail = $($Fail);
export const Broken = $($Broken);

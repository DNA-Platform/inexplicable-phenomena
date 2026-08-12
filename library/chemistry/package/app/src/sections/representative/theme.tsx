import React from 'react';
import { $, $Chemical } from '@/index';

// A theme as a CHEMICAL, not a value. It is registered like any other part —
// which means a theme is substitutable by exactly the mechanism a mark or a
// body is, with no second concept.
//
// A theme carries no view worth looking at; what it carries is what a page
// paints WITH. So a page resolves it and then asks what stands behind it:
//
//     const theme = $($(themes.Theme), $);
//
// Two forms composed — resolve in this scope, then the chemical behind the
// answer. That is how a value-bearing abstraction travels through a container
// whose currency is components.

export class $Theme extends $Chemical {
    name = 'plain';
    ink = '#29251d';
    paper = '#f7f4ec';
    rule = '#d9d2c0';
    accent = '#705f38';
    view() { return null; }
}

export class $Dawn extends $Theme {
    override name = 'dawn';
    override ink = '#3b2b2b';
    override paper = '#fdf3ec';
    override rule = '#eccfc0';
    override accent = '#c1613a';
}

export class $Dusk extends $Theme {
    override name = 'dusk';
    override ink = '#e8e5f2';
    override paper = '#2a2740';
    override rule = '#454063';
    override accent = '#b8a6ff';
}

export class $Sea extends $Theme {
    override name = 'sea';
    override ink = '#e6f2f0';
    override paper = '#123536';
    override rule = '#2a5a58';
    override accent = '#6fd6c4';
}

export const Theme = $($Theme);
export const Dawn = $($Dawn);
export const Dusk = $($Dusk);
export const Sea = $($Sea);

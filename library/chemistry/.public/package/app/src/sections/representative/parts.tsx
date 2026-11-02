import React from 'react';
import { $, $Chemical } from '@/index';
import { MarkDot, MarkStar, MarkNumeral, ProseText, MonoText, BoxedText } from './faces';

// The parts a note is made of. Each family has a base and two specializations,
// and a specialization overrides only `view` — the substitution below never
// changes what a part IS, only which one stands in.
//
// Exported as components, named for their classes without the `$`. A note asks
// for the BASE; a house registers a specialization in its place.

export class $Mark extends $Chemical {
    // The BASE declares what an asker may pass. A substitution is invisible to
    // the caller, so anything a stand-in accepts must be accepted here too —
    // otherwise the ask typechecks and the substitute does not.
    $n? = 1;
    view() { return <MarkDot>•</MarkDot>; }
}

export class $Star extends $Mark {
    override view() { return <MarkStar>★</MarkStar>; }
}

export class $Numeral extends $Mark {
    override view() { return <MarkNumeral>{String(this.$n ?? 1).padStart(2, '0')}</MarkNumeral>; }
}

export class $Body extends $Chemical {
    $text? = '';
    view() { return <ProseText>{this.$text}</ProseText>; }
}

export class $Mono extends $Body {
    override view() { return <MonoText>{this.$text}</MonoText>; }
}

export class $Boxed extends $Body {
    override view() { return <BoxedText>{this.$text}</BoxedText>; }
}

export const Mark = $($Mark);
export const Star = $($Star);
export const Numeral = $($Numeral);
export const Body = $($Body);
export const Mono = $($Mono);
export const Boxed = $($Boxed);

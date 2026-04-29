import { ReactNode } from 'react';
import { $Chemical } from '@/index';
import { defaultSectionId, findSection } from '../data/catalogue';
import type { $Lab } from './lab';

// $Router — hash-based routing as a chemical. Watches `window.location.hash`
// and writes the resulting section id to `$lab.$activeSection`. Provides an
// imperative `navigate(id)` for click handlers; pushes the URL via
// `history.pushState`.
//
// The router does not own state. All navigation state lives on `$Lab`. The
// router is a translator between URL and reactive state.
//
// Eats our own dogfood: no react-router, no routing library. The framework's
// reactive system carries the URL state across the apparatus.
export class $Router extends $Chemical {
    $lab!: $Lab;
    private listener?: () => void;

    // attach — wire the router to its $Lab. Reads the current URL, writes the
    // resulting section to $lab.$activeSection, and subscribes to hashchange.
    // Called from $Lab's constructor; not a binding constructor (the router is
    // never mounted via JSX).
    attach(lab: $Lab) {
        this.$lab = lab;
        this.$lab.$activeSection = parseHash() ?? defaultSectionId;
        this.listener = () => {
            this.$lab.$activeSection = parseHash() ?? defaultSectionId;
        };
        window.addEventListener('hashchange', this.listener);
    }

    navigate(id: string): void {
        if (!findSection(id)) return;
        if (this.$lab.$activeSection === id) return;
        this.$lab.$activeSection = id;
        history.pushState(null, '', `#/${id}`);
    }

    // Invisible — has no view of its own.
    view(): ReactNode {
        return null;
    }
}

function parseHash(): string | undefined {
    const raw = window.location.hash;
    if (!raw) return undefined;
    const stripped = raw.replace(/^#\/?/, '');
    if (!stripped) return undefined;
    return findSection(stripped) ? stripped : undefined;
}

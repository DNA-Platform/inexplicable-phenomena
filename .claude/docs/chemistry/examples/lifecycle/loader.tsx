// $Loader — lifecycle and next()
//
// Demonstrates: await this.next('mount'), async data loading,
// state mutation after lifecycle phase.
//
// Concept: A loader waits for its mount phase, then fetches data.
// The view is pure — it reads from the object's state. The async
// lifecycle is linear code, not callbacks.
//
// Usage:
//   <Loader />

import React from 'react';
import { $Chemical } from '@dna-platform/chemistry';

export class $Loader extends $Chemical {
    items: string[] = [];
    $loading = true;
    $error?: string;

    async effect() {
        await this.next('mount');
        try {
            const response = await fetch('/api/items');
            this.items = await response.json();
            this.$loading = false;
        } catch (e) {
            this.$error = (e as Error).message;
            this.$loading = false;
        }
    }

    view() {
        if (this.$loading) return <div className="loader">Loading...</div>;
        if (this.$error) return <div className="error">{this.$error}</div>;
        return (
            <ul className="items">
                {this.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        );
    }
}

export const Loader = new $Loader().Component;

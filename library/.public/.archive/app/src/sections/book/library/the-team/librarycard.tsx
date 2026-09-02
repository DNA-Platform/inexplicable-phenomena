import { $ } from '@dna-platform/chemistry';
import { $$Book } from '@/book/Book';

// THE DEMO'S CARD. A card in the framework is a CHAPTER — one grade below the
// book it stands for — so its title and its account are writing and this class
// adds only what this library keeps beyond them.
//
// AND THE REFLECTION IS THIS LIBRARY'S, not the framework's. The card catalogue
// chapter shows four cards printing their own fields, and a card that had to be
// told its fields in advance would be a card for one kind of book. So the walk
// lives here, over what a card actually carries.
const structural = new Set(['$name', '$of', '$parts', '$view', '$in', '$text', '$role']);

export class $LibraryCard extends $$Book {
    properties(): string[] {
        return Object.keys(this)
            .filter(key => key.startsWith('$') && !structural.has(key))
            .filter(key => typeof (this as unknown as Record<string, unknown>)[key] !== 'function')
            .map(key => key.slice(1));
    }

    written(property: string): string {
        const value = (this as unknown as Record<string, unknown>)['$' + property];
        if (value === undefined || value === null || value === '') return '';
        if (value instanceof $$Book) return value.canonical?.heading ?? value.name;
        if (Array.isArray(value)) return value.map(part => this.printed(part)).join(', ');
        return this.printed(value);
    }

    printed(value: unknown): string {
        if (value instanceof $$Book) return value.canonical?.heading ?? value.name;
        if (value && typeof value === 'object' && 'copy' in value) return String((value as { copy: unknown }).copy);
        return String(value);
    }
}

export const LibraryCard = $($LibraryCard);

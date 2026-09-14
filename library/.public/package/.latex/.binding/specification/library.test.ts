import { describe, it } from 'vitest';
import { shipping } from './environment';

// STUB — Sprint 70 U6. library.specification.check(library): titles unique, every subject
// catalogued, a catalogue exists, authors resolve — each a @specify on LibrarySpecification.
describe.skipIf(shipping)('library', () => {
    it.skip('every book specifies itself, and the library specifies itself — waits on $Library (Sprint 70 U6)', () => {});
});

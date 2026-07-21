// =============================================================================
// @dna-platform/lib
//
// The canonical code library for creating libraries. It exposes the base classes
// a dependent library instantiates against — Book first, and its specializations
// (Cover, Subject, Library, ConversationBook, Author) as they are written. Built
// on @dna-platform/chemistry: every class here is a $Chemical, so a library
// renders itself.
// =============================================================================

export { $Book } from './Book';
export { $Reference } from './Reference';

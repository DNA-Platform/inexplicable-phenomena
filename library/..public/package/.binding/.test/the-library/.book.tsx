import { $Book } from '@dna-platform/public';

// THE TEST LIBRARY'S OWN BOOK. Every book in this library extends this one, the way every book in a
// real library extends the library's — so a change to what a book is here reaches all five.
export default class $TheLibrary extends $Book { }

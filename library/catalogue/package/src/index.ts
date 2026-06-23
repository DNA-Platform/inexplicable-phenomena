// @dna-platform/catalogue
//
// The catalogue is the symbolic VIEW that refers to the library — a
// representation of the library, not the library itself. In $Chemistry terms it
// implements $Rep (see @dna-platform/chemistry's symbolic.ts / catalogue.ts).
//
// This package depends on @dna-platform/chemistry and consumes it by name. The
// catalogue base classes are designed in a later session; for now this is a
// buildable placeholder that establishes the package and its dependency wiring.

export const catalogue = "catalogue" as const;

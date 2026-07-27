import { $, $Chemical } from '@dna-platform/chemistry';

// Anything that can be pointed at. Empty until a function needs it.
export class $Referent extends $Chemical {}

export const Referent = $($Referent);

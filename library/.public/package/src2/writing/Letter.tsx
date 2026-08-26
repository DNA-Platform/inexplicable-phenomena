import { $Writing$, $TypeOfWriting } from './Writing';

export interface $Letter$ extends $Writing$ {
}

export class $TypeOfLetter extends $TypeOfWriting {
    constructor() {
        super();
        this.cache('Letter');
    }
}

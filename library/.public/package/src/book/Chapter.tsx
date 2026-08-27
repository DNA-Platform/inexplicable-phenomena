import { $Document } from '@/writing/Document';
import { $Written } from '@/writing/Writing';

export class $Chapter extends $Document {
    $Chapter(...writing: $Written[]) {
        super.$Document(...writing);
    }

    constructor() {
        super();
        this.cache('Chapter');
    }
}

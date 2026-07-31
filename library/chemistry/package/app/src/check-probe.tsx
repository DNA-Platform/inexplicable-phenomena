import React from 'react';
import { createRoot } from 'react-dom/client';
import { $, $check, $Chemical } from '@/index';

class $Probe extends $Chemical {
    view() {
        return <p data-case="good">probe holds: hello</p>;
    }
}

const Probe = $($Probe);

class $Strict extends $Chemical {
    n = 0;

    $Strict(n: number) {
        this.n = $check(n, Number);
    }

    view() {
        return <p data-case="strict">strict holds: {this.n}</p>;
    }
}

const Strict = $($Strict);

class $Empty extends $Chemical {
    words: string[] = [];

    $Empty(...words: string[]) {
        this.words = words.map(w => $check(w, String));
        if (this.words.length === 0) throw new Error('An empty refuses at the door.');
    }

    view() {
        return <p data-case="empty">empty holds {this.words.length}</p>;
    }
}

const Empty = $($Empty);

const root = document.getElementById('root');
if (!root) throw new Error('No #root');
createRoot(root).render(
    <div>
        <section data-probe="control"><Probe /></section>
        <section data-probe="check-type"><Strict>not a number</Strict></section>
        <section data-probe="door-throw"><Empty></Empty></section>
    </div>
);

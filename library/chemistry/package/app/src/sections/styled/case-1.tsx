import React from 'react';
import { $, $Chemical, styled } from '@/index';

// A styled chemical writes the element it is styled as, and its CSS fields are
// the stylesheet. A plain name is live, like every other member of a chemical.
class $Card extends $Chemical {
    selector = styled.section;
    margin = '0 0 10px';
    padding = '16px';
    borderRadius = '6px';
    border = '1px solid #a2a9b1';
    background = '#f8f9fa';
    color = '#202122';
    fontFamily = 'Georgia, serif';

    view() {
        return <section>styled.section</section>;
    }
}

const Card = $($Card);

// A different element, styled the same way.
class $Quote extends $Chemical {
    selector = styled.blockquote;
    margin = '0 0 10px';
    padding = '12px 16px';
    borderLeft = '4px solid #3366cc';
    background = '#eaf3ff';
    fontStyle = 'italic';
    color = '#202122';

    view() {
        return <blockquote>styled.blockquote</blockquote>;
    }
}

const Quote = $($Quote);

// A subclass declares only its difference. The rest cascades.
class $Warning extends $Card {
    override background = '#fff0f0';
    override border = '1px solid #dc3545';
    override color = '#8b1a1a';

    override view() {
        return <section>a subclass — three fields changed, the rest inherited</section>;
    }
}

const Warning = $($Warning);

export default function Case1Demo() {
    return (
        <div data-demo="one">
            <Card />
            <Quote />
            <Warning />
        </div>
    );
}

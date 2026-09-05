import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { $, $Chemical, cache } from '@/index';

// One shared catalogue. Two kinds under it. Both file the same name.
class $Card extends $Chemical {
    formula: boolean | 'new' = true;
    view() { return <span data-kind={this.constructor.name} />; }
}
class $Subject extends $Card { }
class $Author extends $Card { }
class $SubjectOfMath extends $Subject { constructor() { super(); this[cache]('Math'); } }
class $AuthorOfMath extends $Author { constructor() { super(); this[cache]('Math'); } }
const Subject = $($Subject); const Author = $($Author);
$($SubjectOfMath); $($AuthorOfMath);

const stood = (node: React.ReactNode) => {
    class $Page extends $Chemical { view() { return node; } }
    const Page = $($Page);
    return render(<Page />).container.querySelector('span')?.getAttribute('data-kind');
};

describe('two kinds under one formula, both naming Math', () => {
    it('each stands for its own, and neither is lost', () => {
        expect(stood(<Subject>Math</Subject>)).toBe('$SubjectOfMath');
        expect(stood(<Author>Math</Author>)).toBe('$AuthorOfMath');
    });
});

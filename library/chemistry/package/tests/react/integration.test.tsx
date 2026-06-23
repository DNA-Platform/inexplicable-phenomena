import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

class $Book extends $Chemical {
    $title? = 'Untitled';
    $author? = 'Unknown';
    pageCount = 0;
    addPages(n: number) { this.pageCount += n; }
    view() {
        return (
            <div className="book">
                <h2>{this.$title}</h2>
                <p>by {this.$author}</p>
                <p className="pages">{this.pageCount} pages</p>
            </div>
        );
    }
}

describe('Integration: $Chemistry renders through React', () => {
    it('renders a book via template Component (reusable pattern)', () => {
        const Book = $($Book);
        const { container } = render(<Book title="The Selfish Gene" author="Richard Dawkins" />);
        expect(container.querySelector('h2')!.textContent).toBe('The Selfish Gene');
        expect(container.querySelector('.pages')!.textContent).toBe('0 pages');
    });

    it('renders a book via held instance Component (stateful pattern)', () => {
        const book = new $Book();
        book.$title = 'The Extended Phenotype';
        book.$author = 'Richard Dawkins';
        const Book = $(book);
        const { container } = render(<Book />);
        expect(container.querySelector('h2')!.textContent).toBe('The Extended Phenotype');
    });

    it('re-renders after method call on held instance', async () => {
        const book = new $Book();
        book.$title = 'The Extended Phenotype';
        const Book = $(book);
        const { container } = render(<Book />);
        expect(container.querySelector('.pages')!.textContent).toBe('0 pages');
        await act(async () => {
            book.addPages(307);
        });
        expect(container.querySelector('.pages')!.textContent).toBe('307 pages');
    });
});

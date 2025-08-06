import React from 'react';
import { Writing } from '../Writing';
import { Paragraph } from './Paragraph';

export class Section extends Writing {
  children: Section[] | Paragraph[] = [];
  
  validateStructure(): void {
    // No validation needed - structure enforced by add methods
  }
  
  text(): string {
    return this.children.map(child => child.text()).join(
      this.children[0] instanceof Section ? '\n\n' : '\n'
    );
  }
  
  addSection(section: Section): void {
    if (this.children.length > 0 && this.children[0] instanceof Paragraph) {
      throw new Error('Cannot mix sections and paragraphs');
    }
    section.container = this;
    this.children = [...(this.children as Section[]), section];
  }
  
  addParagraph(paragraph: Paragraph): void {
    if (this.children.length > 0 && this.children[0] instanceof Section) {
      throw new Error('Cannot mix sections and paragraphs');
    }
    paragraph.container = this;
    this.children = [...(this.children as Paragraph[]), paragraph];
  }
  
  content(): React.ReactNode {
    return (
      <>
        {this.children.map((child, i) => (
          <div key={child.id || i}>{child.component()}</div>
        ))}
      </>
    );
  }
}
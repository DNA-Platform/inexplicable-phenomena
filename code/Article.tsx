import React from 'react';
import { $Writing } from './Writing';
import { $Collection } from './Collection';
import { $Section } from './Section';
import { $Reference } from './Reference';

export class $Article extends $Writing {
  text(): string {
    return '';
  }
  
  view() {
    return <div className="article"></div>;
  }
}

export class $Abstract extends $Section {
  view() {
    return <div className="abstract"></div>;
  }
}

export class $Citation extends $Reference {
  year?: number;
  publisher?: string;
  authors?: string[];
  title?: string;

  constructor() {
    super();
    this.validateCitation();
  }
  
  validateCitation(): void {
    if (!this.title && !this.authors?.length) {
      console.warn('Citation missing title and authors');
    }
  }
  
  view() {
    return <div className="citation"></div>;
  }
}

export class $Bibliography extends $Collection<$Citation> {
  view(): React.ReactNode {
    return (
      <div className="bibliography">
        <h2>References</h2>
        <ol>
          {this.items.map((citation, i) => (
            <li key={citation.id || i} id={`citation-${citation.id}`}>
              {citation.view()}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export const Article = new $Article().component();
export const Abstract = new $Abstract().component();
export const Citation = new $Citation().component();
export const Bibliography = new $Bibliography().component();
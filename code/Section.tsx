import React from 'react';
import { Chemical } from './chemistry';
import { $Writing } from './Writing';

// Paragraph Component
export class $Paragraph extends Chemical {
  text: string = '';
  view(): React.ReactNode {
    return (
      <p className="paragraph">
        {this.text}
        {this.children && Array.from(this.children.values()).map((child: any, i: number) => (
          <span key={i}>{child.view && child.view()}</span>
        ))}
      </p>
    );
  }
}

export const Paragraph = new $Paragraph().component();

// Title Component
export class $Title extends $Paragraph {
  view(): React.ReactNode {
    return <span className="title">{this.text}</span>;
  }
}

export const Title = new $Title().component();

// Section Component
export class $Section extends $Writing {
  title?: $Title;
  paragraph?: $Paragraph;

  processChildren(): void {
    if (!this.children) return;

    this.children.forEach(({ instance: child }, index: number) => {
      if (index == 0 && child instanceof $Title) {
        this.title = child;
      } else if (index == 0 && !this.title && child instanceof $Paragraph) {
        this.paragraph = child;
      } else if (index == 1 && this.title && child instanceof $Paragraph) {
        this.paragraph = child;
      } else if (child instanceof $Section) {
        child.owner = this;
        this.sections.push(child);
      } else if (child) {
        throw new Error(`Writing only accepts Section children, received ${child.constructor.name}`);
      }
    });
  }

  view(): React.ReactNode {
    this.processChildren();

    return (
      <div className="section">
        {this.sections.map((section, i) => (
          <div key={section.id || i}>
            {section.view()}
          </div>
        ))}
      </div>
    );
  }
}

export const Section = new $Section().component();
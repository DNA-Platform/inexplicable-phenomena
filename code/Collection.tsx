'use client'
import React from 'react';
import { Chemical } from './chemistry';

export class $Work extends Chemical {
  id?: string;
  owner?: $Work;
  
  view(): React.ReactNode {
    return (
      <div id={this.id} className="work">
{super.view()}
      </div>
    );
  }
}

export class $Item extends Chemical {
  id?: string;
  owner?: $Work;
  
  view(): React.ReactNode {
    return (
      <div id={this.id} className="item"></div>
    );
  }
}

export class $Collection<T extends $Work = $Work> extends $Work {
  items: T[] = [];
  
  constructor() {
    super();
  }
  
  processChildren(): void {
    // In Chemistry, children passed as props are already instances
    if (!this.children) return;
    this.children.forEach(({ instance: child }) => {
      if (child instanceof $Work) {
        this.items.push(child as T);
      }
    });
  }
  
  view(): React.ReactNode {
    return (
      <>
        {this.items.map((item, i) => (
          <div key={item.id || i}>{item.view()}</div>
        ))}
      </>
    );
  }
}

export const Work = new $Work().component();
export const Item = new $Item().component();
export const Collection = new $Collection().component();
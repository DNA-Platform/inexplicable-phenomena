import React from 'react';
import { $Work } from './Collection';
import { $Writing } from './Writing';

export class $Image extends $Work {
  src: string = '';
  alt: string = '';
  caption?: $Writing;
  
  view(): React.ReactNode {
    return (
      <figure className="figure">
        <img 
          src={this.src} 
          alt={this.alt}
          className="figure-image"
        />
        {this.caption && (
          <figcaption className="figure-caption">
            {this.caption.view()}
          </figcaption>
        )}
      </figure>
    );
  }
}

export class $Svg extends $Image {
  viewBox?: string;
  preserveAspectRatio?: string;
  
  view() {
    return <div className="svg"></div>;
  }
}

export const Image = new $Image().component();
export const Svg = new $Svg().component();
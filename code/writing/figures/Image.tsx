import { Work } from '../../base/Work';
import { Writing } from '../Writing';

export class Image extends Work {
  src: string = '';
  alt: string = '';
  caption?: Writing;
  
  component(): React.ReactNode {
    return (
      <figure className="figure">
        <img 
          src={this.src} 
          alt={this.alt}
          className="figure-image"
        />
        {this.caption && (
          <figcaption className="figure-caption">
            {this.caption.component()}
          </figcaption>
        )}
      </figure>
    );
  }
}
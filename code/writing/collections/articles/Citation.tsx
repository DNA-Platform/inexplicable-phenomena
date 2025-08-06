import { Reference } from '../../references/Reference';

export class Citation extends Reference {
  year?: number;
  publisher?: string;
  authors?: string[];
  title?: string;
  
  validateCitation(): void {
    if (!this.title && !this.authors?.length) {
      console.warn('Citation missing title and authors');
    }
  }
  
  component(): React.ReactNode {
    this.validateCitation();
    return (
      <div className="citation"></div>
    );
  }
}
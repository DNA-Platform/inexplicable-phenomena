import { Work } from '../base/Work';

export abstract class Writing extends Work {
  abstract text(): string;
  
  className(): string {
    return 'writing markdown-body';
  }
}
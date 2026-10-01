import { $ } from '@dna-platform/chemistry';
import { Theme } from '@dna-platform/public';
import { $TheLibrary } from '../manual/.book';
import { DarkTheme } from './3-writing-a-theme.code.tsx';

export default class $Libby extends $TheLibrary { }

const Libby = $($Libby);
$(Libby, Theme)(DarkTheme);

export * from './3-writing-a-theme.code.tsx';

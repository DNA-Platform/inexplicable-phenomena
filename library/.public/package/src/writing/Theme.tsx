import { $, $Chemical } from '@dna-platform/chemistry';

export interface $Theme$ extends $Chemical {
    paper: string;
    ink: string;
    quiet: string;
    shade: string;
    rule: string;
    link: string;
    measure: string;
    body: string;
    display: string;
    size: string;
    leading: string;
}

export class $Theme extends $Chemical implements $Theme$ {
    paper = '#ffffff';
    ink = '#202122';
    quiet = '#f8f9fa';
    shade = '#eaecf0';
    rule = '#a2a9b1';
    link = '#3366cc';
    measure = '60.75em';
    body = 'sans-serif';
    display = "'Linux Libertine', 'Georgia', 'Times', 'Source Serif 4', serif";
    size = '16px';
    leading = '1.625';
}

export const Theme = $($Theme);

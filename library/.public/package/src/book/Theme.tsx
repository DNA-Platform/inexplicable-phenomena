import { $, $Chemical } from '@dna-platform/chemistry';

export class $Theme extends $Chemical {
    paper = '#ffffff';
    ink = '#202122';
    quiet = '#f8f9fa';
    shade = '#eaecf0';
    rule = '#a2a9b1';
    link = '#3366cc';
    measure = '60em';
    body = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    display = "'Linux Libertine', 'Georgia', 'Times', serif";
    size = '14px';
    leading = '1.6';
}

export const Theme = $($Theme);

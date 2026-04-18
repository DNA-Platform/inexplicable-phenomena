import React, { ReactNode } from 'react';
import { $Chemical } from '@/chemistry/chemical';

export class $Page extends $Chemical {
    $content: ReactNode = '';
    view() {
        return <div className="page">{this.$content}</div>;
    }
}

export const Page = new $Page().Component;

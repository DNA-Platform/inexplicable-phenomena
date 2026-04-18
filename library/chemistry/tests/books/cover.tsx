import React from 'react';
import { $Chemical } from '@/chemistry/chemical';

export class $Cover extends $Chemical {
    $title = '';
    $author = '';
    $image?: string;
    view() {
        return (
            <header className="cover">
                {this.$image && <img src={this.$image} alt={this.$title} />}
                <h1>{this.$title}</h1>
                <h2>{this.$author}</h2>
            </header>
        );
    }
}

export const Cover = new $Cover().Component;
